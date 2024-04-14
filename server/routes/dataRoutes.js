
const express = require('express');

const Votes = require('../models/Votes');

const router = express.Router();

router.get('/vote-stats', async (req, res) => {
  const votingData = {YCP: 0, TDP: 0, JSP: 0, BJP: 0, INC: 0};
  const parties = ['YCP', 'TDP', 'JSP', 'BJP', 'INC'];
  if (req.query['diff-votes'] === 'true') {
    // need to differentiate the votes if anonymous or semi-verified.
    const response = {
      anonymous: {},
      semi_verified: {}
    };

    // will be using some more efficient way than making multiple requests
    await Votes.find({ }).then(votes => {
      // now divide the votes
      const semi_verified = votes.filter(vote => vote.anonymous);
      const anonymous = votes.filter(vote => !vote.anonymous);
      let an_total = 0;
      let sv_total = 0;
      for (const party of parties) {
        let an_count = anonymous.filter(vote => vote.voteFor === party).length;
        response.anonymous[party] = an_count;
        an_total += an_count;

        let sv_count = semi_verified.filter(vote => vote.voteFor === party).length;
        response.semi_verified[party] = sv_count;
        sv_total += sv_count;
      }
      response.anonymous.total = an_total;
      response.semi_verified.total = sv_total;
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

    await Votes.find({ }).then(votes => {
      for (const party of parties) {
        const party_votes = votes.filter(vote => vote.voteFor === party);
        let total = 0;
        for (const age of ['teen', 'youngster', 'adults', 'seniors', 'adults']) {
          let count = party_votes.filter(vote => vote.ageGroup === age).length;
          response[party][age] = count;
          total += count;
        }
        response[party].total = total;
      }
    });
    console.log(response);

    res.status(201).json({ msg: 'success', data: response });
  }
  else {          // Total Votes will be given
    const response = {};
    await Votes.find({ }).then(votes => {
      let total = 0;
      for (const party of parties) {
        let count = votes.filter(vote => vote.voteFor === party).length;
        response[party] = count;
        total += count;
      }
      response.total = total;
    });
    for (const party of Object.keys(votingData))
      response[party] = await Votes.countDocuments({ voteFor: party });

    response.total = await Votes.countDocuments();
    res.status(201).json({ msg: 'success', data: response });
  }
});

module.exports = router;
