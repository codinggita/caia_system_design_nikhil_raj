const Concept = require('../models/concept.model');

const bulkCreate = async (conceptsData) => {
  if (!Array.isArray(conceptsData)) {
    throw new Error('Data must be an array of concepts');
  }
  return await Concept.insertMany(conceptsData);
};

const bulkUpdate = async (updates) => {
  if (!Array.isArray(updates)) {
    throw new Error('Updates must be an array of objects containing _id and update fields');
  }

  const bulkOps = updates.map((update) => ({
    updateOne: {
      filter: { _id: update._id, isDeleted: false },
      update: { $set: update.data },
      runValidators: true
    }
  }));

  return await Concept.bulkWrite(bulkOps);
};

const bulkDelete = async (ids) => {
  if (!Array.isArray(ids)) {
    throw new Error('IDs must be an array of concept IDs');
  }

  // Soft delete
  return await Concept.updateMany(
    { _id: { $in: ids }, isDeleted: false },
    { $set: { isDeleted: true } }
  );
};

module.exports = {
  bulkCreate,
  bulkUpdate,
  bulkDelete
};
