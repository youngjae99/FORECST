import React, { useState } from 'react';
import firebase from "firebase/app";

import { db,storage } from "./firebase";
import {Link} from 'react-router-dom';
import {Layout, Menu, Breadcrumb, Icon, Button} from 'antd';
import 'antd/dist/antd.css';



//   const [id, setString] = useState();
//   const handleClick = () => {
//     db.collection('users')
//       .doc(id)
//       .get()
//       .then(doc => {
//         if (!doc.data()) {
//           db.collection('users')
//             .doc(id)
//             .set({
//               currentUser : id,
//               isLoggedIn : true
//             });
//           alert(`${id}님 환영합니다.`);
//           return(<div><header isLoggedIn = {1} currentUser = {id} /></div>);
//         } else { //등록된 유저일 경우
//           db.doc(`/users/${id}`)
//             .get()
//             .then(doc => {
//               const currentConsAmount = doc.data().cons_amount;
//               db.doc(`/users/${id}`).update({
//                 cons_amount: currentConsAmount + 1
//               });
//             });
//           alert(`현재 con 갯수 : ${doc.data().cons_amount}`);
//         }})
//   };
//   function addTestFile() {
//     const storageRef = storage.ref();
//     const fileRef = storageRef.child('test.txt');
//     return fileRef
//       .putString('Some File Contents')
//       .then((snap) => console.log('upload successful', snap))
//       .catch((err) => console.error('error uploading file', err))
//   }

//   const handleChange = e => {
//     setString(e.target.value);
//   };
//   const handleImage = e => {
//     console.log(e.target.files[0])

//       setFile(e.target.files[0]); 
//   }
//   const [file, setFile] = useState(0);

//   const handlePost = () =>{
//     const storageRef = storage.ref();
//     const fileRef = storageRef.child(file.name);
//     fileRef.put(file).then(function(snapshot) { 
//       console.log(file.path);
//       console.log(snapshot);   
//       const filepath ="gs://"+fileRef._delegate._location.bucket+'/'+file.name;

//         console.log(filepath);
//         db.collection('Feeds').doc().set({photo:filepath});
//         console.log('Uploaded a blob or file!');
//       });

//     }
    export const backend_Join = (id) => {
        db.collection("Users").doc(id).set({
            level:0,
            point:0,
            active:true});
    }
    export const backend_Handle_login= async(id,password) =>{

        if(id===""||password==="")
            return;
        else 
        {
            console.log(id)
            const exist =await db.collection('Users').doc(id).get().exists
            if(exist){
                console.log("registered!")
                backend_Point(id,"login")
                }
            else{
                return
            }
        }

    }
    export const backend_Login= (id) => {
        if(!check_register(id)){
            console.log("not registered!")
            return false
        }
        else{
            console.log("registered!")
            // const prev_point = await db.collection('Users').doc(id).get().getString("point");
            backend_Point(id,"login")
            return true 
        }
    }
    export const check_register= async (id) => {
        console.log(id)
        return await db.collection('Users').doc(id).get().exists
    }
    export const backend_Point = (id,mode) => {
        if(mode =="post"){
            db.collection("Users").doc(id).update('point',firebase.firestore.FieldValue.increment(5))
        }
        else if(mode =="login"){
            console.log("login")
            db.collection("Users").doc(id).update('point',firebase.firestore.FieldValue.increment(1))
        }
        else if(mode == "comment"){
            db.collection("Users").doc(id).update('point',firebase.firestore.FieldValue.increment(2))
        }
    }
    export const backend_Feed_watering = (doc,id) => {
        console.log(id)
        db.collection("Users").doc(id).update('point',firebase.firestore.FieldValue.increment(2))
        db.collection("Feeds").doc(doc).update('watering',firebase.firestore.FieldValue.increment(1))
    }
    export const backend_WGO = (id,mode)=>{
        if(mode =="post")
            db.collection("WGO").doc().set({content : id + " uploaded a post",mode:mode })
        else if(mode == "question")
            db.collection("WGO").doc().set({content : id + " wrote a post",mode:mode })
    }



    // export const backend_Comment = async () => {
    //     const snapshot = await db.collection('Feeds').doc(this.props.posting).collection("Comments").get()
    //     console.log(snapshot.docs)
    //         this.setState({comments:snapshot.docs})  
    //     }
    
//     const handleDownload = () => {
//       db.collection('Feeds').get().then(function(querySnapshot){
//         querySnapshot.forEach(function(doc){
//             console.log(doc.data());
//             lists.push(doc);
//         })
//             console.log(lists);

//       })
//       console.log(lists);
//   }

//   // componentDidMount(){
//   //   this.getMarker();
//   // }
//   getMarker = async () => {
//     const snapshot = await db.collection('Feeds').get()
//     console.log(snapshot.docs)
//         this.setState({feed:snapshot.docs})  
//     } 


//     const handleDownloadComments= (Doc_id) =>{
//       db.collection('Feeds').doc(Doc_id).collection("Comments").get()

//     }
//     const handleDownloadUser = (UserId) => {
//       var lists = [];
//       db.collection('Feeds').get(UserId).then(function(querySnapshot){
//         querySnapshot.forEach(function(doc){
//             console.log(doc.data());
//             lists.push(doc);
//         })
//                   console.log(lists);

//       })
//       console.log(lists);
//       this.setState({feed:lists}, function () {
//         console.log(this.state.feed);
//     });
//     }
//     const handleWatering = (UserId) =>{
//       var prevLevel = db.collection("Users").doc(UserId).get().data();
//       db.collection("Users").doc(UserId).update({level:prevLevel+1});
//     }
//     const handleLogin = (UserId) =>{
//       db.collection("Users").doc(UserId).set({level:0});
//     }
//   const joinButton=(
//     <div className='right' style={{paddingRight:20}}>
//         <Link to={"/authentication"} style={{color: '#000', marginRight: 20}}>Login</Link>
//         <Button type='primary'>
//             <Link to={"/authentication"}>JOIN</Link>
//         </Button>
//     </div>
// );
  
// const mypageButton=(
//     <div className='right' style={{paddingRight:20}}>
//         <Link to={"/mypage"} style={{color: '#000', marginRight: 20}}>Join}</Link>
//     </div>
// );


