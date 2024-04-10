import "./SurveyForm.css";

import ycpSymbol from "../assets/ycp-symbol.png";
import tdpSymbol from "../assets/tdp-symbol.png";
import jspSymbol from "../assets/jsp-symbol.svg";
import bjpSymbol from "../assets/bjp-symbol.svg";
import incSymbol from "../assets/inc-symbol.svg";
import tjbSymbol from "../assets/tjb-symbol.jpeg";

import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const SurveyForm = () => {
  // check if already a vote is casted in this device
  const [alreadyDone, setAlreadyDone] = useState(false);
  useEffect(() => {
    if (window.localStorage.getItem('doc')) {
      // if found then, we can redirect to another page
      setAlreadyDone(true);
      setSuccessMsg("You've already contributed for the survey, Thank you for" +
          " your valuable response and time. Please check out the results...");
      setTelSuccessMsg("మీరు ఇప్పటికే సర్వే కోసం సహకరించారు, మీ విలువైన" +
          " ప్రతిస్పందన మరియు సమయానికి ధన్యవాదాలు. దయచేసి ఫలితాలను చూడండి...");
    }
  }, []);

  const [error, setError] = useState("");
  const [telError, setTelError] = useState("");
  const [tjbError, setTjbError] = useState("");
  const [teluguTJBError, setTeluguTJBError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [telSuccessMsg, setTelSuccessMsg] = useState("");

  const expandOptions = () => {
    if (alreadyDone) return;
    let card = document.getElementById("tjb-team-card");
    card.style.height = "19rem";
  };
  const closeExpand = () => {
    let card = document.getElementById("tjb-team-card");
    card.style.height = "3rem";
  };
  const saveToLocal = (doc) => {
    window.localStorage.setItem("doc", JSON.stringify(doc));
  };
  const castVote = async () => {
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

    fetch("https://es-backend-dcxu.onrender.com/cast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({party}),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const doc = data.doc;
          saveToLocal(doc);
          setSuccessMsg("Successfully casted your vote.");
        });
      }
      // we have to set the isLoading even if the result is ok or not too.
      setIsLoading(false);
    });

    setTjbError("");
    setTeluguTJBError("");
  };

  return (
      <div className="back">
        <div className="card">
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
                disabled={alreadyDone}
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
                disabled={alreadyDone}
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
                disabled={alreadyDone}
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
                    disabled={isLoading || alreadyDone}>
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
              alreadyDone ?
                  <p className="english">show <Link to="/voting-result"
                                                    className="btn"
                                                    id="res-btn">Results </Link>
                  </p> : null
            }
          </form>
        </div>
      </div>
  );
};

export default SurveyForm;
