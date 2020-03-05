import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../index.scss";
import { Button, ButtonGroup } from "react-bootstrap";

class Layout extends React.Component {
  render() {
    return (
      <div className="messenger">
        <header className="messenger__header">
          <div className="messenger__flex-wrapper">
            <img src={logo} className="messenger__logo" alt="Nike Logo" />

            <ButtonGroup
              aria-label="Basic example"
            >
              <Link to="/tagged" className="btn btn-secondary">
                Tagged
              </Link>
              <Link to="/untagged" className="btn btn-secondary">
                Untagged
              </Link>
              <Link to="/" className="btn btn-secondary">
                All
              </Link>
            </ButtonGroup>

            <Link title="Close" to="#" className="messenger__close-button">
              Close
            </Link>
          </div>
        </header>
        <div className="messenger__content">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
