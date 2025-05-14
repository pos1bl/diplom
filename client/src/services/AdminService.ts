import $api from "../http";
import { ISpecialist } from '@models/ISpecialist';

export default class AdminService {
  static async addSpecialist(payload: Omit<ISpecialist, 'userId'> & { email: string }): Promise<void> {
    return $api.post('add_specialist', { payload });
  }
}
