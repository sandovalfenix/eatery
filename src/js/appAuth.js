const appAuth = new Vue({
  el: "#appAuth",
  data: {
    Users: [],
    UserAuth: [],
    alert: false,
    signInShow: true,
  },
  methods: {
    signIn() {
      firebase.auth().signInWithEmailAndPassword(this.UserAuth.email, this.UserAuth.password)
        .then(function (user) {
          if (!user.emailVerified) {
            appAuth.alert = {
              type: 'alert-warning',
              msj: 'Esta cuenta no se encuentra activa. Verifica tu correo electrónico para activar tu cuenta',
            };
          }
        })
        .catch(function (error) {
          appAuth.alert = {
            type: 'alert-danger',
            msj: error.code + ': ' + error.message
          };
        });
    },
    signUp() {
      //registro en autenticar
      var displayName = this.UserAuth.name;
      firebase.auth().createUserWithEmailAndPassword(this.UserAuth.email, this.UserAuth.password)
        .then(function (user) {
          user.updateProfile({
            displayName: displayName,
            photoURL: "https://image.flaticon.com/icons/svg/1890/1890001.svg",
          })
          user.sendEmailVerification()
          appAuth.alert = {
            type: 'alert-success',
            msj: 'El correo: <b>' + user.email + '</b> fue registrado correctamente!',
          }
        }).catch(function (error) {
          appAuth.alert = {
            type: 'alert-danger',
            msj: error.code + ': ' + error.message
          };
        });

      this.UserAuth = [];
      this.changeSignIn();
    },
    signInAdmin() {
      if ($('#signInAdmin').valid()) {
        db.collection("Restaurants").where("email", "==", this.UserAuth.email).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.exists) {
                if (doc.data().password == appAuth.UserAuth.password) {
                  appAuth.UserAuth = doc.data();
                  if (doc.data().uid) {
                    appAuth.signIn();
                  } else {
                    appAuth.signUp();
                    firebase.auth().onAuthStateChanged((user) => {
                      if (user) {
                        db.collection("Restaurants").doc(doc.id).update({
                          uid: user.uid
                        });
                      }
                    })
                  }
                } else {
                  appAuth.alert = {
                    type: 'alert-danger',
                    msj: 'Constraseña o Correo Incorrecta. Intentelo de nuevo'
                  };
                }
              } else {
                appAuth.alert = {
                  type: 'alert-danger',
                  msj: 'Constraseña o Correo Incorrecta. Intentelo de nuevo'
                };
              }
            })
          })
          .catch((error) => {
            appAuth.alert = {
              type: 'alert-danger',
              msj: error.code + ': ' + error.message
            };
          });
      }
    },
    changeSignUp() {
      this.signInShow = false;
    },
    changeSignIn() {
      this.signInShow = true;
    }
  },
  delimiters: ['([', '])'],
});

onSnapshot(
  db.collection("Users"), function (data) {
    appAuth.Users = data;
  }
);
