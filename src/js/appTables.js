const appTables = new Vue({
  el: "#appTables",
  data:{
    Tables: [],
    Table: [],
    qrCodeURL:'javascript:void(0)',
  },
  methods:{
    addTable(){
      var errorList = $("#formTable").validate().errorList;
      if($.isEmptyObject(errorList)){      
        app.create("Tables", this.Table);
        $("#formTableModal").modal("hide");
        this.Table = [];  
      }else{
        console.log("error en el formulario")
      }
    },
    editTable(id){
      app.edit(id, "Tables", function(data){
        appTables.Table = data;
      });
    },
    updateTable(id){
      var errorList = $("#formTable").validate().errorList;
      if($.isEmptyObject(errorList)){
        app.update(id, "Tables", this.Table);
        $("#formTableModal").modal("hide");        
        this.Table = [];        
        this.file = '';
      }else{
        console.log("error en el formulario")
      }
    },
    deleteTable(id){
      $("#deleted").on("click", function(){
        app.deleted(id, "Tables");
        $("#alertDeleteModal").modal("hide");
      })
    },
    createQRTable(id){      
      var url = window.location.href
      var array = url.split("/");
      
      var formData = new FormData();
      formData.append("codeContents", array[0] + "//" + array[2]+"/"+"orders/"+id);
      formData.append("id", id);
      app.createQR(formData, function(data){
        if(data.success){
          appTables.qrCodeURL = data.qrCodeURL;
          $('#qrCode').attr("src",data.qrCodeURL);
        }else{
          appTables.qrCodeURL = false;
        }
      });      
      $("#qrCodeTableModal").modal("show");
    }
  },
  delimiters: ['([','])'],
});

onSnapshot(
  db.collection("Tables")
  .orderBy("name", "asc"), function(data){
    appTables.Tables = data;
  }
);
  





