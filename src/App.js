import React from "react";
import Feedback from "./components/Feedback";
import firebase from "./Firebase";
import { generateMessageId } from "./helpers";
import { AskContactPermission, Success, WelcomeBack } from "./components";

class App extends React.Component {
  unsubscribe = null;
  lastMessageId = 0;
  code = null;
  ref = null;
  state = {
    messageSent: false,
    permissionSent: false,
    userLastFeedback: null
  };
  userId = 1;

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("messages");
    this.onNewFeedback = this.onNewFeedback.bind(this);
    this.onSubmitPermission = this.onSubmitPermission.bind(this);
    this.onNewFeedback = this.onNewFeedback.bind(this);
    this.onDeleteFeedback = this.onDeleteFeedback.bind(this)
  }

  async componentDidMount() {
    //this.userId = Math.floor(Math.random() * 10 + 1);
    console.log(this.userId);
    const userLastFeedback = await this.getLastMessage(this.userId);
    console.log(userLastFeedback);
    this.setState({
      userLastFeedback
    });
  }

  getLastMessage(userId = null) {
    return new Promise((resolve, reject) => {
      try {
        let query = this.ref.orderBy("timestamp", "desc").limit(1);
        if (userId) query = query.where("user_id", "==", userId);
        this.unsubscribe = query.onSnapshot(resp => {
          const [lastMessage] = resp.docs;
          resolve(lastMessage);
        });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  onSubmitFeedback = async text => {
    try {
      var timestamp = firebase.firestore.Timestamp.fromDate(new Date());
      const lastMessage = await this.getLastMessage();
      this.code = generateMessageId(lastMessage ? lastMessage.id : 0);
      this.message = {
        text,
        user_id: this.userId,
        user_type: "facebook",
        user_name: "Test",
        timestamp
      };
      await this.ref.doc(this.code).set(this.message);
      this.setState({ messageSent: true });
    } catch (err) {
      alert("We were unable to record your feedback. Try again later.");
    }
  };

  onSubmitPermission() {
    this.setState({
      permissionSent: true
    });
  }

  onNewFeedback() {
    this.setState({
      userLastFeedback: false
    });
  }

  onDeleteFeedback() {
    this.setState({
      userLastFeedback: false
    });
  }

  render() {
    const { messageSent, permissionSent, userLastFeedback } = this.state;
    return (
      <>
        {userLastFeedback ? (
          <WelcomeBack
            firebaseRef={this.ref}
            feedback={userLastFeedback}
            onNew={this.onNewFeedback.bind(this)}
            onDelete={this.onDeleteFeedback.bind(this)}
          />
        ) : !messageSent ? (
          <Feedback onSubmit={this.onSubmitFeedback} />
        ) : !permissionSent ? (
          <AskContactPermission
            messageRef={this.code}
            firebaseRef={this.ref}
            message={this.message}
            onSubmit={this.onSubmitPermission}
          />
        ) : (
          <Success />
        )}
      </>
    );
  }
}

export default App;
