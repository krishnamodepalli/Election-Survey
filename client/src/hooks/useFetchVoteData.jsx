
// we need to fetch the voting data
import { useEffect } from "react";

const useFetchVoteData = () => {
  const server_URL = import.meta.env.VITE_APP_SERVER_URL;

  // this custom hook will fetch the data and return the data
  useEffect(() => {
    // fetch the data
    fetch(server_URL + '/data/vote-stats/').then((response) => {
      response.json().then((data) => {
        window.localStorage.setItem('votes', JSON.stringify(data.data));
      });
    });
    fetch(server_URL + '/data/vote-stats/?diff-votes=true').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          window.localStorage.setItem('diff-votes', JSON.stringify(data.data));
        });
      }
    });
    fetch(server_URL + '/data/vote-stats/?group-age=true').then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          window.localStorage.setItem('age-wise-votes', JSON.stringify(data.data));
        });
      }
    });
  }, []);
};

export default  useFetchVoteData;
