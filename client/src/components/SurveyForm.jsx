import "./SurveyForm.css";

import ycpSymbol from "../assets/ycp-symbol.png";
import tdpSymbol from "../assets/tdp-symbol.png";
import jspSymbol from "../assets/jsp-symbol.svg";
import bjpSymbol from "../assets/bjp-symbol.svg";
import incSymbol from "../assets/inc-symbol.svg";
import tjbSymbol from "../assets/tjb-symbol.jpeg";

import { useState } from "react";

const SurveyForm = () => {
  const [error, setError] = useState("");
  const [teluguError, setTeluguError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const expandOptions = () => {
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
    console.log("Casting...");
    // we will gather all the data in here and set any errors and then save to the local storage
    let team = document.voteForm.vote.value;
    let party;
    if (team === "tjb") {
      // we need to get the specific party
      party = document.expandedForm.tjbVote.value;
      if (!party) {
        // we need to set an error;
        setError("Please choose one option.");
        setTeluguError("దయచేసి పేర్కొనండి");
        return;
      }
      // if success, then just cast the vote
    } else party = team;

    fetch("http://localhost:8080/cast/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ party }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          const doc = data.doc;
          console.log(doc);
          saveToLocal(doc);
        });
      }
    });

    setError("");
    setTeluguError("");
    setIsLoading(false);
    console.log("Done...");
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
          />
          <label className="team-card" htmlFor="ycp-team" onClick={closeExpand}>
            <div className="team-brand">
              YSRCP
              <img
                className="party-symbol"
                src={ycpSymbol}
                alt="YCP party symbol"
              />
            </div>
          </label>
          <br />
          <input
            className="party-option"
            type="radio"
            name="vote"
            id="tjb-team"
            value="tjb"
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
              <hr />
              <p className="ques mandatory english">Please specify?</p>
              <p className="mandatory-error">{error}</p>
              <p className="telugu mandatory-error">{teluguError}</p>
              <br />
              <input
                type="radio"
                name="tjbVote"
                id="tdp-tjb"
                value="tdp"
                onChange={() => {
                  setError("");
                  setTeluguError("");
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
              <br />
              <br />
              <input
                type="radio"
                name="tjbVote"
                id="jsp-tjb"
                value="jsp"
                onChange={() => {
                  setError("");
                  setTeluguError("");
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
              <br />
              <br />
              <input
                type="radio"
                name="tjbVote"
                id="bjp-tjb"
                value="bjp"
                onChange={() => {
                  setError("");
                  setTeluguError("");
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
              <br />
              <br />
            </form>
          </label>
          <br />
          <input
            className="party-option"
            type="radio"
            name="vote"
            id="inc-team"
            value="inc"
          />
          <label className="team-card" htmlFor="inc-team" onClick={closeExpand}>
            <div className="team-brand">
              INC
              <img
                className="party-symbol"
                src={incSymbol}
                alt="INC party symbol"
              />
            </div>
          </label>
          <br />
          <button type="submit" id="voteBtn" disabled={isLoading}>
            Vote
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
