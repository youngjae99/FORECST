import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAU2_U6G0BKBzCYynhexUV4hIBSi1BsUzY",
    authDomain: "forecst-8f7e6.firebaseapp.com",
    databaseURL: "https://forecst-8f7e6.firebaseio.com",
    projectId: "forecst-8f7e6",
    storageBucket: "forecst-8f7e6.appspot.com",
    messagingSenderId: "725342916991",
    appId: "1:725342916991:web:79de263520bd57777a8a4a",
    measurementId: "G-VX7G1B7C53"
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const db = firebase.firestore();
const storage = firebase.storage();
// 필요한 곳에서 사용할 수 있도록 내보내기
export { db,storage };
