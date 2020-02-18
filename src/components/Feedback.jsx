import React from "react";
import Layout from "./Layout";

class Feedback extends React.Component {
  maxLength = 346;
  state = {
    rows: 1,
    messageLength: 0,
    fontSize: 60,
    text: ""
  };

  componentDidMount() {
    var textArea = document.getElementById("textArea");
    var hiddenTextArea = document.getElementById("hiddenTextArea");
    hiddenTextArea.focus();
    textArea.addEventListener(
      "click",
      function() {
        hiddenTextArea.focus();
      },
      false
    );
  }

  updateTextareaRows(text) {
    const textArea = document.getElementById("textArea");
    textArea.scrollTop = textArea.scrollHeight;
    let fontSize,
      rows = 1;
    let messageLength = text.length;
    if (messageLength <= 35) {
      fontSize = 60;
    } else if (messageLength > 35 && messageLength <= 120) {
      fontSize = 40;
    } else if (messageLength > 120 && messageLength < 230) {
      fontSize = 27;
    } else {
      fontSize = 22;
    }
    this.setState({
      text,
      messageLength: text.length,
      fontSize,
      rows
    });
  }

  onSubmitFeedback(e) {
    e.preventDefault();
    if (!this.state.text.length) return;
    if (typeof this.props.onSubmit === "function")
      this.props.onSubmit(this.state.text);
  }

  render() {
    return (
      <Layout>
        <div className="feedback__title-container">
          <h1 className="feedback__title">Hey USER_NAME, how can Nike help?</h1>
          <p className="feedback__subtitle">lorem ipsum lorem ipsum lorem</p>
        </div>
        <form
          className="feedback__form"
          onSubmit={this.onSubmitFeedback.bind(this)}
        >
          <div className="feedback__input-control feedback__input-control--message">
            <div id="textArea" className="feedback__text-wrapper">
              <span
                id="textHolder"
                className="feedback__text-holder"
                style={{ fontSize: `${this.state.fontSize}px` }}
              >
                {this.state.text}
              </span>
            </div>
            <textarea
              id="hiddenTextArea"
              rows={this.state.rows}
              className="feedback__textarea sr-only"
              autoFocus
              onChange={e => this.updateTextareaRows(e.target.value)}
              maxLength="500"
            ></textarea>
          </div>
          <div className="feedback__bg-black-block">
            <p className="feedback__caracteres-counter">
              {500 - this.state.messageLength} characteres remaining
            </p>
            <div className="feedback__input-control feedback__input-control--submit-button">
              <button type="submit" className="btn btn-outline-primary" disabled={this.state.text.length == 0}>
                Send to Nike
              </button>
            </div>
          </div>
        </form>
      </Layout>
    );
  }
}

export default Feedback;
