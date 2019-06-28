const appWaiters = new Vue({
    el: "#appWaiters",
    data:{
      Waiters: [],
      Waiter: [],
      file: '',
      pag: app.pag,
      search: '',
    },
    computed:{
      filteredWaiters(){
        if(this.search){                
          app.pagActive(1);
          var Waiters = this.Waiters.filter((Waiter) => {
            return Waiter.name.toLowerCase().match(this.search);
          });
          if(Waiters.length > 0){
            app.pagination(Waiters.length, 12);
            return Waiters;
          }else{
            return false
          }
        }else{
          app.pagination(this.Waiters.length, 12);        
          return false;
        }
      }
    },
    methods:{
      addWaiter(){
        var errorList = $("#formWaiter").validate().errorList;
        if($.isEmptyObject(errorList)){       
          app.create("Waiters", this.Waiter);
          $("#formWaiterModal").modal("hide");
          this.Waiter = [];   
          this.file = '';
        }
      },
      editWaiter(id){
        app.edit(id, "Waiters", function(data){
          appWaiters.Waiter = data;
        });
      },
      updateWaiter(id){
        var errorList = $("#formWaiter").validate().errorList;
        if($.isEmptyObject(errorList)){
          app.update(id, "Waiters", this.Waiter);
          $("#formWaiterModal").modal("hide");        
          this.Waiter = [];        
          this.file = '';
        }
      },
      deleteWaiter(id){
        $("#deleted").on("click", function(){
          app.deleted(id, "Waiters");
          $("#alertDeleteModal").modal("hide");
        })
      },
      sendFile() {
        var formData = new FormData();
        formData.append("photoURL", this.file);
        this.$http.post('/src/php/filesUpload.php', formData).then(function(response){
          if(response.body.success){
            appWaiters.Waiter.photoURL = response.body.photoURL;
          }
        }, function(error){
          app.alert.push({
            type: 'alert-danger',
            msj: 'Error: codigo '+error.code+': '+error.message,
          });
        });  
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        this.file.photoURL = URL.createObjectURL(this.file);
        this.sendFile();
      }
    },
    delimiters: ['([','])'],
  });
  
  onSnapshot(
    db.collection("Waiters")
    .orderBy("name", "asc"), function(data){
      appWaiters.Waiters = data;
      app.pagination(data.length, 12);
    }
  );
    
  
  
  
  
  
  