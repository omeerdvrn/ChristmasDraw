import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function ResultSetup() {
  const { drawID } = useParams();
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [pair, setPair] = useState("");
  useEffect(() => {
    setLoading(true);

    fetch(
      "http://localhost/christmas_draw/api/participant/read_by_drawID.php?drawID=" +
        drawID,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <p>fetching...</p>;
  }

  const findDataByName = () => {
    if (data.data.length === 0) return;
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].name === name) {
        setData(data.data[i]);
        setDataReady(true);
        console.log(data.data[i]);
        setPair(data.data[i].pair); //this will be the pair
      }
    }
  };

  const form = () => {
    if (!dataReady) {
      return (
        <div>
          <input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <button onClick={findDataByName}>Get my pair!</button>
        </div>
      );
    } else {
      return <h2>You select {pair}!</h2>;
    }
  };

  return (
    <React.Fragment>
      <h1>Result</h1>
      {form()}
    </React.Fragment>
  );
}

export default ResultSetup;
