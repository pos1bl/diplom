import { AxiosResponse } from 'axios';
import $api from "../http";
import { Client, IUser } from '@models/IUser';
import { EducationResponse } from '@models/response/EducationResponse';
import { CourseFormState, DiplomFormState } from '@utils/specialist/Education';


export default class SpecialistService {
  static async fetchClients(filters?: Record<string,string>): Promise<AxiosResponse<Client[]>> {
    return $api.get<Client[]>('clients', { params: filters });
  }

  static async fetchUserInfo(clientId: string): Promise<IUser> {
    const { data } = await $api.get<IUser>(`clients/${clientId}`);

    return data;
  }

  // static async fetchSpecialist(): Promise<string> {
  //   const { data } = await $api.get<string>('specialist/id');

  //   return data;
  // }

  static async fetchClientsNames(): Promise<AxiosResponse<string[]>> {
    return $api.get<string[]>('clients/names');
  }

  static async fetchEducation(): Promise<EducationResponse> {
    const { data } = await $api.get<EducationResponse>('education');

    return data;
  }

  static async addDiplom(payload: DiplomFormState): Promise<void> {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append('image', value);
      } else {
        formData.append(key, String(value));
      }
    });

    return $api.post(
      'add_diplom',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }

  static async addCourse(payload: CourseFormState): Promise<void> {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === 'image' && value instanceof File) {
        formData.append('image', value);
      } else {
        formData.append(key, String(value));
      }
    });

    return $api.post(
      'add_course',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  }
}
