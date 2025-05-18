import SessionModel from "../models/session-model.js";
import { buildSessionFilter, SESSIONS_ROLES } from "../utils/queryHelper.js";

class SpecialistService {
  async getSessions(id, query) {
    const { filter, options } = buildSessionFilter({ roleField: SESSIONS_ROLES.SPECIALIST, id, query });
    const sessions = await SessionModel.find(filter, null, options).populate({ path: 'user', model: 'User', select: 'name' });

    return sessions;
  }
}

export default new SpecialistService();
