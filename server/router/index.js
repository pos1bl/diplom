import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller.js';
import authMuddleware from '../middlewares/auth-muddleware.js';

const router = new Router();

router.post('/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMuddleware, userController.getUsers);
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

export default router;
