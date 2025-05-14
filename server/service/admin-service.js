import SpecialistModel from "../models/specialist-model.js";
import UserModel from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";

class AdminService {
  async addSpecialist(payload) {
    const {
      avatarUrl,
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
    } = payload;

    const user = await UserModel.findOne({ email });

    console.log(user)

    if (!user) {
      throw ApiError.BadRequest('Користувача з таким email не знайдено');
    }

    user.role = 'specialist';
    await user.save(); 
    await SpecialistModel.create({
      user,
      dateOfBirth,
      gender,
      bio,
      yearsOfExperience,
      mainAreas,
      secondaryAreas,
      excludedAreas,
      methods,
      specialNeeds,
      availability,
      avatarUrl
    });
  }
}

export default new AdminService();
