import React from "react";
import { All } from "../screens";

class Tagged extends All {
  async fetchFeedbacks() {
    const feedbacks = await this.messagesRef
      .orderByChild("tagged")
      .equalTo(true)
      .once("value")
      .then(snap => {
        this.feedbacksLength = snap.numChildren();
        this.pageCount = this.feedbacksLength / this.pageSize;
        return snap.val();
      });
    this.setState({ messages: {} });
    if (!feedbacks) return;
    this.transformFeedbacks(feedbacks);
    this.attachTagsToFeedback();
  }
}

export default Tagged;
