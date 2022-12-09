import React, { useState } from "react";
import Participants from "./participants";
import uuid from "react-uuid";
import { generatePath } from "react-router-dom";

function DrawSetup() {
  const [lastID, setLastID] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [uuidCreated, setUuidCreated] = useState(false);
  const [customUuid, setCustomUuid] = useState("");

  if (!uuidCreated) {
    setCustomUuid(uuid());
    setUuidCreated(true);
  }

  const addParticipant = () => {
    let list = [...participants];
    console.log(list);
    list.push({ id: lastID, name: "", pair: "", drawID: customUuid });
    setParticipants(list);
    setLastID(lastID + 1);
    //fetch post request
  };

  const updateParticipantName = (id, name) => {
    let list = [...participants];
    //console.log(list);
    let newList = list.find((p) => p.id === id);
    console.log(list);
    newList.name = name;
    setParticipants(list);
  };

  const randomPair = () => {
    let s = [];
    participants.forEach((p) => {
      var r = participants.find(
        (f) => f.id !== p.id && !s.includes(f) && f.pair !== p.name
      );
      console.log(r);
      if (r === null) return;
      p.pair = r.name;
      s.push(r);
    });
  };

  const post = () => {
    console.log("gonderildi");
    return participants?.forEach((p) => {
      fetch("http://localhost/christmas_draw/api/participant/create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
    });
  };

  return (
    <React.Fragment>
      <div className="input-group">
        <Participants
          participants={participants}
          updateParticipantName={(id, name) => updateParticipantName(id, name)}
          drawID={customUuid}
        ></Participants>
        <button className="btn btn-primary" onClick={addParticipant}>
          Add Participant
        </button>
        <br />
      </div>
      <button
        className="btn btn-success"
        onClick={() => {
          randomPair();
          new Promise((resolve) => setTimeout(resolve, 1000));
          post();
          new Promise((resolve) => setTimeout(resolve, 1000));
          window.location.href = generatePath(":drawID", {
            drawID: customUuid,
          });
        }}
      >
        Generate!
      </button>
    </React.Fragment>
  );
}

export default DrawSetup;
