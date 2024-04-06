import CrossChart from "./components/CrossChart.jsx";
import Toggle from "./components/Toggle.jsx";

import { AgeWisePartyVotes } from "./utils/AgeWisePartyVotes.js";

import { useState } from "react";

function App() {
  const data = {
    YCP: new AgeWisePartyVotes(100, 238, 129, 1234),
    TDP: new AgeWisePartyVotes(124, 2128, 21983, 12038),
    JSP: new AgeWisePartyVotes(2893, 3897, 8942, 97428),
    BJP: new AgeWisePartyVotes(2893, 2128, 21983, 12038),
  }
  const [stateData, useData] = useState(data);
  const [isPercentage, setIsPercentage] = useState(false);

  const changeData = () => {
    if (data.YCP.sum() === stateData.YCP.sum()) {
      const newData = {};
      Object.keys(data).forEach(party => {
        newData[party] = new AgeWisePartyVotes(
            Math.round((data[party].teens / data[party].sum()) * 100),
            Math.round((data[party].youngsters / data[party].sum()) * 100),
            Math.round((data[party].adults / data[party].sum()) * 100),
            Math.round((data[party].seniors / data[party].sum()) * 100));
      });
      useData(newData);
      setIsPercentage(true);
    }
    else {
      useData(data);
      setIsPercentage(false);
    }
  };
  return (
      <>
        <CrossChart title="% of Votes from each age group" data={stateData}
                    isPercentage={isPercentage} />
        <Toggle onToggle={changeData} />
      </>
  );
}

export default App
