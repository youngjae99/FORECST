import React from "react";
// import CampHome from "./CampHome";
import CampPage from "./CampPage";
import CampQnA from "./CampQnA";
import CampRank from "./CampRank";

const CampTabView = ({ tabnum }) => {
  if (tabnum == 1) {
    console.log(tabnum);
    return (
      <>
        {/* <CampHome></CampHome> */}
        <CampPage></CampPage>
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
