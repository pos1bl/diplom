import adminService from "../service/admin-service.js";

class AdmintController {
  async addSpecialist(req, res, next) {
    try {
      await adminService.addSpecialist(req);
      return res.json({ message: "Фахівця успішно додано!" });
    } catch (e) {
      next(e);
    }
  }
}

export default new AdmintController();
