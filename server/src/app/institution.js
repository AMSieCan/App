import {
  institutionModel,
  institutionUserModel,
  userModel,
  deviceModel,
  sensorDataModel,
} from '../model';

const INSTITUTION_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

// Find institution belong to userId
export const listInstitution = async (user) => {
  try {
    // Find all institution the user belongs to
    const institutionUsers = await institutionUserModel.find({
      userId: user._id,
    });

    // Get list of institution Ids
    const institutionIds = institutionUsers.map((item) => item.institutionId);

    // Get list of institution
    const list = await institutionModel.find({
      _id: {
        $in: institutionIds,
      },
    });

    return list;
  } catch (err) {
    throw err;
  }
};

export const createInstitution = async (userId, name, streetAddress, city, state, lat, long) => {
  try {
    // Find all institution the user belongs to
    const newInstitution = await institutionModel.create({
      name,
      streetAddress,
      city,
      state,
      lat,
      long,
    });

    // Add the ownerId into
    await institutionUserModel.create({
      userId,
      institutionId: newInstitution._id,
      role: INSTITUTION_ROLE.ADMIN,
    });
    return newInstitution;
  } catch (err) {
    throw err;
  }
};

export const getInstitution = async (user, id) => {
  try {
    // Check if user belong to this institution
    const instUser = await institutionUserModel.findOne({
      userId: user._id,
      institutionId: id,
    });
    if (!instUser) {
      throw new Error('User not belong to this institution');
    }
    const institution = await institutionModel.findById(id);
    if (!institution) {
      throw new Error('Institution not found');
    }
    return institution;
  } catch (err) {
    throw err;
  }
};

export const deleteInstitution = async (user, id) => {
  try {
    // Check if user belong to this institution
    const instUser = await institutionUserModel.findOne({
      userId: user._id,
      institutionId: id,
    });
    if (!instUser) {
      throw new Error('User not belong to this institution');
    }
    const res = await institutionModel.deleteOne({ _id: id });
    if (res.deletedCount > 0) {
      return 'OK';
    }
    throw new Error('Delete failed');
  } catch (err) {
    throw err;
  }
};

export const patchInstitution = async (
  user,
  id,
  { name, streetAddress, city, state, lat, long },
) => {
  try {
    // Check if user belong to this institution
    const instUser = await institutionUserModel
      .findOne({
        userId: user._id,
        institutionId: id,
      })
      .populate('institutionId');
    if (!instUser) {
      throw new Error('User not belong to this institution');
    }
    // patching the institution
    if (name) {
      instUser.institutionId.name = name;
    }
    if (streetAddress) {
      instUser.institutionId.streetAddress = streetAddress;
    }
    if (city) {
      instUser.institutionId.city = city;
    }
    if (state) {
      instUser.institutionId.state = state;
    }
    if (lat) {
      instUser.institutionId.lat = lat;
    }
    if (long) {
      instUser.institutionId.long = long;
    }

    instUser.institutionId.save();
    return instUser.institutionId;
  } catch (err) {
    throw err;
  }
};

export const listInstitutionUser = async (user, id) => {
  try {
    const institutionUsers = await institutionUserModel
      .find({
        institutionId: id,
      })
      .populate('userId');

    return institutionUsers.map((item) => ({
      _id: item._id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      emailAddress: item.userId.emailAddress,
      role: item.role,
    }));
  } catch (err) {
    throw err;
  }
};

export const addInstitutionUser = async (user, id, { emailAddress, role }) => {
  try {
    // Find user based on email address
    const addUser = await userModel.findOne({ emailAddress });
    if (!addUser) {
      throw new Error('User not found');
    }

    // Check if user already added or not
    const checkUser = await institutionUserModel.findOne({
      institutionId: id,
      userId: addUser._id,
    });

    if (checkUser) {
      throw new Error('User already in institution');
    }

    let intUser = await institutionUserModel.create({
      userId: addUser._id,
      institutionId: id,
      role,
    });

    if (!intUser) {
      throw new Error('Failed to add');
    }

    intUser = await intUser.populate('userId').execPopulate();
    return {
      _id: intUser._id,
      createdAt: intUser.createdAt,
      updatedAt: intUser.updatedAt,
      emailAddress: intUser.userId.emailAddress,
      role: intUser.role,
    };
  } catch (err) {
    throw err;
  }
};

export const deleteInstitutionUser = async (user, id, institutionUserId) => {
  try {
    // Check if user already added or not
    const result = await institutionUserModel.deleteOne({
      _id: institutionUserId,
      institutionId: id,
    });

    if (result.deletedCount === 0) {
      throw new Error('Failed to delete institution user');
    }

    return 200;
  } catch (err) {
    throw err;
  }
};

export const listInstitutionDevice = async (user, id) => {
  try {
    const devices = await deviceModel.find({
      institutionId: id,
    });

    const deviceIds = devices.map((d) => d._id);

    // Add device data
    const sensors = await sensorDataModel.find({ deviceId: { $in: deviceIds } });

    return devices.map((d) => {
      let sensorData = sensors
        .filter((s) => s.deviceId === d._id)
        .reduce(
          (prev, curr) => {
            if (curr.description === 'distance') {
              prev.distance += parseFloat(curr.data);
            } else if (curr.description === 'count') {
              prev.count += parseFloat(curr.data);
            }
            return prev;
          },
          { distance: 0, count: 0 },
        );

      return { ...d.toJSON(), sensorData };
    });
  } catch (err) {
    throw err;
  }
};
