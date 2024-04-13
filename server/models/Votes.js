const PartyStats = require('./PartyStats');
const AgeGroupStats = require('./AgeGroupStats');

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
    doc = await this.create({ voteFor: party, castedAt: Date.now(), anonymous: true });
  } else {
    throw new Error('This party doesn\'t exist.');
  }
  return { status: 'ok', msg: 'Vote Casted Successfully', doc };
};

votesScheme.method('convertToSemi', function(ageGroup, constituency){
  this.ageGroup = ageGroup;
  this.constituency = constituency;
  this.anonymous = false;
  this.save();
});


// stats updating methods
const updatePartyStats = (party, anonymous, doc) => {
  if (doc) {
    if (anonymous)  doc.anonymous_votes += 1;
    else            doc.semi_verified_votes += 1;
    return;
  }
  // if already a document is present
  let voteType = (anonymous) ? 0 : 1;
  PartyStats.create({
    party_name: party,
    anonymous_votes: voteType ^ 1,
    semi_verified_votes: voteType
  });
};

const updateAgeStats = (party, ageGroup, doc) => {
  if (doc) {
    if (ageGroup === 'teen')
      doc.teens += 1;
    else if (ageGroup === 'youngster')
      doc.younsters += 1;
    else if (ageGroup === 'adult')
      doc.adults += 1;
    else if (ageGroup === 'senior')
      doc.seniors += 1;
    else
      throw Error('No such age group exists');
    return;
  }
  AgeGroupStats.create({
    party_name: party,
    teens: (ageGroup === 'teen') ? 1 : 0,
    youngsters: (ageGroup === 'youngster') ? 1 : 0,
    adults: (ageGroup === 'adult') ? 1 : 0,
    seniors: (ageGroup === 'senior') ? 1 : 0,
  });
};


// Middlewares for the stats
votesScheme.post('save', async function(res, next) {
  // saving the new data into the stats
  // getting the document
  const party = this.voteFor;

  // Party Stats addition
  const psDoc = await PartyStats.findOne({ party_name: party });
  const ageDoc = await AgeGroupStats.findOne({ party_name: party });

  updatePartyStats(party, this.anonymous, psDoc);
  if (!this.anonymous)         // if anonymous
    // we do not add the age group statistics or modify for an anonymous vote
    updateAgeStats(party, this.ageGroup, ageDoc);
  
  if (psDoc)    psDoc.save();
  if (ageDoc)   ageDoc.save();

  next();
});



module.exports = mongoose.model('Votes', votesScheme);

