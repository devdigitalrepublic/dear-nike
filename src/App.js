import React from "react";
import Feedback from "./screens/Feedback";
import firebase from "./Firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
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
    this.onNewFeedback = this.onNewFeedback.bind(this);
    this.onSubmitPermission = this.onSubmitPermission.bind(this);
    this.onNewFeedback = this.onNewFeedback.bind(this);
    this.onDeleteFeedback = this.onDeleteFeedback.bind(this);
  }

  async componentDidMount() {
    //this.userId = Math.floor(Math.random() * 10 + 1);
    // console.log(this.userId);
    // const userLastFeedback = await this.getLastMessage(this.userId);
    // console.log(userLastFeedback);
    // this.setState({
    //   userLastFeedback
    // });
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
      //const lastMessage = await this.getLastMessage();
      this.ref = firebase
        .database()
        .ref("/user-data")
        .push();
      this.message = {
        message: text,
        upmID: uuidv4(),
        createdAt: new Date().toJSON(),
        id: this.ref.key,
        tagged: false
      };
      await this.ref.set(this.message);
      this.setState({ messageSent: true });
    } catch (err) {
      console.log(err);
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
    return <Feedback onSubmit={this.onSubmitFeedback} />;
  }
}

export default App;
