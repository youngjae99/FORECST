import React from 'react';
import { List, Card } from 'antd';
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
              <ul class="thumblist">
                <li>
                <img src={item.data().photo}
                style={{width: "100%", height: 250, margin: "auto", padding: 20}}></img>
                </li>
              </ul>
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