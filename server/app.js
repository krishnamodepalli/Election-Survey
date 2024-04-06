
const adminRoutes = require('./routes/adminRoutes');
const dataRoutes = require('./routes/dataRoutes')
const connectDB = require('./db/mongo');
const Votes = require('./models/Votes');

const express = require('express');

const app = express();
app.use(express.json());

// setting routes
app.use('/admin-panel', adminRoutes);
app.use('/data', dataRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is fired up and running on port ${port}`);
  connectDB();
});

// casting the vote
app.post('/cast', (req, res) => {
  const party = req.body.party;
  const constituency = req.body.constituency;
  const ageGroup = req.body.ageGroup;
  try {
    if (!ageGroup && !constituency)
      Votes.castAnonymousVote(party);
    else
      Votes.castVote(party, ageGroup, constituency);
    res.send('Successfully casted your vote...👍');
  } catch (e) {
    console.error(e);
    res.status(401).json({ err: 'Unable to cast your vote!!' });
  }
});
