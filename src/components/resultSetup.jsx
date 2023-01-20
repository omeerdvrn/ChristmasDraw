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
    try {
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
    } catch (error) {
      return <p>Error: {error}</p>;
    }
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
        <React.Fragment>
          <p className="alert alert-info">Type your name to get your pair!</p>
          <div className="input-group">
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <button className="btn btn-success" onClick={findDataByName}>
              Get my pair!
            </button>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <h2 className="alert alert-success">
          {name}, you are paired to {pair}!
        </h2>
      );
    }
  };

  return <React.Fragment>{form()}</React.Fragment>;
}

export default ResultSetup;
