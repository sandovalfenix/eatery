const app = new Vue({
  el: "#app",
  data:{
    User: JSON.parse(localStorage.getItem('User')),    
    alerts: [],
    pag: {      
      active: 1,
      next: true,
      pre: false, 
    },
  },
  methods:{
    signOut(){
      firebase.auth().signOut().then(function() {
        location.href="/";
      })
      .catch(function(error) {
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        });
      });
    },    
    create(collection, docData){
      var Doc = Object.assign({},docData);
      db.collection(collection).add(Doc)
      .then(function (docRef) {
        app.alerts.push({
          type: 'alert-success',
          msj: "Registro añadido con ID: "+docRef.id
        });
      })
      .catch(function (error) {
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        });
      });
    },
    edit(id, collection, callback){
      var docRef = db.collection(collection).doc(id);
      docRef.get().then(function(doc) {
        if (doc.exists) {
          var data = doc.data();
          data.id = id;
          callback(data);
        } else {
          app.alerts.push({
            type: 'alert-success',
            msj: 'El documento no existe',
          });
        }
      }).catch(function(error) {
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        });
      });
    },
    update(id, collection, docData){
      delete docData.id;
      var Doc = Object.assign({},docData);
      db.collection(collection).doc(id).update(Doc)
      .then(function() {
        app.alerts.push({
          type: 'alert-success',
          msj: 'Actualizacion Completada',
        });
      }).catch(function(error) {
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        });
      });
    },
    deleted(id, collection){
      db.collection(collection).doc(id).delete().then(function() {
        app.alerts.push({
          type: 'alert-success',
          msj: 'Registro eliminado exitosamente!',
        });
      }).catch(function(error) {
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        });
      });
    },
    pagination(length, numResult){    
      mod = length % numResult;
      if(length > numResult){
        this.pag.numPages = (length+(numResult-mod))/numResult;        
        this.pag.next = true; 
      }else{
        this.pag.numPages = numResult/numResult;
        this.pagActive(1);
        this.pag.next = false;
      }
      this.pag.numResult = numResult;      
      this.pag.numLength =  length;
    },
    pagActive(numPage, action=false){            
      $('#page-'+this.pag.active).removeClass('active');
      if(action == 'next'){
        $('#page-'+(++numPage)).addClass('active');
      }else if(action == 'pre'){
        $('#page-'+(--numPage)).addClass('active');
      }else{
        $('#page-'+numPage).addClass('active');
      }
      
      this.pag.active = numPage;
      if(this.pag.active < this.pag.numPages && this.pag.active > 1){
        this.pag.pre = true;  this.pag.next = true;
      }else if(this.pag.active == 1){
        this.pag.pre = false;
        this.pag.next = true;
      }else{
        this.pag.next = false;
        this.pag.pre = true;
      }
    }, 
    filesUpload(name, file, callback) {
      storageRef.child('img/'+name+'.'+file.name.split(".")[1]).put(file).then(function(snapshot){
        callback(snapshot.downloadURL);
      }).catch(function(error) {
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        });
      });
    },
    filesUploadDeleted(name){
      var desertRef = storageRef.child('img/'+name);
      desertRef.delete();
    },
    createQR(formData, callback){
      this.$http.post('/src/php/qrCode.php', formData).then(function(response){
        callback(response.body);
      }, function(error){
        app.alerts.push({
          type: 'alert-danger',
          msj: 'Error: codigo '+error.code+': '+error.message,
        });
      });
    },
    print(html){
      $('<iframe>', {name: 'frame',class: 'printFrame'})
      .appendTo('body')
      .contents().find('body')
      .append(html);

      window.frames['frame'].focus();
      window.frames['frame'].print();

      setTimeout(() => { $(".printFrame").remove(); }, 1000);      
    },
  },
  delimiters: ['([','])'],
});


function onSnapshot(collection, callback){
  collection.onSnapshot(function(querySnapshot) {
    var collectionData = [];
    querySnapshot.forEach(function(doc) {
      var data = doc.data();
      data.id = doc.id;
      collectionData.push(data);   
    });
    callback(collectionData);
  });    
}


