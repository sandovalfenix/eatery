const appAuth = new Vue({
  el: "#appAuth",
  data:{
    User: [],
    alerts: [],
  },
  methods:{
    signInPhone(){
      //Usa un reCAPTCHA invisible
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': function(response) {
          onSignInSubmit();
        }
      });

      //Envía un código de verificación al teléfono del usuario
      var phoneNumber = User.phoneNumber;
      var appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
        }).catch(function (error) {
          app.alerts.push({
            type: 'alert-danger',
            msj: 'Error: codigo '+error.code+': '+error.message,
          });
        });
    },
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


