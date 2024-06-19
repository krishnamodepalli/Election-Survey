// we need to fetch the voting data
import { useEffect } from "react";

const useFetchVoteData = () => {
  const server_URL = import.meta.env.VITE_APP_SERVER_URL;

  // this custom hook will fetch the data and return the data
  useEffect(() => {
    // fetch the data
    // fetch(server_URL + '/data/vote-stats/').then((response) => {
    //   response.json().then((data) => {
    //     window.localStorage.setItem('votes', JSON.stringify(data.data));
    //   });
    // });
    window.localStorage.setItem(
      "votes",
      JSON.stringify({
        YCP: 49,
        TDP: 37,
        JSP: 26,
        BJP: 5,
        INC: 4,
        total: 121,
      })
    );
    // fetch(server_URL + "/data/vote-stats/?diff-votes=true").then((response) => {
    //   if (response.ok) {
    //     response.json().then((data) => {
    //       window.localStorage.setItem("diff-votes", JSON.stringify(data.data));
    //     });
    //   }
    // });
    window.localStorage.setItem("diff-votes", JSON.stringify({
      "anonymous": {
        "YCP": 28,
        "TDP": 20,
        "JSP": 11,
        "BJP": 0,
        "INC": 3,
        "total": 62
      },
      "semi_verified": {
        "YCP": 21,
        "TDP": 17,
        "JSP": 15,
        "BJP": 5,
        "INC": 1,
        "total": 59
      }
    }));
    // fetch(server_URL + "/data/vote-stats/?group-age=true").then((response) => {
    //   if (response.ok) {
    //     response.json().then((data) => {
    //       window.localStorage.setItem(
    //         "age-wise-votes",
    //         JSON.stringify(data.data)
    //       );
    //     });
    //   }
    // });
    window.localStorage.setItem("age-wise-votes", JSON.stringify({
      "TDP": {
        "teen": 3,
        "youngster": 12,
        "adults": 0,
        "seniors": 0,
        "total": 15
      },
      "YCP": {
        "teen": 1,
        "youngster": 20,
        "adults": 0,
        "seniors": 0,
        "total": 21
      },
      "JSP": {
        "teen": 3,
        "youngster": 12,
        "adults": 0,
        "seniors": 0,
        "total": 15
      },
      "BJP": {
        "teen": 1,
        "youngster": 2,
        "adults": 0,
        "seniors": 0,
        "total": 3
      },
      "INC": {
        "teen": 0,
        "youngster": 1,
        "adults": 0,
        "seniors": 0,
        "total": 1
      }
    }))
  }, []);
};

export default useFetchVoteData;
