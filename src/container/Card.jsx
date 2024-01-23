import React, { Component } from "react";

//main container of all components and responsive based on screen and use bootstrap container here.
export class Card extends Component {
  render() {
    return (
      <div className="container-sm p-5 my-5 border">{this.props.children}</div>
    );
  }
}

export default Card;
