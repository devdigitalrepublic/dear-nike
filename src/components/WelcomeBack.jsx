import React from "react";
import Layout from "./Layout";

class WelcomeBack extends React.Component {
  async onDelete() {
    await this.props.firebaseRef.doc(this.props.feedback.id).delete();
    if (typeof this.props.onDelete == "function") this.props.onDelete();
  }

  onNew() {
    if (typeof this.props.onNew == "function") this.props.onNew();
  }

  render() {
    return (
      <Layout>
        <div className="welcome-back">
          <div className="welcome-back__title-container">
            <h1 className="welcome-back__title">Welcome back Johnny,</h1>
          </div>
          <div className="welcome-back__button-group">
            <button
              className="btn btn-outline-secondary"
              onClick={e => this.onDelete()}
            >
              Delete previous feedback
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.onNew()}
            >
              Send new feedback
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default WelcomeBack;
