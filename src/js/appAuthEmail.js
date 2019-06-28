const app = new Vue({
  el: "#app",
  data:{
    User: [],
    alerts: [],
  },
  methods:{
    signIn(e){
      firebase.auth().signInWithEmailAndPassword(this.User.email, this.User.password)
      .then(function(user) {
        if(!user.emailVerified){
          app.alerts.push({
            type: 'alert-warning',
            msj: 'Esta cuenta no se encuentra activa. Verifica tu correo electronico para activar tu cuenta',
          });
        }
      })
      .catch(function(error) {
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        });
      });
    },
    signUp(e){
      //registro en autenticacion
      var displayName = this.User.name;
      firebase.auth().createUserWithEmailAndPassword(this.User.email, this.User.password)
      .then(function(user){
        user.updateProfile({
          displayName: displayName,
          photoURL: "https://image.flaticon.com/icons/svg/1890/1890001.svg",
        })
        user.sendEmailVerification()
        app.alerts.push({
          type: 'alert-success',
          msj: 'El correo: <b>'+user.email+'</b> fue registrado correctamente!',
        })
      }).catch(function(error) {
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        })
      });

      this.User = [];
      this.changeSignIn();
    },
    changeSignUp(){
      $("#signIn").addClass("d-none");
      $("#signUp").removeClass("d-none");
    },
    changeSignIn(){
      $("#signUp").addClass("d-none");
      $("#signIn").removeClass("d-none");
    }
  },
  delimiters: ['([','])'],
});


