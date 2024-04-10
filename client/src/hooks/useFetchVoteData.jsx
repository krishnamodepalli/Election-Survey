
// we need to fetch the voting data
import { useEffect } from "react";

const useFetchVoteData = () => {
  // this custom hook will fetch the data and return the data
  useEffect(() => {
    // fetch the data
    fetch('https://es-backend-dcxu.onrender.com/data/vote-stats/').then((response) => {
      response.json().then((data) => {
        window.localStorage.setItem('votes', JSON.stringify(data.data));
      });
    });
  }, []);
};

export default  useFetchVoteData;
