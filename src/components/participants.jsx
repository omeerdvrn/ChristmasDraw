import React, { Component } from "react";
import Participant from "./participant";
class Participants extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="list-group">
          {this.props.participants.map((p) => {
            return (
              <li key={p.id} className="list-group-item">
                <Participant
                  id={p.id}
                  updateParticipantName={this.props.updateParticipantName}
                  drawID={this.props.drawID}
                ></Participant>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default Participants;
