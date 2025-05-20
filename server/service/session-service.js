import SessionModel from "../models/session-model.js";
import mailService from "./mail-service.js";
import paymentService from "./payment-service.js";
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
    const { selectedDate, selectedSlot, specialistId, user, giftId, priceId, isVictim, paymentIntentId } = payload;

    if (!isVictim && !priceId && !giftId) throw ApiError.BadRequest('Сесія не була оплачена');

    const specialist = await SpecialistModel.findById(specialistId).populate({ path: 'user', model: 'User' });
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

    const conflicts = await SessionModel.aggregate(buildConflictCheckPipeline(user.id, specialistId, scheduledAt));
    if (conflicts.length) throw ApiError.BadRequest('Цей час вже недоступний для бронювання. Оберіть, будь ласка, інший');

    const type = isVictim ? "free" : giftId ? "gift" : "paid";

    const session = await SessionModel.create({ user, specialist, scheduledAt, type, status: 'scheduled', paymentIntentId, giftId });
    await mailService.sendInfoAboutSession(session);
    return { message: "Сесія успішно створена" };
  }

  async refund(id) {
    const session = await SessionModel.findById(id).populate({ path: 'user' }).populate({ path: 'specialist', populate: { path: 'user' } });
    if (!session) throw ApiError.BadRequest('Невалідна сесія');
    if (session.type !== "paid") throw ApiError.BadRequest("Неможливо повернути кошти за даний тип сесії");
    if (session.isMoved) throw ApiError.BadRequest("Неможливо повернути кошти після перенесення сеансу");
    if (session.status !== "scheduled") throw ApiError.BadRequest("Неможливо повернути кошти за завершену сесію");

    const dateIn24hours = dayjs().add(24, 'hours').format('DD.MM.YYYY HH:mm');
    const formattedScheduledDate = dayjs.utc(session.scheduledAt).format('DD.MM.YYYY HH:mm');

    if (dateIn24hours > formattedScheduledDate) throw ApiError.BadRequest("Ви можете скасувати сеанс (та повернути гроші) не пізніше ніж за 24 години до його початку");
    
    session.status = "cancelled with refund";

    await paymentService.refund(session.paymentIntentId);
    await session.save();
    await mailService.sendInfoAboutRefund(session);
    return { message: "Запит на повернення коштів успішно створено" };
  }

  async cancel(id) {
    const session = await SessionModel.findById(id).populate({ path: 'user' }).populate({ path: 'specialist', populate: { path: 'user' } });
    if (!session) throw ApiError.BadRequest('Невалідна сесія');
    if (session.status !== "scheduled") throw ApiError.BadRequest("Неможливо скасувати завершену сесію");

    session.status = "cancelled";

    await session.save();
    await mailService.sendInfoAboutCancel(session);
    return { message: "Зустріч скасовано" };
  }

  async moveSession(payload) {
    const { selectedDate, selectedSlot, id } = payload;
    const session = await SessionModel.findById(id).populate({ path: 'user' }).populate({ path: 'specialist', populate: { path: 'user' } });

    if (!session) throw ApiError.BadRequest('Невалідна сесія');
    if (session.status !== "scheduled") throw ApiError.BadRequest("Неможливо перенести завершену сесію");
    if (session.isMoved) throw ApiError.BadRequest("Неможливо повторно перенести цей сеанс");

    const dateIn12hours = dayjs().add(12, 'hours').format('DD.MM.YYYY HH:mm');
    const formattedScheduledDate = dayjs.utc(session.scheduledAt).format('DD.MM.YYYY HH:mm');

    if (dateIn12hours > formattedScheduledDate) throw ApiError.BadRequest("Ви можете перенести сеанс не пізніше ніж за 12 годин до його початку");
    const newScheduledAt = combineDateAndSlot(selectedDate, selectedSlot);

    const conflicts = await SessionModel.aggregate(buildConflictCheckPipeline(session.user._id, session.specialist._id, newScheduledAt));
    if (conflicts.length) throw ApiError.BadRequest('Цей час вже недоступний для бронювання. Оберіть, будь ласка, інший');

    const start = dayjs(session.scheduledAt)
    const end = start.add(50, 'minute')
    const oldWhenLine = `${start.format('dddd, D MMM YYYY · h:mm a')} – ${end.format('h:mm a')} (Eastern European Time - Kyiv)`

    session.isMoved = true;
    session.scheduledAt = newScheduledAt;

    await session.save();
    await mailService.sendInfoAboutSessionMove(session, oldWhenLine);

    return { message: "Сеанс перенесено" };
  }
}

export default new SessionService();
