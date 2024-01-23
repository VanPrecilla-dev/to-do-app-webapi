import React, { Component } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import classes from "./OnTopBtnUI.module.css";

export class OnTopBtn extends Component {
  scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Add smooth scrolling behavior
    });
  };

  render() {
    return (
      <button className={classes.btnUI} onClick={this.scrollToTop}>
        <FaArrowCircleUp className={classes.icon} />
      </button>
    );
  }
}

export default OnTopBtn;
