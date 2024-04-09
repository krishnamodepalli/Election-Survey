
const adminRoutes = require('./routes/adminRoutes');
const dataRoutes = require('./routes/dataRoutes')
const connectDB = require('./db/mongo');
const Votes = require('./models/Votes');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

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
  const constituency = req.body.constituency;
  const ageGroup = req.body.ageGroup;
  let doc;
  try {
    if (!ageGroup && !constituency) {
      let res = await Votes.castAnonymousVote(party);
      doc = res.doc;
    }
    else
      Votes.castVote(party, ageGroup, constituency);
    res.status(201).json({ msg: 'Successfully casted your vote...👍', doc });
  } catch (e) {
    console.error(e);
    res.status(401).json({ err: 'Unable to cast your vote!!' });
  }
});
