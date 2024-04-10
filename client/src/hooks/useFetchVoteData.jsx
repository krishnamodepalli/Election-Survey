
// we need to fetch the voting data
import { useEffect } from "react";

const useFetchVoteData = async () => {
  // this custom hook will fetch the data and return the data
  let result = {};
  await useEffect(() => {
    // fetch the data
    fetch('http://localhost:8080/data/vote-stats/').then((response) => {
      response.json().then((data) => {
        window.localStorage.setItem('votes', JSON.stringify(data.data));
      });
    });
  }, []);
  return result;
};

export default  useFetchVoteData;
