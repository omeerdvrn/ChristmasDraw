import { useState } from "react";
import Participants from "./participants";
function DrawSetup() {
  const [lastID, setLastID] = useState(0);
  const [participants, setParticipants] = useState([]);

  const addParticipant = () => {
    let list = [...participants];
    console.log(list);
    list.push({ id: lastID, name: "" });
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

  return (
    <div className="container">
      <Participants
        participants={participants}
        updateParticipantName={(id, name) => updateParticipantName(id, name)}
      ></Participants>
      <button onClick={addParticipant}>Add Participant</button>
      <br />
      <button className="btn btn-success">Generate!</button>
    </div>
  );
}

export default DrawSetup;
