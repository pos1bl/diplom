import SessionModel from "../models/session-model.js";
import mailService from "./mail-service.js";
import UserModel from "../models/user-model.js";
import SpecialistModel from "../models/specialist-model.js";
import GiftModel from "../models/gift-model.js";
import ApiError from "../exceptions/api-error.js";
import combineDateAndSlot from "../utils/compineDateAndSlot.js";
import { Types } from "mongoose"
import dayjs from "dayjs";
import { buildConflictCheckPipeline } from "../utils/queryHelper.js";

class SessionService {
  async createSession(payload) {
    const { selectedDate, selectedSlot, specialistId, userId, giftId, priceId, isVictim } = payload;

    if (!isVictim && !priceId && !giftId) throw ApiError.BadRequest('Сесія не була оплачена');

    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.BadRequest('Користувача з таким id не знайдено');

    const specialist = await SpecialistModel.findById(specialistId);
    if (!specialist) throw ApiError.BadRequest('Спецаліста з таким id не знайдено');

    if (giftId) {
      const today = dayjs.utc().startOf('day').toDate();
      const gift = await GiftModel.findOne({
        _id: new Types.ObjectId(giftId),
        $expr: {
          $gte: [
            {
              $dateFromString: {
                dateString: '$expirationDate',
                format: '%d.%m.%Y',
                onError: new Date(0),    // на випадок некоректного рядка
                onNull:  new Date(0),
              },
            },
            today,
          ],
        },
        amount: {$gte: 1} 
      });
      if (!gift) throw ApiError.BadRequest('Діючого сертифіката з таким кодом не знайдено');
      
      gift.amount -= 1;
      await gift.save();
    }

    const scheduledAt = combineDateAndSlot(selectedDate, selectedSlot);

    const conflicts = await SessionModel.aggregate(buildConflictCheckPipeline(userId, specialistId, scheduledAt));
    if (conflicts.length) throw ApiError.BadRequest('Цей час вже недоступний для бронювання. Оберіть, будь ласка, інший');

    const session = await SessionModel.create({ user, specialist, scheduledAt, isFree: isVictim, status: 'scheduled'  });
    await mailService.sendInfoAboutSession(session);
    return { message: "Сесія успішно створена" };
  }
}

export default new SessionService();
