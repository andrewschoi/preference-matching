import React, { useState, useRef, useEffect } from "react";
import { Audio } from "react-loader-spinner";
import "./App.css";
import axios from "axios";

function App() {
  const [ranking, setRanking] = useState([]);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState([]);
  const [submitter, setSubmitter] = useState("");
  const [engagements, setEngagements] = useState([]);

  // CHANGE HERE FOR PPL
  const NUM_PPL = 8;

  const m = {
    andrew: 0,
    enoch: 1,
    pratyush: 2,
    rohit: 3,
    harrison: 4,
    desmond: 5,
    stuti: 6,
    stephy: 7,
  };

  const inversem = {
    0: "andrew",
    1: "enoch",
    2: "pratyush",
    3: "rohit",
    4: "harrison",
    5: "desmond",
    6: "stuti",
    7: "stephy",
  };

  const handleRanking = (e) => {
    setRanking((prev) => [...prev, e.target.innerHTML]);
  };

  const handleSubmit = async () => {
    if (ranking.length !== NUM_PPL - 1) {
      alert("please select all ppl");

      return;
    }
    await axios
      .post(
        "https://92iuqgv2mi.execute-api.us-east-1.amazonaws.com/prod/worksesh",
        {
          submitter: submitter,
          ranking: ranking,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setSuccess(true);
        alert("thanks for participating");
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios
        .get(
          "https://92iuqgv2mi.execute-api.us-east-1.amazonaws.com/prod/worksesh"
        )
        .then((res) => JSON.parse(res.data));
      setMatch(res);
    };

    fetchData();
  }, []);

  const findpair = () => {
    const pref = match.map((mtch) => ({
      name: m[mtch.name],
      preference: mtch.ranking.map((name) => m[name]),
    }));

    let hospitals = Object.entries(pref)
      .slice(0, Math.floor(pref.length / 2))
      .map((h) => parseInt(h[0]));
    let residents = Object.entries(pref)
      .slice(Math.floor(pref.length / 2))
      .map((r) => parseInt(r[0]));

    const preferences = {};
    for (const key of Object.keys(pref)) {
      const name = pref[key].name;
      const preference = pref[key].preference;

      if (hospitals.includes(name)) {
        preferences[parseInt(name)] = preference.filter((p) =>
          residents.includes(p)
        );
      } else {
        preferences[parseInt(name)] = preference.filter((p) =>
          hospitals.includes(p)
        );
      }
    }

    let unmatched = [...hospitals];
    let pairings = new Map();
    while (unmatched.length > 0) {
      const hospital = unmatched.pop();

      for (const resident of preferences[hospital]) {
        if (pairings.has(resident)) {
          const currentHospital = pairings[resident];

          const currentRanking = preferences[currentHospital];
          const newRanking = preferences[hospital];

          if (newRanking < currentRanking) {
            pairings.set(resident, hospital);
            unmatched.unshift(currentHospital);
            break;
          }
        } else {
          pairings.set(resident, hospital);
          break;
        }
      }
    }
    console.log(pairings);
    let engagements = [];
    for (let [key, value] of pairings) {
      engagements.push([inversem[key], inversem[value]]);
    }

    setEngagements(engagements);
  };

  const handleInputChange = (e) => {
    setSubmitter(e.target.value);
    if (e.target.value.toLowerCase() === "andrew") {
      andrewRef.current.disabled = true;
    } else if (e.target.value.toLowerCase() === "enoch") {
      enochRef.current.disabled = true;
    } else if (e.target.value.toLowerCase() === "pratyush") {
      pratyushRef.current.disabled = true;
    } else if (e.target.value.toLowerCase() === "rohit") {
      rohitRef.current.disabled = true;
    } else if (e.target.value.toLowerCase() === "harrison") {
      harrisonRef.current.disabled = true;
    } else if (e.target.value.toLowerCase() === "desmond") {
      desmondRef.current.disabled = true;
    } else if (e.target.value.toLowerCase() === "stuti") {
      stutiRef.current.disabled = true;
    } else if (e.target.value.toLowerCase() === "stephy") {
      stephyRef.current.disabled = true;
    } else {
      andrewRef.current.disabled = false;
      enochRef.current.disabled = false;
      pratyushRef.current.disabled = false;
      rohitRef.current.disabled = false;
      harrisonRef.current.disabled = false;
      desmondRef.current.disabled = false;
      stutiRef.current.disabled = false;
      stephyRef.current.disabled = false;
    }
  };
  const andrewRef = useRef();
  const enochRef = useRef();
  const pratyushRef = useRef();
  const rohitRef = useRef();
  const harrisonRef = useRef();
  const desmondRef = useRef();
  const stutiRef = useRef();
  const stephyRef = useRef();

  return (
    <div className="App">
      <h1 className="title">Rank least compatible to most compatible...</h1>
      <p className="subtitle">
        Be careful... you have to start over (refresh) if you make a mistake
      </p>

      <input
        className="input"
        type="text"
        placeholder="Enter your name (as shown below)"
        onChange={(e) => handleInputChange(e)}
      />

      <ol className="ranking-list">
        {ranking.map((user, rank) => (
          <li key={rank}>{user}</li>
        ))}
      </ol>

      <div className="button-container">
        <button
          className="button"
          ref={andrewRef}
          onClick={(e) => {
            handleRanking(e);
            andrewRef.current.disabled = true;
          }}
        >
          Andrew
        </button>
        <button
          className="button"
          ref={enochRef}
          onClick={(e) => {
            handleRanking(e);
            enochRef.current.disabled = true;
          }}
        >
          Enoch
        </button>
        <button
          className="button"
          ref={pratyushRef}
          onClick={(e) => {
            handleRanking(e);
            pratyushRef.current.disabled = true;
          }}
        >
          Pratyush
        </button>
        <button
          className="button"
          ref={rohitRef}
          onClick={(e) => {
            handleRanking(e);
            rohitRef.current.disabled = true;
          }}
        >
          Rohit
        </button>
        <button
          className="button"
          ref={harrisonRef}
          onClick={(e) => {
            handleRanking(e);
            harrisonRef.current.disabled = true;
          }}
        >
          Harrison
        </button>
        <button
          className="button"
          ref={desmondRef}
          onClick={(e) => {
            handleRanking(e);
            desmondRef.current.disabled = true;
          }}
        >
          Desmond
        </button>
        <button
          className="button"
          ref={stutiRef}
          onClick={(e) => {
            handleRanking(e);
            stutiRef.current.disabled = true;
          }}
        >
          Stuti
        </button>
        <button
          className="button"
          ref={stephyRef}
          onClick={(e) => {
            handleRanking(e);
            stephyRef.current.disabled = true;
          }}
        >
          Stephy
        </button>
      </div>

      <div className="button-container">
        <button
          className="button submit-button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
        <p className="success-message">
          {success ? "your submission was received!" : ""}
        </p>
      </div>

      <div className="match-container">
        <div>
          <p>
            {match.length !== NUM_PPL ? (
              <div>
                <Audio
                  height="80"
                  width="80"
                  radius="9"
                  color="green"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
            ) : (
              <img
                src={
                  "https://i.pinimg.com/550x/2b/11/5a/2b115adb901249d9fd7957de21397905.jpg"
                }
                height="90px"
                width="90px"
              />
            )}
          </p>
          <button className="button find-match-button" onClick={findpair}>
            Find Match
          </button>
          <p>
            {match.length !== NUM_PPL
              ? "Still waiting for some responses..."
              : "Ready to match"}
          </p>
        </div>

        <ol className="ranking-list">
          {engagements.map((pair) => {
            const p1 = pair[0];
            const p2 = pair[1];

            return (
              <li key={p1}>
                ({p1}, {p2})
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export default App;
