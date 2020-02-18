import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../index.scss";

class Layout extends React.Component {
  render() {
    return (
      <div className="messenger">
        <header className="messenger__header">
          <div className="messenger__flex-wrapper">
            <img src={logo} className="messenger__logo" alt="Nike Logo" />

            <Link
              title="Close"
              to="#"
              className="messenger__close-button"
            >Close</Link>
          </div>
        </header>
        <div className="messenger__content">{this.props.children}</div>
        {/* <div className="messenger__footer">
          <p>{new Date().getFullYear()}</p>
        </div> */}
      </div>
    );
  }
}

export default Layout;