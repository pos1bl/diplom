import { SpecialistFormValues } from "@utils/admin/Addspecialistform";
import $api from "../http";

export default class AdminService {
  static async addSpecialist(payload: SpecialistFormValues): Promise<void> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'avatar' && value instanceof File) {
        formData.append('avatar', value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });

    return $api.post(
      'add_specialist',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }
}
