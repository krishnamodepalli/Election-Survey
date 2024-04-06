
const mongoose = require('mongoose');

const ageGroupStatsSchema = new mongoose.Schema({
  party_name: {
    unique: true,
    required: true,
    type: String
  },
  teens: Number,
  youngsters: Number,
  adults: Number,
  seniors: Number
});

module.exports = mongoose.model('AgeGroupStats', ageGroupStatsSchema);

