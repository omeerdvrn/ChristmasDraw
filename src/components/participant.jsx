import React, { Component } from "react";
class Participant extends Component {
  state = {
    id: this.props.id,
    name: "",
    pair: "",
    drawID: this.props.drawID,
  };
  handleName = (e) => {
    this.setState({
      name: e.target.value,
    });
    this.props.updateParticipantName(this.state.id, e.target.value);
  };

  render() {
    return (
      <div>
        <label>Name:</label>
        <input
          key={this.state.id}
          type={"text"}
          onChange={(e) => {
            this.handleName(e);
            this.props.updateParticipantName(this.state.id, e.target.value);
          }}
        ></input>
      </div>
    );
  }
}

export default Participant;
