$(function () {
  $(window).load(function(){
    $('#textLoader').html("Bienvenido");
    $('#page-loader').fadeOut(3000, function () { 
      $(this).remove();      
    });
  });  
});

firebase.initializeApp({
  apiKey: 'AIzaSyDxtJdF1itjSySnOzluurtpOeTT5IuSzaE',
  authDomain: 'eatery-244017.firebaseapp.com',
  projectId: 'eatery-244017'
});
  
// Initialize Cloud Firestore through Firebase
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if(user.emailVerified){
      if(window.location.pathname.indexOf("/dashboard") == -1){
        location.href="/dashboard";
      }

      var User = {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      }

      localStorage.setItem('User', JSON.stringify(User));
      console.log("User is signed in"); 
    }
  } else {
    if(window.location.pathname != "/"){
      location.href="/";
    }
    console.log("User is signed out");
  }
});
  
const db = firebase.firestore();


