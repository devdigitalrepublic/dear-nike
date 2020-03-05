import React from "react";
import { Layout } from "../components";
import { All } from "../screens";
import { Button, CardColumns } from "react-bootstrap";

class Untagged extends All {
  async fetchFeedbacks() {
    const feedbacks = await this.messagesRef
      .orderByChild("tagged")
      .equalTo(false)
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

  render() {
    return (
      <Layout>
        <div className="thanks">
          <CardColumns>{this.renderCardList()}</CardColumns>
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

export default Untagged;
