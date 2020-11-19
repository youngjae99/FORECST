import React from "react";
import { Header, Menu } from "../components";
import CampHome from "./CampHome";
import CampQnA from "./CampQnA";
import CampRank from "./CampRank";

const CampTabView = ({ tabnum }) => {
  if (tabnum == 1) {
    console.log(tabnum);
    return (
      <>
        <CampHome></CampHome>
      </>
    );
  } else if (tabnum == 2) {
    console.log(tabnum);
    return <CampQnA></CampQnA>;
  } else {
    console.log(tabnum);
    return <CampRank></CampRank>;
  }
};

export default CampTabView;
