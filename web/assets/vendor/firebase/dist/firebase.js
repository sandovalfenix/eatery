firebase.initializeApp({
	apiKey: 'AIzaSyDxtJdF1itjSySnOzluurtpOeTT5IuSzaE',
	authDomain: 'eatery-244017.firebaseapp.com',
	projectId: 'eatery-244017',
	storageBucket: "gs://eatery-244017.appspot.com/",
});
    
// Initialize Cloud Firestore through Firebase
firebase.auth().useDeviceLanguage();
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
var storageRef = firebase.storage().ref();