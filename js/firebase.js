const firebaseConfig = {
    apiKey: "AIzaSyCVEjF99Zenq_gNGcweE_mDyXvv0W7vxVg",
    authDomain: "manarafirebase.firebaseapp.com",
    databaseURL: "https://manarafirebase-default-rtdb.firebaseio.com",
    projectId: "manarafirebase",
    storageBucket: "manarafirebase.appspot.com",
    messagingSenderId: "213161288379",
    appId: "1:213161288379:web:28d754b4411f959c5fff9e"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var my_manara = JSON.parse(localStorage['manara_login'] || '{}').code;

database.ref(my_manara+'/name').on('value',snap => {
  $('.online_btn').show();
});


