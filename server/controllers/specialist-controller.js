import specialistService from "../service/specialist-service.js";
import sessionService from "../service/session-service.js";

class SpecialistController {
  async getSessions(req, res, next) {
    try {
      const sessions = await specialistService.getSessions(req.specialist.id, req.query);
      return res.json(sessions);
    } catch (e) {
      next(e);
    }
  }

  async getSession(req, res, next) {
    try {
      const { id } = req.params;
      const session = await specialistService.getSession(id, req.specialist.id);
      return res.json(session);
    } catch (e) {
      next(e);
    }
  }

  async getClients(req, res, next) {
    try {
      const clients = await specialistService.getClients(req.specialist.id, req.query);
      return res.json(clients);
    } catch (e) {
      next(e);
    }
  }

  async getClientNames(req, res, next) {
    try {
      const clientNames = await specialistService.getClientNames(req.specialist.id);
      return res.json(clientNames);
    } catch (e) {
      next(e);
    }
  }
  
  async getUserInfo(req, res, next) {
    try {
      const userInfo = await specialistService.getUserInfo(req.params.id);
      return res.json(userInfo);
    } catch (e) {
      next(e);
    }
  }

  async getEducation(req, res, next) {
    try {
      const education = await specialistService.getEducation(req.specialist.id);
      return res.json(education);
    } catch (e) {
      next(e);
    }
  }

  async addDiplom(req, res, next) {
    try {
      await specialistService.addDiplom(req);
      return res.json({ message: "Диплом успішно додано!" });
    } catch (e) {
      next(e);
    }
  }

  async addCourse(req, res, next) {
    try {
      await specialistService.addCourse(req);
      return res.json({ message: "Курс успішно додано!" });
    } catch (e) {
      next(e);
    }
  }

  async changeStatus(req, res, next) {
    try {
      const { status } = req.body;
      const successMsg = await sessionService.changeStatus(status, req.params.id);

      return res.json(successMsg);
    } catch (e) {
      next(e);
    }
  }

  async getSpecialistByOwn(req, res, next) {
    try {
      return res.json(req.specialist);
    } catch (e) {
      next(e);
    }
  }

  async changeBio(req, res, next) {
    try {
      const { bio } = req.body;
      
      await specialistService.changeBio(req.specialist.id, bio);
      return res.json({ message: "Біо успішно змінене" });
    } catch (e) {
      next(e);
    }
  }

  async changeMultiselect(req, res, next) {
    try {
      const { name, value } = req.body;
      
      await specialistService.changeMultiselect(req.specialist.id, name, value);
      return res.json({ message: `${name} успішно змінені` });
    } catch (e) {
      next(e);
    }
  }
}

export default new SpecialistController();
