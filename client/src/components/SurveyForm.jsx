import "./SurveyForm.css";

import ycpSymbol from "../assets/ycp-symbol.png";
import tdpSymbol from "../assets/tdp-symbol.png";
import jspSymbol from "../assets/jsp-symbol.svg";
import bjpSymbol from "../assets/bjp-symbol.svg";
import incSymbol from "../assets/inc-symbol.svg";
import tjbSymbol from "../assets/tjb-symbol.jpeg";

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const SurveyForm = ({onClick, alreadyVoted, setAlreadyVoted}) => {
  const [error, setError] = useState("");
  const [telError, setTelError] = useState("");
  const [tjbError, setTjbError] = useState("");
  const [teluguTJBError, setTeluguTJBError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [telSuccessMsg, setTelSuccessMsg] = useState("");

  // if the user already voted in this device
  useEffect(() => {
    if (alreadyVoted) {
      setSuccessMsg("Thank you for  your valuable response. Please" +
          " check out the results...");
      setTelSuccessMsg("మీ విలువైన స్పందనకు ధన్యవాదాలు. దయచేసి ఫలితాలను చూడండి...");
    }
  }, [alreadyVoted]);

  const expandOptions = () => {
    if (alreadyVoted) return;
    let card = document.getElementById("tjb-team-card");
    card.style.height = "20rem";
  };
  const closeExpand = () => {
    let card = document.getElementById("tjb-team-card");
    card.style.height = "3rem";
  };
  const saveToLocal = (doc, voteNo) => {
    window.localStorage.setItem("doc", JSON.stringify(doc));
    // also save the vote no.
    window.localStorage.setItem('voteNo', voteNo);
  };
  const castVote = () => {
    setIsLoading(true);
    // we will gather all the data in here and set any errors and then save to the local storage
    let team = document.voteForm.vote.value;
    if (!team) {
      setIsLoading(false);
      setError("Please specify an option");
      setTelError("దయచేసి ఒక ఎంపికను పేర్కొనండి");
      return;
    }
    let party;
    if (team === "tjb") {
      // we need to get the specific party
      party = document.expandedForm.tjbVote.value;
      if (!party) {
        // we need to set an error;
        setTjbError("Please choose one option.");
        setTeluguTJBError("దయచేసి పేర్కొనండి");
        return;
      }
      // if success, then just cast the vote
    } else party = team;

    // fetch("https://es-backend-dcxu.onrender.com/cast", {
    fetch("http://localhost:8080/cast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({party}),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const doc = data.doc;
          const voteNo = data.voteNo;
          saveToLocal(doc, voteNo);
          setSuccessMsg("Successfully casted your vote.");
          setTelSuccessMsg("మీ ఓటు విజయవంతంగా వేయబడింది");
          // after a successful vote, we need to show the results page
          setAlreadyDone(true);
        });
      }
      // we have to set the isLoading even if the result is ok or not too.
      setIsLoading(false);
      setAlreadyVoted(true);
      closeExpand();
    });

    setTjbError("");
    setTeluguTJBError("");
  };

  return (
      <div className="form-card" onClick={onClick}>
        <form
            id="voteForm"
            action="#"
            name="voteForm"
            onSubmit={(e) => {
              e.preventDefault();
              castVote();
            }}
        >

          <p className="ques english mandatory">
            Which party do you support in your constituency for the 2024
            ELECTIONS?
          </p>
          <p className="ques telugu mandatory">
            2024 ఎన్నికలకు మీ నియోజకవర్గంలో మీరు ఏ పార్టీకి మద్దతు ఇస్తారు?
          </p>
          <input
              className="party-option"
              type="radio"
              name="vote"
              id="ycp-team"
              value="ycp"
              disabled={alreadyVoted}
          />
          <label className="team-card" htmlFor="ycp-team"
                 onClick={closeExpand}>
            <div className="team-brand">
              YSRCP
              <img
                  className="party-symbol"
                  src={ycpSymbol}
                  alt="YCP party symbol"
              />
            </div>
          </label>
          <br/>
          <input
              className="party-option"
              type="radio"
              name="vote"
              id="tjb-team"
              value="tjb"
              disabled={alreadyVoted}
          />
          <label
              className="team-card"
              id="tjb-team-card"
              htmlFor="tjb-team"
              onClick={expandOptions}
          >
            <div className="team-brand" id="tjb-opt">
              TDP + JSP + BJP
              <img
                  src={tjbSymbol}
                  alt="TDP + JSP + BJP combined party symbol"
                  className="party-symbol"
              />
            </div>
            <form name="expandedForm" className="expanded-card">
              <hr/>
              <p className="ques mandatory english">Please specify?</p>
              <p className="mandatory-error">{tjbError}</p>
              <p className="telugu mandatory-error">{teluguTJBError}</p>
              <br/>
              <input
                  type="radio"
                  name="tjbVote"
                  id="tdp-tjb"
                  value="tdp"
                  onChange={() => {
                    setTjbError("");
                    setTeluguTJBError("");
                  }}
              />
              <label className="specified-opt" htmlFor="tdp-tjb">
                TDP
                <img
                    src={tdpSymbol}
                    alt="TDP party Symbol"
                    className="party-symbol"
                />
              </label>
              <br/>
              <br/>
              <input
                  type="radio"
                  name="tjbVote"
                  id="jsp-tjb"
                  value="jsp"
                  onChange={() => {
                    setTjbError("");
                    setTeluguTJBError("");
                  }}
              />
              <label className="specified-opt" htmlFor="jsp-tjb">
                JSP
                <img
                    src={jspSymbol}
                    alt="JSP party Symbol"
                    className="party-symbol"
                />
              </label>
              <br/>
              <br/>
              <input
                  type="radio"
                  name="tjbVote"
                  id="bjp-tjb"
                  value="bjp"
                  onChange={() => {
                    setTjbError("");
                    setTeluguTJBError("");
                  }}
              />
              <label className="specified-opt" htmlFor="bjp-tjb">
                BJP
                <img
                    src={bjpSymbol}
                    alt="BJP party Symbol"
                    className="party-symbol"
                />
              </label>
              <br/>
              <br/>
            </form>
          </label>
          <br/>
          <input
              className="party-option"
              type="radio"
              name="vote"
              id="inc-team"
              value="inc"
              disabled={alreadyVoted}
          />
          <label className="team-card" htmlFor="inc-team"
                 onClick={closeExpand}>
            <div className="team-brand">
              INC
              <img
                  className="party-symbol"
                  src={incSymbol}
                  alt="INC party symbol"
              />
            </div>
          </label>
          <br/>
          <button type="submit" id="voteBtn"
                  disabled={isLoading || alreadyVoted}>
            {
              isLoading ? "Voting..." : "Vote"
            }
          </button>
          <p className="english error">{error}</p>
          <p className="telugu error">{telError}</p>
          <p className="english success">{successMsg}</p>
          <p className="telugu success">{telSuccessMsg}</p>
          <br/>
          {
            alreadyVoted ?
                <>
                  <Link to="/extend" id="continue-btn">Continue Survey</Link>
                  <Link to="/voting-result" id="res-btn">View Results </Link>
                </>
                : null
          }
        </form>
      </div>
  );
};

export default SurveyForm;
