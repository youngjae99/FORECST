import React from 'react';
import { List, Card, Avatar } from 'antd';
import '../ImageCrop.css'

class MyFeed extends React.Component{
  constructor(props){
    super(props);

    this.state={
      feed: []
    };
  }

  render(){
      return(
          <List
          grid={{
          column: 3,
          gutter: 16,
          }}
          dataSource={this.props.feed}
          renderItem={item => (
          <List.Item>
            <Card>
                <Avatar 
                shape="square" 
                icon={<img src={item.data().photo}></img>}
                style={{width: "100%", height: 250}}
                ></Avatar>
            </Card>

              <div style={{fontWeight: "bold", marginTop: 10}}>
                {item.data().title} 
              </div>

              <div>
                {item.data().writing}
              </div>
          </List.Item>
          )}
      />
      )
    }
}

export default MyFeed;