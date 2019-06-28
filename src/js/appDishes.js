const appDishes = new Vue({
  el: "#appDishes",
  data:{
    Dishes: [],
    Dish: [],
    file: '',
    pag: app.pag,
    search: '',
  },
  computed:{
    filteredDishes(){
      if(this.search){                
        app.pagActive(1);
        var Dishes = this.Dishes.filter((dish) => {
          return dish.name.toLowerCase().match(this.search);
        });
        if(Dishes.length > 0){
          app.pagination(Dishes.length, 4);
          return Dishes;
        }else{
          return false
        }
      }else{
        app.pagination(this.Dishes.length, 4);        
        return false;
      }
    }
  },
  methods:{
    addDish(){
      var errorList = $("#formDish").validate().errorList;
      if($.isEmptyObject(errorList)){       
        app.create("Dishes", this.Dish);
        $("#formDishModal").modal("hide");
        this.Dish = [];   
        this.file = '';
      }
    },
    newGroup(){
      if($("#selectGroup").val() == '0'){
        $("#groupInput").removeClass("d-none");
        $("#groupInput").removeAttr("disabled");
        $("#group").remove();
      }else{
        this.Dish.group = $("#selectGroup").val();
      }
    },
    editDish(id){
      app.edit(id, "Dishes", function(data){
        appDishes.Dish = data;
      });
    },
    updateDish(id){
      var errorList = $("#formDish").validate().errorList;
      if($.isEmptyObject(errorList)){
        app.update(id, "Dishes", this.Dish);
        $("#formDishModal").modal("hide");        
        this.Dish = [];        
        this.file = '';
      }
    },
    deleteDish(id){
      $("#deleted").on("click", function(){
        app.deleted(id, "Dishes");
        $("#alertDeleteModal").modal("hide");
      })
    },
    sendFile() {
      var formData = new FormData();
      formData.append("photoURL", this.file);
      this.$http.post('/src/php/filesUpload.php', formData).then(function(response){
        if(response.body.success){
          appDishes.Dish.photoURL = response.body.photoURL;
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
  db.collection("Dishes")
  .orderBy("name", "asc"), function(data){
    appDishes.Dishes = data;
    app.pagination(data.length, 4);
  }
);
  





