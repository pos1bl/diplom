import ApiError from "../exceptions/api-error.js";
import SessionModel from "../models/session-model.js";
import SpecialistModel from "../models/specialist-model.js";
import { buildSessionFilter, SESSIONS_ROLES } from "../utils/queryHelper.js";

class SpecialistService {
  async getSessions(id, query) {
    const specialist = await SpecialistModel.findOne({ user: id }).populate({ path: 'user', model: 'User' });
    if (!specialist) throw ApiError.BadRequest("Користувач не є фахівцем")

    const { filter, options } = buildSessionFilter({ roleField: SESSIONS_ROLES.SPECIALIST, id: specialist._id, query });

    const sessions = await SessionModel.find(filter, null, options).populate({ path: 'user', model: 'User', select: 'name' });
    return sessions;
  }
}

export default new SpecialistService();
