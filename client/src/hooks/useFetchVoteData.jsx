
// we need to fetch the voting data
import { useEffect } from "react";

const useFetchVoteData = () => {
  // this custom hook will fetch the data and return the data
  useEffect(() => {
    console.log('running');
    // fetch the data
    fetch('https://es-backend-dcxu.onrender.com/data/vote-stats/').then((response) => {
      response.json().then((data) => {
        window.localStorage.setItem('votes', JSON.stringify(data.data));
      });
    });
    fetch('https://es-backend-dcxu.onrender.com/data/vote-stats/?diff-votes=true').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          window.localStorage.setItem('diff-votes', JSON.stringify(data.data));
        });
      }
    });
    fetch('https://es-backend-dcxu.onrender.com/data/vote-stats/?group-age=true').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          window.localStorage.setItem('age-wise-votes', JSON.stringify(data.data));
        });
      }
    });
  }, []);
};

export default  useFetchVoteData;
