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
  
  async changeStatus(req, res, next) {
    try {
      const { status } = req.body;
      const successMsg = await sessionService.changeStatus(status, req.params.id);

      return res.json(successMsg);
    } catch (e) {
      next(e);
    }
  }

//   async getSpecialistIdByOwn(req, res, next) {
//     try {
//       return res.json(req.specialist.id);
//     } catch (e) {
//       next(e);
//     }
//   }

//   async isOwnClient(req, res, next) {
//     try {
//       const isAllowed = await specialistService.isOwnClient(req.params.id, req.specialist.id);
//       return res.json(isAllowed);
//     } catch (e) {
//       next(e);
//     }
//   } 
}

export default new SpecialistController();
