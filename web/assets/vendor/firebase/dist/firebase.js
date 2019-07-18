firebase.initializeApp({
  apiKey: 'AIzaSyDxtJdF1itjSySnOzluurtpOeTT5IuSzaE',
  authDomain: 'eatery-244017.firebaseapp.com',
  projectId: 'eatery-244017',
  storageBucket: "gs://eatery-244017.appspot.com/",
});

// Initialize Cloud Firestore through
var storageRef = firebase.storage().ref();

const db = firebase.firestore();

firebase.auth().useDeviceLanguage();

if (window.location.pathname.indexOf("/customer") == 0) {
  var role = 'Customer'
} else if (window.location.pathname.indexOf("/restaurant") == 0) {
  var role = 'Admin'
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (!(user.isAnonymous)) {
      window.collection = db.collection("Users");
      collection.where("uid", "==", user.uid).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.exists) {
              collection.doc(doc.id).update({
                online: true,
              });
              switch (doc.data().role) {
                case 'Customer':
                  if (window.location.pathname.indexOf("/customer") == -1) {
                    location.href = "/customer";
                  }
                  break;

                case 'Admin':
                  if (window.location.pathname.indexOf("/dashboard") == -1) {
                    location.href = "/dashboard";
                  }
                  break;

                case 'SuperAdmin':
                  if (window.location.pathname.indexOf("/superDashboard") == -1) {
                    location.href = "/superDashboard";
                  }
                  break;
              }

              localStorage.setItem('User', JSON.stringify(user));
              console.log("User is signed in");
            } else {
              collection.add({
                uid: user.uid,
                online: true,
                role: role
              })
            }
          })
          if (querySnapshot.size == 0) {
            collection.add({
              uid: user.uid,
              online: true,
              role: role
            })
          }
        }).catch((error) => {
          console.log(error)
        });
    } else {
      if (window.location.pathname.indexOf("/customer") == -1) {
        location.href = "/customer";
      }
    }
  } else {
    switch (window.location.pathname) {
      case "customer":
        firebase.auth().signInAnonymously();
        break;

      case "restaurant":
        console.log("Admin is signed out");
        break;

      case "/":
        console.log("User is signed out");
        break;
    }

    if (window.location.pathname != "/" &&
      window.location.pathname.indexOf("/restaurant") == -1 &&
      window.location.pathname.indexOf("/customer") == -1) {
      location.href = "/";
    }
  }
});

