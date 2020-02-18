import React from "react";
import Layout from "./Layout";

class AskContactPermission extends React.Component {
  constructor(props) {
    super(props);
  }

  async updateMessage(contactAllowed) {
    try {
      await this.props.firebaseRef.doc(this.props.messageRef).set({
        ...this.props.message,
        contactAllowed
      });
      if (typeof this.props.onSubmit == "function") this.props.onSubmit(contactAllowed);
    } catch (err) {
      alert("We were unable to register your permission. Try again later.");
    }
  }

  render() {
    return (
      <Layout>
        <div className="ask-contact">
          <div className="ask-contact__title-container">
            <h1 className="ask-contact__title">We've received your note</h1>
            <p className="ask-contact__subtitle">
              Would you agree to Nike contacting you in ipsum to this
              communications?
            </p>
          </div>

          <div className="ask-contact__button-group">
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.updateMessage(false)}
            >
              No, I'm good
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => this.updateMessage(true)}
            >
              Yes, please
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default AskContactPermission;
