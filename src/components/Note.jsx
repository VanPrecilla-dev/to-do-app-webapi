import React, { Component } from "react";

export class Note extends Component {
  componentDidMount() {
    // Initialize Bootstrap Popover after component mounts
    this.initPopover();
  }

  initPopover() {
    // Find the button within the component and initialize Popover
    const popoverButton = this.container.querySelector(
      '[data-bs-toggle="popover"]'
    );
    new window.bootstrap.Popover(popoverButton);
  }

  render() {
    return (
      <div
        ref={(container) => {
          this.container = container;
        }}
      >
        {/* Button to toggle popover */}
        <button
          type="button"
          className="btn btn-outline-success mx-1"
          data-bs-toggle="popover"
          title="To-DO-App Set-up"
          data-bs-content="This To-Do-App is made of ReactJs using class-based components. 
          This app uses https://jsonplaceholder.typicode.com/todos, so I work around the codes to show it on the screen to demonstrate 
          full CRUD operations since this is JSON placeholder only. But to make sure the use of Web APIs, 
          check Inspect > Network tab and click the specific button. For styling, I use mainly Bootstrap and CSS.

          Since this app uses the json placholder, all the changes will be gone once reload the web page and back to square once 
          since I cannot modify directtly the json placeholder Please NOTE.
            
          Thank you and Please check my code - Van"
        >
          Note. Pls. Read
        </button>

        <button
          className="btn btn-outline-warning"
          onClick={() =>
            window.open(
              "https://github.com/VanPrecilla-dev/to-do-app-webapi.git"
            )
          }
        >
          {" "}
          Github Codes of this To-Do-App
        </button>
      </div>
    );
  }
}

export default Note;
