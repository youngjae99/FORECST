import {useEffect,useState} from 'react';

import { db,storage } from "../firebase";
import 'antd/dist/antd.css';
import PropTypes from 'prop-types'
import { render } from '@testing-library/react';

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



function Post() {
  const [inputs, setInputs] = useState({
    title: "",
    writing: "",
  });
  const [file, setFile] = useState(0);
  // const [image,setImage] = useState(0);
  const { title,writing } = inputs;

  // useEffect(() => {
  //   // 브라우저 API를 이용하여 문서 타이틀을 업데이트합니다.
  //   console.log(file.name);
  // });


//   const handleClick = (mode) => {
//       if (mode="title"){
//     db.collection('users').set()
//     }
//     else if(mode ="writing"){
//         db.collection('users')
//         .doc(id)
//         .get()
//         .then(doc => {
//           if (!doc.data()) {
//             db.collection('users')
//               .doc(id)
//               .set({
//                 currentUser : id,
//                 isLoggedIn : true
//               });
//             alert(`${id}님 환영합니다.`);
//             return(<div><header isLoggedIn = {1} currentUser = {id} /></div>);
//           } else { //등록된 유저일 경우
//             db.doc(`/users/${id}`)
//               .get()
//               .then(doc => {
//                 const currentConsAmount = doc.data().cons_amount;
//                 db.doc(`/users/${id}`).update({
//                   cons_amount: currentConsAmount + 1
//                 });
//               });
//             alert(`현재 con 갯수 : ${doc.data().cons_amount}`);
//           }})
  
//     }
//   };

  const handleChange = e => {
    const { name, value } = e.target;
    setInputs({
         ...inputs, [name]: value });
  };
  const handleImage = e => {
    console.log(e.target.files[0])

      setFile(e.target.files[0]); 

  };

  

  const handlePost = () =>{
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(function(snapshot) { 
      console.log(snapshot);   
      const filepath ="gs://"+fileRef._delegate._location.bucket+'/'+file.name;

        console.log(filepath);
        db.collection('Feeds').doc().set({photo:filepath,writing:writing,title:title});
        console.log('Uploaded a blob or file!');
      });

    }

  return (
    <>
    <div>
        <input name="title" placeholder="title"  value={title} onChange={handleChange}style={{margin:50}}></input>
    </div>

    <div>
        <input name="writing" placeholder="writing" value={writing} onChange={handleChange}style={{margin:50}}></input>
    </div>

    <div>

        <input type="file" name="file" onChange={handleImage}/>

      </div>
    <div>
    <button type="button" onClick={handlePost}>Post</button>

    </div>
    </>
  );
}

export default Post;  
