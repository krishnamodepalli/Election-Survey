
const mongoose = require('mongoose');

const votesScheme = new mongoose.Schema({
  voteFor: {
    type: String,
    required: true
  },
  castedAt: {
    type: Number,
    required: true
  },
  anonymous: Boolean,
  constituency: {
    type: String
  },
  ageGroup: {
    type: String,
    // Teens(11 - 19), Youngsters(20 - 30), Adults(31 - 50), Senior(50+)
  }
});


// Static methods of the schema
votesScheme.statics.castVote = async function (party) {
  party = party.toUpperCase();
  let doc;
  if (party === 'JSP' || 'TDP' || 'YCP' || 'BJP' || 'INC') {
    doc = await this.create({
      voteFor: party,
      castedAt: Date.now(),
      anonymous: true
    });
  } else {
    throw new Error('This party doesn\'t exist.');
  }
  return {status: 'ok', msg: 'Vote Casted Successfully', doc};
};

votesScheme.method('convertToSemi', async function (ageGroup, constituency) {
  this.ageGroup = ageGroup;
  this.constituency = constituency;
  this.anonymous = false;
  this.save();
});


module.exports = mongoose.model('Votes', votesScheme);
