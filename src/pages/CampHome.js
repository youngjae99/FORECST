import React, {Component} from 'react';
import {Header, Menu} from '../components';
import Feed from '../components/feed';
import WGO from '../components/whatsgoingon';


class CampHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        feed: {
          type: 'top-headlines',
          query: 'sources=techcrunch'
        },
        whatsgoingon: {
          type: 'everything',
          query: 'domains=techcrunch.com&language=en'
        }
      }
    }
    
    
    render() {
      
      return (
        <div className="CampHome">
          <Menu></Menu>
          <div className="container">
            <div className="row"> 
              <Feed feed={this.state.feed} />
              <WGO news={this.state.whatsgoingon} />
            </div>
          </div>  
        </div>
      );
    }
  }
  
  export default CampHome;