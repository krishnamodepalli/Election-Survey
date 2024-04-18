import {useState} from "react";
import {Link, Navigate} from 'react-router-dom';

import './ExtendedForm.css';

const ExtendedForm = () => {
  const server_URL = import.meta.env.VITE_APP_SERVER_URL;

  const doc = JSON.parse(window.localStorage.getItem('doc'));
  if (!doc.anonymous)
    return <Navigate to="/"/>;
  const [isLoading, setIsLoading] = useState(false);
  const [doneVoting, setDoneVoting] = useState(false);
  const [btnDisplay, setBtnDisplay] = useState("none");
  const [successMsg, setSuccessMsg] = useState("");
  const [telSuccessMsg, setTelSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [telErrMsg, setTelErrMsg] = useState("");

  // TODO What to do on submitting the form
  const updateVote = () => {
    setIsLoading(true);
    // get the details of the vote, and also the updating values
    const voteID = JSON.parse(window.localStorage.getItem('doc'))._id;
    // now we have to update the vote with provided values
    const constituency = document.getElementById('sel-constituency').value;
    const ageGroup = document.querySelector('input[name="age"]:checked').value;

    if (!constituency || !ageGroup) {
      setErrMsg("Please fill all the above details.");
    }

    // now send the POST request
    fetch(server_URL + '/cast/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: voteID, ageGroup, constituency})
    }).then((response) => {
      if (response.ok) {
        console.log(response);
        setDoneVoting(true);
        setBtnDisplay("relative");
        setSuccessMsg("Successfully verified your vote. Please continue to" +
            " the results");
        response.json().then((data) => {
          window.localStorage.setItem('doc', JSON.stringify(data.doc));
        });
      }
      setIsLoading(false);
    });
  };

  return (
      <>
        <form className="extend-form" onSubmit={
          (e) => {
            e.preventDefault();
            updateVote();
          }
        }>
          <p className="english ques mandatory">Please select your
            constituency.</p>
          <p className="telugu ques mandatory">దయచేసి మీ నియోజకవర్గాన్ని
            ఎంచుకోండి.</p>
          <select id="sel-constituency" name="constituency" required>
<option value="other-state">Other State</option>
            <optgroup label="Anantapur">
              <option value="" disabled selected hidden> --SELECT--
              </option>
              <option value="anantapur-urban">Anantapur Urban</option>
              <option value="dharmavaram">Dharmavaram</option>
              <option value="guntakal">Guntakal</option>
              <option value="hindupur">Hindupur</option>
              <option value="kadiri">Kadiri</option>
              <option value="kalyandurg">Kalyandurg</option>
              <option value="madakasira">Madakasira</option>
              <option value="penukonda">Penukonda</option>
              <option value="puttaparthi">Puttaparthi</option>
              <option value="raptadu">Raptadu</option>
              <option value="rayadurg">Rayadurg</option>
              <option value="singanamala">Singanamala</option>
              <option value="tadipatri">Tadipatri</option>
              <option value="uravakonda">Uravakonda</option>
            </optgroup>
            <optgroup label="Chittor">
              <option value="chandragiri">Chandragiri</option>
              <option value="chitoor">Chitoor</option>
              <option value="gangadhara-nellore">Gangadhara Nellore</option>
              <option value="kuppam">Kuppam</option>
              <option value="madanapalle">Madanapalle</option>
              <option value="nagari">Nagari</option>
              <option value="palamaner">Palamaner</option>
              <option value="pileru">Pileru</option>
              <option value="punganur">Punganur</option>
              <option value="puthalapattu">Puthalapattu</option>
              <option value="satyavedu">Satyavedu</option>
              <option value="srikalahasti">Srikalahasti</option>
              <option value="thamballipalle">Thamballipalle</option>
              <option value="tirupati">Tirupati</option>
            </optgroup>
            <optgroup label="East Godavari">
              <option value="tuni">Tuni</option>
              <option value="prathipadu-kakinada">Prathipadu (Kakinada)</option>
              <option value="pithapuram">Pithapuram</option>
              <option value="kakinada-rural">Kakinada Rural</option>
              <option value="peddapuram">Peddapuram</option>
              <option value="anaparthy">Anaparthy</option>
              <option value="kakinada-city">Kakinada City</option>
              <option value="ramachandrapuram	">Ramachandrapuram</option>
              <option value="mummidivaram">Mummidivaram</option>
              <option value="malapuram">Malapuram</option>
              <option value="razole">Razole</option>
              <option value="gannavaram-konaseema">Gannavaram (Konaseema)
              </option>
              <option value="Kothapeta">Kothapeta</option>
              <option value="Mandapeta">Mandapeta</option>
              <option value="Rajanagaram">Rajanagaram</option>
              <option value="Rajahmundry City">Rajahmundry City</option>
              <option value="Rajahmundry Rural">Rajahmundry Rural</option>
              <option value="Jaggampeta">Jaggampeta</option>
              <option value="Rampachodavaram">Rampachodavaram</option>
              <option value="Kovvur">Kovvur</option>
              <option value="Nidadavole">Nidadavole</option>
            </optgroup>
            <optgroup label="Guntur">
              <option value="bapatla">Bapatla</option>
              <option value="chilakaluripeta">Chilakaluripeta</option>
              <option value="guntur-east">Guntur East</option>
              <option value="guntur-west">Guntur west</option>
              <option value="guruzala">Guruzala</option>
              <option value="macherla">Macherla</option>
              <option value="mangalagiri">Mangalagiri</option>
              <option value="narasaraopeta">Narasaraopeta</option>
              <option value="pedakurapadu">Pedakurapadu</option>
              <option value="ponnur">Ponnur</option>
              <option value="prathipadu">Prathipadu</option>
              <option value="repalle">Repalle</option>
              <option value="sattennapalli">Sattennapalli</option>
              <option value="tenali">Tenali</option>
              <option value="tadikonda">Tadikonda</option>
              <option value="vemeru">Vemeru</option>
              <option value="vinukonda">Vinukonda</option>
            </optgroup>
            <optgroup label="Kadapa">
              <option value="badvel">Badvel</option>
              <option value="jammalamadugu">Jammalamadugu</option>
              <option value="kadapa">kadapa</option>
              <option value="kamalapuram">Kamalapuram</option>
              <option value="kodur">kodur</option>
              <option value="mydukur">Mydukur</option>
              <option value="proddatur">proddatur</option>
              <option value="pulivendla">Pulivendla</option>
              <option value="rajampet">Rajampet</option>
              <option value="rayachoti">Rayachoti</option>
            </optgroup>
            <optgroup label="Krishna">
              <option value="gannavaram">Gannavaram</option>
              <option value="gudivada">Gudivada</option>
              <option value="pedana">Pedana</option>
              <option value="machilipatnam">Machilipatnam</option>
              <option value="avanigadda">Avanigadda</option>
              <option value="pamarru">Pamarru</option>
              <option value="penamaluru">Penamaluru</option>
              <option value="tiruvuru">Tiruvuru</option>
              <option value="vijayawada-west">Vijayawada West</option>
              <option value="vijayawada-east">Vijayawada East</option>
              <option value="vijayawada-central">Vijayawada Central</option>
              <option value="nandigama">Nandigama</option>
              <option value="mylavaram">Mylavaram</option>
              <option value="jaggayyapeta">Jaggayyapeta</option>
            </optgroup>
            <optgroup label="Kurnool">
              <option value="adoni">Adoni</option>
              <option value="allagadda">Allagadda</option>
              <option value="alur">Alur</option>
              <option value="banagananpalle">Banaganapalle</option>
              <option value="dhone">Dhone</option>
              <option value="kodumur">Kodumur</option>
              <option value="kurnool">Kurnool</option>
              <option value="mantralayam">Mantralayam</option>
              <option value="nandikotukur">Nandikotukur</option>
              <option value="nandyal">Nandyal</option>
              <option value="panyam">Panyam</option>
              <option value="pattikonda">Pattikonda</option>
              <option value="srisailam">Srisailam</option>
              <option value="yemmiganur">Yemmiganur</option>
            </optgroup>
            <optgroup label="Nellore">
              <option value="atmakur">Atmakur</option>
              <option value="gudur">Gudur</option>
              <option value="kavali">Kavali</option>
              <option value="nellore-city">Nellore city</option>
              <option value="nellore-rural">Nellore rural</option>
              <option value="sarvepalli">Sarvepalli</option>
              <option value="sullurpeta">Sullurpeta</option>
              <option value="udaygiri">Udaygiri</option>
              <option value="venkatgiri">Venkatgiri</option>
              <option value="kovur">Kovur</option>
            </optgroup>
            <optgroup label="Prakasam">
              <option value="addanki">Addanki</option>
              <option value="chirala">Chirala</option>
              <option value="darsi">Darsi</option>
              <option value="giddalur">Giddalur</option>
              <option value="kandukur">Kandukur</option>
              <option value="kanigiri">Kangiri</option>
              <option value="kondapi">Kondapi</option>
              <option value="markapuram">Markapuram</option>
              <option value="ongole">Ongole</option>
              <option value="parchur">Parchur</option>
              <option value="santhanuthalapadu">Santhanuthalapadu</option>
              <option value="yerragondapalem">Yerragondapalem</option>
            </optgroup>
            <optgroup label="Srikakulam">
              <option value="ichchapuram">Ichchapuram</option>
              <option value="palasa">Palasa</option>
              <option value="tekkali">Tekkali</option>
              <option value="pathapatnam">Pathapatnam</option>
              <option value="amadavalasa">Amadavalasa</option>
              <option value="etcherla">Etcherla</option>
              <option value="narsannapeta">Narsannapeta</option>
            </optgroup>
            <optgroup label="Vishakapatnam">
              <option value="Bhimili">Bhimili</option>
              <option value="visakhapatnam-east">Visakhapatnam East</option>
              <option value="visakhapatnam-south">Visakhapatnam South</option>
              <option value="visakhapatnam-north">Visakhapatnam North</option>
              <option value="visakhapatnam-west">Visakhapatnam West</option>
              <option value="gajuwaka">Gajuwaka</option>
              <option value="chodavaram">Chodavaram</option>
              <option value="madugula">Madugula</option>
              <option value="araku-valley">Araku Valley</option>
              <option value="paderu">Paderu</option>
              <option value="anakapalle">Anakapalle</option>
              <option value="pendurthi">Pendurthi</option>
              <option value="elamanchili">Elamanchili</option>
              <option value="payakaraopet">Payakaraopet</option>
              <option value="narsipatnam">Narsipatnam</option>
            </optgroup>
            <optgroup label="Vizainagaram">
              <option value="rajam">Rajam</option>
              <option value="palakonda">Palakonda</option>
              <option value="kurupam">Kurupam</option>
              <option value="parvathipuram">Parvathipuram</option>
              <option value="salur">Salur</option>
              <option value="bobbili">Bobbili</option>
              <option value="cheepurupalli">Cheepurupalli</option>
              <option value="gajapathinagaram">Gajapathinagaram</option>
              <option value="nellimarla">Nellimarla</option>
              <option value="vizianagaram">Vizianagaram</option>
              <option value="srungavarapukota">Srungavarapukota</option>
            </optgroup>
            <optgroup label="West Godavari">
              <option value="achanta">Achanta</option>
              <option value="palakollu">Palakollu</option>
              <option value="narsapuram">Narsapuram</option>
              <option value="bhimavaram">Bhimavaram</option>
              <option value="undi">Undi</option>
              <option value="tanuku">Tanuku</option>
              <option value="tadepalligudem">Tadepalligudem</option>
              <option value="unguturu">Unguturu</option>
              <option value="denduluru">Denduluru</option>
              <option value="eluru">Eluru</option>
              <option value="chintalapudi">Chintalapudi</option>
              <option value="gopalapuram">Gopalapuram</option>
              <option value="kovvur">Kovvur</option>
              <option value="Nidadavole">Nidadavole</option>
              <option value="polavaram">Polavaram</option>
            </optgroup>
          </select>
          <br/><br/>

          <p className="english ques mandatory">Please specify your age
            group.</p>
          <p className="telugu ques mandatory">దయచేసి మీ వయస్సును
            పేర్కొనండి.</p>
          <input type="radio" name="age" id="teens" value="teen" required/>
          <label htmlFor="teens">Teens (10 - 19)</label><br/>
          <input type="radio" name="age" id="young" value="youngster"/>
          <label htmlFor="young">Youngsters (20 - 29)</label><br/>
          <input type="radio" name="age" id="adults" value="adult"/>
          <label htmlFor="adults">Adults (30 - 54)</label><br/>
          <input type="radio" name="age" id="seniors" value="adult"/>
          <label htmlFor="seniors">Seniors (54+)</label><br/><br/>

          <p className="english mandatory-error">{errMsg}</p>
          <p className="telugu mandatory-error">{telErrMsg}</p>

          <button type="submit" id="voteBtn"
                  disabled={isLoading || doneVoting}>Complete Survey
          </button>
        </form>
        <p className="english success">{successMsg}</p>
        <p className="telugu success">{telSuccessMsg}</p>
        <Link id={doneVoting ? "continue-btn" : "hide"} to="/voting-result" >View Results</Link>
      </>
  );
};

export default ExtendedForm;
