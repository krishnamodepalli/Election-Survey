import {useEffect, useState} from 'react';
import ordinal from "ordinal";

import VoteChart from "../components/VoteChart.jsx";
import Toggle from "../components/Toggle.jsx";
import useFetchVoteData from "../hooks/useFetchVoteData.jsx";

const Results = () => {
  const [voteNo, setVoteNo] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [chartLabel, setChartLabel] = useState("Votes in Numbers");
  const [isDataPercent, setIsDataPercent] = useState(true);

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
      <>
        {/* display the voteNo of the user on the results page and also the
         total no. of votes received until now. */}
        {
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
        }
        <VoteChart yAxisLabel={chartLabel} chartData={chartData} dataFormat={isDataPercent} />
        <h3>Show results in : </h3>
        <br/>
        <Toggle leftLabel="Nums" rightLabel="Percent"
                onToggle={toggleVoteChartData}/>
      </>
  );
};

export default Results;
