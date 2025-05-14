import adminService from "../service/admin-service.js";

class AdmintController {
  async addSpecialist(req, res, next) {
    try {
      const { payload } = req.body;
      await adminService.addSpecialist(payload);
      return res.json({ message: "Фахівця успішно додано!" });
    } catch (e) {
      next(e);
    }
  }
}

export default new AdmintController();
