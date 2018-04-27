import firebase from 'firebase'

var config = {
    apiKey: 'AIzaSyDB4jxgWYruSRGEz8MMte030FK8DWqm_rk',
    databaseURL: 'https://todo-a1b8c.firebaseio.com/',
    storageBucket: 'todo-a1b8c'
}

let db = firebase.initializeApp(config);

export default db;