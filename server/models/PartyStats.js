const mongoose = require('mongoose');

const PartyStatsSchema = new mongoose.Schema({
  party_name: {
    unique: true,
    type: String,
    required: true,
  },
  anonymous_votes: Number,
  semi_verified_votes: Number,
});

module.exports = mongoose.model('PartyStats', PartyStatsSchema);
