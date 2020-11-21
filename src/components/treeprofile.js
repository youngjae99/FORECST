import React, { Component } from "react";
import { List, Button, Avatar, Space, Badge } from "antd";
// import { GiWateringCan } from 'react-icons/gi';
// import { BsBookmark } from 'react-icons/bs';
import FeedComment from "./feed  comment";

const TreeProfile = ({ photo, lv, active }) => {
  return (
    <div>
      <Badge dot>
        <Avatar
          // src=" "
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
        />
      </Badge>
    </div>
  );
};

export default TreeProfile;
