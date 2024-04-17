
const adminRoutes = require('./routes/adminRoutes');
const dataRoutes = require('./routes/dataRoutes')
const connectDB = require('./db/mongo');
const Votes = require('./models/Votes');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// TODO 1 (feat) count the no. of votes saved into the database
let voteCount = 0;

// setting routes
app.use('/admin-panel', adminRoutes);
app.use('/data', dataRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is fired up and running on port ${port}`);
  connectDB();
});

// casting the vote
app.post('/cast', async (req, res) => {
  const party = req.body.party;
  let doc;
  try {
    let response = await Votes.castVote(party);
    doc = response.doc;
    if (!voteCount)       // if we do not have the vote count, then we can
      // get from the database
      voteCount = await Votes.countDocuments();

    // logging to the console
    console.log(`New vote casted to ${party}, total of ${++voteCount}.`);
    res.status(201).json({msg: 'Successfully casted your vote...👍', doc, voteNo: voteCount});
  } catch (e) {
    console.error(e);
    res.status(401).json({err: `Unable to cast your vote!!\nError msg:\n${e}`});
  }
});

// updating or converting the vote into semi-verified vote
app.post('/cast/convert', async (req, res) => {
  const id = req.body.id;
  const ageGroup = req.body.ageGroup;
  const constituency = req.body.constituency;

  // finding the cast vote document
  const vote = await Votes.findById(id);
  if (!vote.anonymous)
    res.status(200).json({'msg': 'Vote already verified'});
  vote.convertToSemi(ageGroup, constituency);
  console.log('Successfully convert an anonymous vote of id', id);
  res.status(200).json({msg: 'Successfully converted the vote', doc: vote});
});

module.exports = app;