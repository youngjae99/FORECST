import React from 'react';
import { List, Card } from 'antd';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

class MyFeed extends React.Component{
    render(){
        return(
            <List
            grid={{
            column: 3,
            gutter: 16,
            }}
            dataSource={data}
            renderItem={item => (
            <List.Item>
                <Card>
                  <img style={{width: "100%", height: "100%"}}></img>
                  {item.title}
                  </Card>
            </List.Item>
            )}
        />
        )
    }
}

export default MyFeed;