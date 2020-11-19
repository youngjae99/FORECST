import React, {Component} from 'react';
import {Header, Menu} from '../components';
import Feed from '../components/feed';
import WGO from '../components/whatsgoingon';
import { db,storage } from "../firebase";
import {Link} from 'react-router-dom';
import Post from './post';

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
        <div className="CampHome">
          <Menu></Menu>
          <div className="container">
            <div className="row"> 
              <Feed feed={this.state.feed} />
              <WGO news={this.state.whatsgoingon} />
            </div>
          </div>  
          <Post id={this.state.id}/>

        </div>

      );
    }
  }
  
  export default CampHome;