import React from "react";
import Layout from "./Layout";

class Success extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <div className="thanks">
          <div className="thanks__title-container">
            <h1 className="thanks__title">Thanks, USERNAME</h1>
            <p className="thanks__subtitle">Look out for a reply from us.</p>
          </div>

          <div className="thanks__button-group">
            <a className="btn btn-secontary-outline" href="https://nike.com">Go to Nike.com</a>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Success;
