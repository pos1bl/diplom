import { validationResult } from "express-validator";
import userService from "../service/user-service.js";
import ApiError from "../exceptions/api-error.js";
import resumeService from "../service/resume-service.js";

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
}

export default new UserController();
