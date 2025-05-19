import { validationResult } from "express-validator";
import userService from "../service/user-service.js";
import ApiError from "../exceptions/api-error.js";
import resumeService from "../service/resume-service.js";
import sessionService from "../service/session-service.js";

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Помилка при валідації', errors.array()));
      }

      const { email, name, password } = req.body;
      const userData = await userService.registration(email, name, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json({ message: "Ви успішно вийшли" });
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;

      await userService.activate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
        next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      next(e); 
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async sendResume(req, res, next) {
    try {
      const { formResponse } = req.body;
      const resumeData = await resumeService.sendResume(formResponse);
      return res.json(resumeData);
    } catch (e) {
      next(e);
    }
  }
  
  async resendActivation(req, res, next) {
    try {
      const { email } = req.body;
      const result = await userService.resendActivation(email);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getSessions(req, res, next) {
    try {
      const { id } = req.params;
      const sessions = await userService.getSessions(id, req.query);
      return res.json(sessions);
    } catch (e) {
      next(e);
    }
  }

  async getSession(req, res, next) {
    try {
      const { id } = req.params;
      const session = await userService.getSession(id);
      return res.json(session);
    } catch (e) {
      next(e);
    }
  }

  async getSpecialistInfo(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req.query;
      const specialistInfo = await userService.getSpecialistInfo(id, userId);
      return res.json(specialistInfo);
    } catch (e) {
      next(e);
    }
  }

  async createSession(req, res, next) {
    try {
      const { payload } = req.body;
      const successMsg = await sessionService.createSession({ ...payload, userId: req.user.id, isVictim: req.user.isVictim });

      return res.json(successMsg);
    } catch (e) {
      next(e);
    }
  }

  async getSpecialists(req, res, next) {
    try {
      const filters = req.query;
      const { specialists, totalCount } = await userService.getSpecialists(filters);
      return res.json({ specialists, totalCount });
    } catch (e) {
      next(e);
    }
  }

  async changeName(req, res, next) {
    try {
      const { userId, name } = req.body;
      await userService.changeName(userId, name);
      return res.json({ message: "Ім'я успішно змінене" });
    } catch (e) {
      next(e);
    }
  }

  async changeEmail(req, res, next) {
    try {
      const { userId, email } = req.body;
      await userService.changeEmail(userId, email);
      return res.json({ message: "Email успішно змінено" });
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Помилка при валідації', errors.array()));
      }

      const { userId, curPass, newPass } = req.body;

      await userService.changePassword(userId, curPass, newPass);
      return res.json({ message: "Пароль успішно змінено" });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
