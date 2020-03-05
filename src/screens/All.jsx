import React from "react";
import { Layout, Filter, SideMenu } from "../components";
import { Button, Card, Badge, CardGroup } from "react-bootstrap";
import firebase from "../Firebase";
import Collection from "../constants/collections";
import filtersData from "../data/filters.json";
import {
  mutateFeedbackTags,
  transformFeedbackRef,
  keysToArray,
  objectsToArray
} from "../helpers";

class All extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {},
      currentPage: 1,
      openSideMenu: false
    };
    this.filters = filtersData;
    this.pageSize = 20;
    this.pageCount = 0;
    this.feedbacksLength = 0;
    this.lastFeedbackKey = null;
    this.rootRef = firebase.database().ref();
    this.messagesRef = this.rootRef.child(Collection.FEEDBACKS);
    this.feedbackTagsRef = this.rootRef.child(Collection.FEEDBACK_TAGS);
    this.onFilter = this.onFilter.bind(this);
    this.onTagsUpdate = this.onTagsUpdate.bind(this);
  }

  componentDidMount() {
    this.fetchFeedbacks();
  }

  attachTagsToFeedback() {
    this.feedbackTagsRef.on("child_added", feedbackTags => {
      const { messages } = this.state;
      this.updateTags(feedbackTags, messages);
    });
  }

  updateTags(feedbackTags, messages) {
    const message = messages[feedbackTags.key];
    if (!message) return;
    feedbackTags.forEach(t => {
      let feedbackTag = message.tags[t.key];
      if (!feedbackTag) return;
      feedbackTag = feedbackTag.concat(keysToArray(t.val()));
      message.tags[t.key] = feedbackTag;
    });
    messages[feedbackTags.key] = message;

    this.setState({ messages });
  }

  transformFeedbacks(_feedbacks) {
    const { messages } = this.state;
    for (const key in _feedbacks) {
      if (_feedbacks.hasOwnProperty(key)) {
        const feedback = _feedbacks[key];
        messages[key] = transformFeedbackRef(key, feedback);
      }
    }
    this.setState({ messages });
  }

  async fetchFeedbacks() {
    const feedbacks = await this.messagesRef.once("value").then(snap => {
      this.feedbacksLength = snap.numChildren();
      this.pageCount = this.feedbacksLength / this.pageSize;
      return snap.val();
    });
    this.setState({ messages: {} });
    if (!feedbacks) return;
    this.transformFeedbacks(feedbacks);
    this.attachTagsToFeedback();
  }

  async fetchMoreFeedbacks() {
    const { currentPage } = this.state;
    this.setState({ currentPage: currentPage + 1 });
  }

  onFilter(feedbacks, filters) {
    const listSize = keysToArray(feedbacks).length;
    if (!listSize) return this.fetchFeedbacks();
    this.pageCount = listSize / this.pageSize;
    this.setState({ messages: feedbacks });
  }

  renderCardList() {
    return objectsToArray(this.state.messages)
      .sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
      .slice(0, this.state.currentPage * this.pageSize)
      .map(message => {
        return this.renderCard(message);
      });
  }

  renderFeedbackTags(message) {
    const tagsList = mutateFeedbackTags(message.tags, this.filters);
    return tagsList.map(t => (
      <span key={"label-" + t.id}>
        <Badge
          pill
          variant="primary"
          style={{ cursor: "pointer" }}
          onClick={e => this.removeFeedbackTag(message, t.type, t.id)}
        >
          {t.name}
        </Badge>{" "}
      </span>
    ));
  }

  openSideMenu(feedback) {
    const { openSideMenu } = this.state;
    this.setState({ feedbackToEdit: feedback, openSideMenu: !openSideMenu });
  }

  onTagsUpdate(tags) {
    console.log(tags);
    const { messages, feedbackToEdit } = this.state;
    messages[feedbackToEdit.key].tags = tags;
    this.setState({ messages })
  }

  renderCard(feedback) {
    return (
      <Card style={{ width: "20rem" }} key={feedback.key}>
        <Card.Body>
          <Card.Title>{feedback.key}</Card.Title>
          <Card.Text>
            Submitted on {new Date(feedback.createdAt).toUTCString()}
          </Card.Text>
          <Card.Text>{feedback.text}</Card.Text>
          <div>{this.renderFeedbackTags(feedback)}</div>
          <Button className="mt-5" onClick={e => this.openSideMenu(feedback)}>Edit tags</Button>
        </Card.Body>
      </Card>
    );
  }

  render() {
    return (
      <Layout>
        <div className="thanks">
          <Filter
            onSelect={this.onFilter}
            feedbackTagsRef={this.feedbackTagsRef}
            feedbacksRef={this.messagesRef}
          />
          <CardGroup>{this.renderCardList()}</CardGroup>
          <SideMenu
            isOpen={this.state.openSideMenu}
            feedback={this.state.feedbackToEdit}
            feedbackTagsRef={this.feedbackTagsRef}
            feedbackRef={this.messagesRef}
            onUpdate={this.onTagsUpdate}
          />
          {this.state.currentPage < this.pageCount ? (
            <div className="p-5">
              <Button block onClick={e => this.fetchMoreFeedbacks()}>
                Load More
              </Button>
            </div>
          ) : null}
        </div>
      </Layout>
    );
  }
}

export default All;
