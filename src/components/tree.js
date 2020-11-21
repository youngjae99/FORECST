import React, { Component } from "react";
import { List, Button, Avatar, Space, Badge } from "antd";
// import { GiWateringCan } from 'react-icons/gi';
// import { BsBookmark } from 'react-icons/bs';
import FeedComment from "./feed  comment";

class Tree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
    };
  }
  render() {
    return (
      <div>
        <Badge dot>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
          />
        </Badge>
      </div>
    );
  }
}

export default Tree;
