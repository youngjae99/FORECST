
import React, { useState } from 'react';

import { db,storage } from "../firebase";
import header from "./header";
import {Link} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import { render } from '@testing-library/react';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
// function handleClick (id){
//     db.collection('users')
//       .doc(id)
//       .get()
//       .then(doc => {
//         if (!doc.data()) {
//           db.collection('users')
//             .doc(id)
//             .set({
//               currentUser : id,
//               isLoggedIn : true,
//               Tree : 0
//             });
//           alert(`${id}님 환영합니다.`);
//           return(id);
//         } else { 
//           db.doc(`/users/${id}`)
//             .get()
//             .set({isLoggedIn : true})

//         }})
//   };
//   function handleChange(e){
//     this.setState(e.target.value);
//     setString(e.target.value);
//   };



  const [id, setString] = useState();
  const handleClick = () => {
    db.collection('users')
      .doc(id)
      .get()
      .then(doc => {
        if (!doc.data()) {
          db.collection('users')
            .doc(id)
            .set({
              currentUser : id,
              isLoggedIn : true
            });
          alert(`${id}님 환영합니다.`);
          return(<div><header isLoggedIn = {1} currentUser = {id} /></div>);
        } else { //등록된 유저일 경우
          db.doc(`/users/${id}`)
            .get()
            .then(doc => {
              const currentConsAmount = doc.data().cons_amount;
              db.doc(`/users/${id}`).update({
                cons_amount: currentConsAmount + 1
              });
            });
          alert(`현재 con 갯수 : ${doc.data().cons_amount}`);
        }})
  };
  function addTestFile() {
    const storageRef = storage.ref();
    const fileRef = storageRef.child('test.txt');
    return fileRef
      .putString('Some File Contents')
      .then((snap) => console.log('upload successful', snap))
      .catch((err) => console.error('error uploading file', err))
  }

  const handleChange = e => {
    setString(e.target.value);
  };
  const handleImage = e => {
    console.log(e.target.files[0])

      setFile(e.target.files[0]); 
  }
  const [file, setFile] = useState(0);

  const handlePost = () =>{
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    // return fileRef
    //   .putString('Some File Contents')
    //   .then((snap) => console.log('upload successful', snap))
    //   .catch((err) => console.error('error uploading file', err))
    fileRef.put(file).then(function(snapshot) { 
      console.log(file.path);
      console.log(snapshot);   
      const filepath ="gs://"+fileRef._delegate._location.bucket+'/'+file.name;

        console.log(filepath);
        db.collection('Feeds').doc().set({photo:filepath});
        console.log('Uploaded a blob or file!');
      });

    }
      // const filepath =fileRef._delegate._location.bucket+'/'+file.name;
      // storageRef.child(file.name).getDownloadURL(filepath).then(function(url) {
      //   console.log(url);
      // }).catch(function(error) {
      //   // Handle any errors
      // });
    const handleDownload = () => {

      db.collection('Feeds').get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          console.log(doc.data());
          var gsReference = storage.refFromURL(doc.data().photo)

          gsReference.getDownloadURL().then(function(url) {
            console.log(url);
            setState
            return(url)
          }).catch(function(error) {
            console.log("error!!");
          });
        })
      })
    }
    const handleDownloadComments= (Doc_id) =>{
      db.collection('Feeds').doc(Doc_id).collection("Comments").get()

    }
    const handleDownloadUser = (UserId) => {
      var lists = [];
      db.collection('Feeds').get(UserId).then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log(doc.data());
            lists.push(doc);
        })
                  console.log(lists);

      })
      console.log(lists);
      this.setState({feed:lists}, function () {
        console.log(this.state.feed);
    });
    }
    const handleWatering = (UserId) =>{
      var prevLevel = db.collection("Users").doc(UserId).get().data();
      db.collection("Users").doc(UserId).update({level:prevLevel+1});
    }
    const handleLogin = (UserId) =>{
      db.collection("Users").doc(UserId).set({level:0});
    }
  const joinButton=(
    <div className='right' style={{paddingRight:20}}>
        <Link to={"/authentication"} style={{color: '#000', marginRight: 20}}>Login</Link>
        <Button type='primary'>
            <Link to={"/authentication"}>JOIN</Link>
        </Button>
    </div>
);
  
const mypageButton=(
    <div className='right' style={{paddingRight:20}}>
        <Link to={"/mypage"} style={{color: '#000', marginRight: 20}}>Join}</Link>
    </div>
);


export default App;  
