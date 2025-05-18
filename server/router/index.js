import { Router, raw } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';
import giftController from '../controllers/gift-controller.js';
import specialistController from '../controllers/specialist-controller.js';
import adminController from '../controllers/admin-controller.js';
import upload from '../middlewares/upload.js';
import paymentController from '../controllers/payment-controller.js';

const router = new Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/send_resume',
  [
    body('formResponse.fullName').notEmpty().withMessage('Ім\'я обов\'язкове'),
    body('formResponse.phone').notEmpty().withMessage('Телефон обов\'язковий'),
    body('formResponse.email').isEmail().withMessage('Некоректний email'),
    body('formResponse.experienceYears').isInt({ min: 0, max: 99 }).withMessage('Досвід має бути числом від 0 до 99'),
    body('formResponse.education').notEmpty().withMessage('Освіта обов\'язкова'),
    body('formResponse.about').notEmpty().withMessage('Поле "Про себе" обов\'язкове'),
    body('formResponse.availability').notEmpty().withMessage('Графік роботи обов\'язковий'),
    body('formResponse.profileLink').isURL().withMessage('Некоректне посилання на профіль'),
    body('formResponse.motivation').notEmpty().withMessage('Мотивація обов\'язкова'),
  ],
  userController.sendResume
);
router.post('/resend_activation', userController.resendActivation);
router.post('/create_payment_link/:type', authMiddleware, paymentController.createPaymentLink);
router.post('/create_session', authMiddleware, userController.createSession);
router.post('/change_name', authMiddleware, userController.changeName)
router.post('/change_email', authMiddleware, userController.changeEmail)
router.post('/change_password', body('newPass').isLength({ min: 3, max: 32 }), userController.changePassword);
router.post('/add_specialist', authMiddleware, upload.single('avatar'), adminController.addSpecialist);

router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/users/:id/sessions', authMiddleware, userController.getSessions);
router.get('/specialist/:id/sessions', authMiddleware, specialistController.getSessions);
router.get('/specialists', userController.getSpecialists);
router.get('/specialists/:id', userController.getSpecialistInfo);
router.get('/gift', giftController.fetchGift);

export default router;
