import {useEffect, useState} from 'react';

import VoteChart from "../components/VoteChart.jsx";
import Toggle from "../components/Toggle.jsx";
import useFetchVoteData from "../hooks/useFetchVoteData.jsx";

const Results = () => {
  const [voteNo, setVoteNo] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [chartLabel, setChartLabel] = useState("Votes in Numbers");
  const [isDataPercent, setIsDataPercent] = useState(true);

  const [totalVotes, setTotalVotes] = useState(0);
  const [anonymousVotes, setAnonymousVotes] = useState(0);
  const [verifiedVotes, setVerifiedVotes] = useState(0);

  const setDefaultData = () => {
    const data = JSON.parse(localStorage.getItem("votes"));
    setChartData([
      ['Team', 'YCP', {role: 'annotation'}, 'TDP', {role: 'annotation'}, 'JSP', {role: 'annotation'}, 'BJP', {role: 'annotation'}, 'INC', {role: 'annotation'}],
      ['YCP', data.YCP, data.YCP.toString(), 0, '', 0, '', 0, '', 0, ''],
      ['TDP + JSP + BJP', 0, '', data.TDP, data.TDP.toString(), data.JSP, data.JSP.toString(), data.BJP, data.BJP.toString(), 0, ''],
      ['INC', 0, '', 0, '', 0, '', 0, '', data.INC, data.INC.toString()]
    ]);
  };
  const setPercentData = () => {
    const data = JSON.parse(localStorage.getItem("votes"));
    const total = data.total;
    let votes = [
      Math.round(data.YCP * 100 / total),
      Math.round(data.TDP * 100 / total),
      Math.round(data.JSP * 100 / total),
      Math.round(data.BJP * 100 / total),
      Math.round(data.INC * 100 / total),
    ]
    setChartData([
      ['Team', 'YCP', {role: 'annotation'}, 'TDP', {role: 'annotation'}, 'JSP', {role: 'annotation'}, 'BJP', {role: 'annotation'}, 'INC', {role: 'annotation'}],
      ['YCP', votes[0], votes[0].toString() + '%', 0, '', 0, '', 0, '', 0, ''],
      ['TDP + JSP + BJP', 0, '', votes[1], votes[1].toString() + '%', votes[2], votes[2].toString() + '%', votes[3], votes[3].toString() + '%', 0, ''],
      ['INC', 0, '', 0, '', 0, '', 0, '', votes[4], votes[4].toString() + '%']
    ]);
  };

  // TODO 1 Fetch the data from the database and store it in the localStorage
  useFetchVoteData();
  useEffect(() => {
    // TODO 2 Get the data from the localStorage and send it to the VoteChart
    toggleVoteChartData();
    // TODO 3 Get the voteNo from localStorage and send it to the Results
    const votesData = JSON.parse(localStorage.getItem("votes"));
    const diff_votes = JSON.parse(localStorage.getItem("diff-votes"));
    const age_wise_votes = JSON.parse(localStorage.getItem("age-wise-votes"));
    setTotalVotes(votesData.total);
    setAnonymousVotes(diff_votes.anonymous.total);
    setVerifiedVotes(diff_votes.semi_verified.total);
    const voteNo = parseInt(window.localStorage.getItem("voteNo"));
    if (voteNo)
      setVoteNo(voteNo);
  }, []);


  const toggleVoteChartData = () => {
    isDataPercent ? setDefaultData() : setPercentData();
    isDataPercent ? setChartLabel("Votes (#)") :
        setChartLabel("Votes (%)");
    setIsDataPercent(!isDataPercent);
  };

  return (
      <div id="result-page">
        {/* display the voteNo of the user on the results page and also the
         total no. of votes received until now. */}
        {/*
          voteNo ?
              <>
                <p className="english" id="voteNo">You are
                  the {ordinal(voteNo)} contributor in our survey. Thank you
                  🙏.</p>
                <p className="telugu" id="voteNo">మీరు మా సర్వేలో {voteNo}వ
                  కంట్రిబ్యూటర్. ధన్యవాదాలు 🙏.</p>
              </>
              :
              null
        */}
        <VoteChart yAxisLabel={chartLabel} chartData={chartData}
                   dataFormat={isDataPercent}/>
        <br/>
        <div className="container">
          <Toggle leftLabel="Nums" rightLabel="Percent"
                  onToggle={toggleVoteChartData}/>
        </div>
        <br/>
        <p className="english">Total Votes
          Received: <strong>{totalVotes}</strong></p>
        <p className="english">Anonymous
          Votes: <strong>{anonymousVotes}</strong></p>
        <p className="english">Verified Votes: <strong>{verifiedVotes}</strong>
        </p>
        <br/>
        <p className="english">Please share about our digital survey &ensp;
          <a id="whatsapp-btn"
             href="https://api.whatsapp.com/send/?text=https%3A%2F%2Felection-survey-flame.vercel.app%2F%0AThis+is+a+digital-survey+web+application+built+by+CS+Engineering+students+as+a+real-time+project.+We+do+not+support+or+side+with+any+certain+party+in+this+voting+process%2C+We+only+intend+to+provide+a+transparent+platform+for+the+sake+of+accurate+results.%0A%0AElection+Survey%2C+this+is+a+digital+survey+in+which+we+can+vote+for+our+preferred+party+in+our+upcoming+AP+2024+Elections.+Check+out+the+results+of+the+survey%2C+showing+the+numbers+and+votes.%0A%0AThank+you+for+your+contribution...%E2%9D%A4%F0%9F%99%8F&type=custom_url&app_absent=0"
             target="_blank">
            <i className="fa-brands fa-square-whatsapp fa-2xl"></i>
          </a>
        </p>
      </div>
  );
};

export default Results;
