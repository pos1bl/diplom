import SpecialistModel from "../models/specialist-model.js";
import UserModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";

import { parse, uploadToCloudinary } from "../utils/uploadToCloudinary.js";

class AdminService {
  async addSpecialist(req) {
    const {
      email,
      dateOfBirth,
      gender,
      bio,
      yearsOfExperience,
      mainAreas,
      secondaryAreas,
      excludedAreas,
      methods,
      specialNeeds,
      availability
    } = req.body;


    const user = await UserModel.findOne({ email: parse(email) });
    if (!user) throw ApiError.BadRequest('Користувача з таким email не знайдено');

    let avatarUrl = '';
    if (req.file) {
      avatarUrl = await uploadToCloudinary(req.file.buffer, 'specialists_avatars');
    }

    user.role = 'specialist';
    await user.save(); 

    const specialistData = {
      user,
      dateOfBirth: parse(dateOfBirth),
      gender: parse(gender),
      bio: parse(bio),
      yearsOfExperience: +yearsOfExperience,
      mainAreas: parse(mainAreas),
      secondaryAreas: parse(secondaryAreas),
      excludedAreas: parse(excludedAreas),
      methods: parse(methods),
      specialNeeds: parse(specialNeeds),
      availability: parse(availability),
      avatarUrl
    };

    await SpecialistModel.create(specialistData);
  }
}

export default new AdminService();
