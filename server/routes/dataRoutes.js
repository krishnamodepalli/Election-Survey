
const express = require('express');

const PartyStats = require('../models/PartyStats');
const AgeGroupStats = require('../models/AgeGroupStats');

const router = express.Router();

router.get('/vote-stats', async (req, res) => {
  const votingData = {YCP: 0, TDP: 0, JSP: 0, BJP: 0};
  const parties = ['YCP', 'TDP', 'JSP', 'BJP', 'INC'];
  if (req.query['diff-votes'] === 'true') {
    // we need to differentiate the votes if anonymous or semi-verified.
    const response = {
      anonymous: {},
      semi_verified: {}
    };
    for (const type of ['anonymous', 'semi_verified']) {
      let total = 0;
      for (const party of parties) {
        let doc = await PartyStats.findOne({ party_name: party });
        let count = 0;
        if (doc)    count = doc[type + '_votes'];
        response[type][party] = count;

        total += count;
      }
      response[type].total = total;
    }

    res.status(201).json({ msg: 'success', data: response });
    return;
  } else if (req.query['group-age'] === 'true') {
    // we need to group the data with per the age groups.
    const response = {
      TDP: {},
      YCP: {},
      JSP: {},
      BJP: {},
      INC: {},
    };
    for (const party of Object.keys(response)) {
      let total = 0;
      for (const ageGroup of ['teens', 'youngsters', 'adults', 'seniors']) {
        let doc = await AgeGroupStats.findOne({ party_name: party });
        let count = doc ? doc[ageGroup] : 0;

        response[party][ageGroup] = count;
        total += count;
      }
      response[party].total = total;
    }
    res.status(201).json({ msg: 'success', data: response });
    return;
  } else {          // Total Votes will be given
    const response = {};
    for (const party of Object.keys(votingData))
      response[party] = await Votes.countDocuments({ voteFor: party });

    response.total = await Votes.countDocuments();
    res.status(201).json({ msg: 'success', data: response });
    return;
  }
});

module.exports = router;

