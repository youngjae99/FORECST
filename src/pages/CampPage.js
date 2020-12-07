import React from "react";
import { PageCamp } from "../components/index";

class CampPage extends React.Component {
  render() {

    return (
      <PageCamp
      tab={this.props.location.pathname.split("/")[2]}></PageCamp>
    );
  }
}

export default CampPage;
