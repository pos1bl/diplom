import { Types } from "mongoose";
import SessionModel from "../models/session-model.js";
import UserModel from "../models/user-model.js";
import { buildClientFilter, buildSessionFilter, SESSIONS_ROLES } from "../utils/queryHelper.js";

class SpecialistService {
  async getSessions(id, query) {
    const { filter, options } = buildSessionFilter({ roleField: SESSIONS_ROLES.SPECIALIST, id, query });

    const sessions = await SessionModel.find(filter, null, options).populate({ path: 'user', model: 'User', select: 'name' });
    return sessions;
  }

  async getClients(id, query) {
    const { filter } = buildClientFilter({ id, query });

    const clients = await SessionModel.aggregate([
      { $match: filter },
      { 
        $group: {
          _id: '$user',
          completedSessions: {
            $sum: {
              $cond: [
                { $eq: ['$status', 'completed'] },
                1,
                0
              ]
            }
          }
        }
      },
      { 
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'profile'
        }
      },
      { $unwind: '$profile' },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              '$profile',
              { completedSessions: '$completedSessions' }
            ]
          }
        }
      }
    ]);

    return clients;
  }

  async getClientNames(id) {
    const docs = await SessionModel.aggregate([
      { $match: { specialist: new Types.ObjectId(id) } },
      { $group: { _id: '$user' } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'profile'
        }
      },
      { $unwind: '$profile' },
      {
        $project: {
          _id: 0,
          name: '$profile.name'
        }
      }
    ])

    return docs.map(d => d.name)
  }

  async getUserInfo(id) {
    return await UserModel.findById(id)
  }
}

export default new SpecialistService();
