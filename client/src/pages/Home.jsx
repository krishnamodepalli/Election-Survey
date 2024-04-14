
import SurveyForm from "../components/SurveyForm.jsx";
import DropDownCanvas, { closeCanvas } from "../components/DropDownCanvas.jsx";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [onlyResults, setOnlyResults] = useState(false);

  useEffect(() => {
    const doc = JSON.parse(window.localStorage.getItem('doc'));
    if (doc) {
      setAlreadyVoted(true);
      // TODO Also check if the document is valid or not.
      if (!doc.anonymous)
        setOnlyResults(true);
      closeCanvas();
    } else {  // saying that this session to the user is fresh, or first time.
      // we need to bring down a canvas showing the disclaimer of the survey.
      setTimeout(() => {
        closeCanvas();
      }, 20000);      // after 10 seconds it will be automatically closed if no
    }
  }, []);

  return (
      <>
        <DropDownCanvas >
          {/* Add here the content you want to display in the dropdown */}
          <p className="english">
            This is just a real-time project which some engineering college
            students collectively developed and deployed just to gain some
            real-time experience on developing web-applications.
          </p>
          <p className="telugu">
            ఇది కేవలం కొంతమంది ఇంజినీరింగ్ కళాశాల విద్యార్థులు సమిష్టిగా అభివృద్ధి చేసారు,
            వెబ్ అప్లికేషన్‌ అభివృద్ధి చేయడంలో కొంత అనుభవాన్ని పొందడం కోసం మాత్రమే చేసారు.
          </p>
          <br/>
          <p className="english">
            We do not support or side with a certain party in this elections,
            but only developed a very transparent platform to conduct a
            crystal-clear digital-survey.
          </p>
          <p className="telugu">
            మేము ఈ ఎన్నికలలో ఒక నిర్దిష్ట పార్టీకి మద్దతు ఇవ్వము లేదా పక్షం వహించము,
            డిజిటల్-సర్వే నిర్వహించడానికి చాలా పారదర్శక వేదికను మాత్రమే అభివృద్ధి చేసాము
          </p>
        </DropDownCanvas>
        <SurveyForm onlyResults={onlyResults} alreadyVoted={alreadyVoted} setAlreadyVoted={setAlreadyVoted} />
      </>
  );
};

export default HomePage;
