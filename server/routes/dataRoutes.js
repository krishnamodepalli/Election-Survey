
const express = require('express');

const Votes = require('../models/Votes');
const PartyStats = require('../models/PartyStats');
const AgeGroupStats = require('../models/AgeGroupStats');

const router = express.Router();

router.get('/vote-stats', async (req, res) => {
  const votingData = {YCP: 0, TDP: 0, JSP: 0, BJP: 0, INC: 0};
  if (req.query['diff-votes'] === 'true') {
    // need to differentiate the votes if anonymous or semi-verified.
    const response = {
      anonymous: {},
      semi_verified: {}
    };

    // will be using some more efficient way than making multiple requests
    await PartyStats.find({ }).then(parties => {
      // making only one request to the database and spliting the data as we
      // need for our project.
      let total_anon = 0;
      let total_semi = 0;
      parties.forEach(party => {
        total_anon += party.anonymous_votes;
        total_semi += party.semi_verified_votes;
        response.anonymous[party.party_name] = party.anonymous_votes;
        response.semi_verified[party.party_name] = party.semi_verified_votes;
      });
      response.anonymous.total = total_anon;
      response.semi_verified.total = total_semi;
    });

    res.status(201).json({ msg: 'success', data: response });
  }
  else if (req.query['group-age'] === 'true') {
    // we need to group the data with per the age groups.
    const response = {
      TDP: {},
      YCP: {},
      JSP: {},
      BJP: {},
      INC: {},
    };

    // will do the same as above, make one request to database and then
    // split the data into required terms and attributes
    await AgeGroupStats.find({ }).then(parties => {
      parties.forEach(party => {
        response[party.party_name] = {
          'teens': party.teens,
          'youngsters': party.youngsters,
          'adults': party.adults,
          'seniors': party.seniors,
          'total': party.teens + party.youngsters + party.adults + party.seniors
        };
      });
    });

    res.status(201).json({ msg: 'success', data: response });
  }
  else {          // Total Votes will be given
    const response = {};
    for (const party of Object.keys(votingData))
      response[party] = await Votes.countDocuments({ voteFor: party });

    response.total = await Votes.countDocuments();
    res.status(201).json({ msg: 'success', data: response });
  }
});

module.exports = router;

