import React, {Component} from 'react';
import {Header, Menu} from '../components';
import Feed from '../components/feed';
import { db,storage } from "../firebase";
import {Link} from 'react-router-dom';

class CampHome extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id : "default",
        feed: [],
        whatsgoingon: {
          type: 'everything',
          query: 'domains=techcrunch.com&language=en'
        }
      }
    }

    componentDidMount(){
      this.getMarker();
    }

    getMarker = async () => {
      const snapshot = await db.collection('Feeds').get()
      console.log(snapshot.docs)
      this.setState({feed:snapshot.docs})  
      }

    render() {
      return (
        <div className="CampHome" >
          <div className="container">
            <div className="row"> 
              <Feed feed={this.state.feed}/>
            </div>
          </div>  
        </div>

      );
    }
  }
  
  export default CampHome;