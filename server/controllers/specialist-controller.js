import specialistService from "../service/specialist-service.js";

class SpecialistController {
  async getSessions(req, res, next) {
    try {
      const sessions = await specialistService.getSessions(req.specialist.id, req.query);
      return res.json(sessions);
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
}

export default new SpecialistController();
