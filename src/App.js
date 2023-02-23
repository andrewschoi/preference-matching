import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [ranking, setRanking] = useState([]);
  const [success, setSuccess] = useState(false);
  const [match, setMatch] = useState([]);
  const [submitter, setSubmitter] = useState("");
  const [engagements, setEngagements] = useState({});

  const handleRanking = (e) => {
    setRanking((prev) => [...prev, e.target.innerHTML]);
  };

  const handleSubmit = async () => {
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

    const pref = match.map((mtch) => ({
      name: m[mtch.name],
      preference: mtch.ranking.map((name) => m[name]),
    }));

    const stableMatching = (ranking) => {
      const half = 4;
    };

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
      <h1 className="title">Rank most compatible to least compatible...</h1>
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
          <li key={rank}>
            {rank + 1}. {user}
          </li>
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
          className="button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
        {success ? "your submission was received!" : ""}
      </div>

      {match.length !== 3
        ? "Still waiting for all responses..."
        : "Ready to pair!"}
      <button className="button" onClick={findpair}>
        Find Match
      </button>
      <ol className="ranking-list">
        {Object.entries(engagements).map(([key, val]) => (
          <li key={key}>
            {key}: {val}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
