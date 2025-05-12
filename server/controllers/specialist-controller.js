import specialistService from "../service/specialist-service.js";

class SpecialistController {
  async getSessions(req, res, next) {
    try {
      const { id } = req.params;
      const sessions = await specialistService.getServices(id, req.query);
      return res.json(sessions);
    } catch (e) {
      next(e);
    }
  }
}

export default new SpecialistController();
