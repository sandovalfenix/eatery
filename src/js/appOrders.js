const appOrders = new Vue({
  el: "#appOrders",
  data: {
    Dishes: false,
    Dish: false,
    file: false,
    search: '',
    Restaurant: false,
  },
  created() {
    app.Restaurant = $('#appOrders').attr('data-ref').split("_")[0];
  },
  computed: {
    filteredDishes() {
      if (this.search) {
        var Dishes = this.Dishes.filter((dish) => {
          return dish.name.toLowerCase().match(this.search);
        });
        if (Dishes.length > 0) {
          return Dishes;
        } else {
          return false
        }
      } else {
        return false;
      }
    }
  },
  methods: {
    addDish() {
      if($("#formDish").valid()) {
        app.create("Dishes", this.Dish);
        $("#formDishModal").modal("hide");
      }
    },
    newGroup() {
      if ($("#selectGroup").val() == '0') {
        $("#groupInput").removeClass("d-none");
        $("#groupInput").removeAttr("disabled");
        $("#group").remove();
      } else {
        this.Dish.group = $("#selectGroup").val();
      }
    },
    editDish(id) {
      this.file = [];
      app.edit(id, "Dishes", function (data) {
        appOrders.Dish = data;
      });
    },
    updateDish(id) {
      if($("#formDish").valid()) {
        app.update(id, "Dishes", this.Dish);
        $("#formDishModal").modal("hide");
      }
    },
    deleteDish(id, name) {
      $("#deleted").on("click", function () {
        app.deleted(id, "Dishes");
        this.Dish.name = name;
        deletedFileUpload();
        $("#alertDeleteModal").modal("hide");
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.file.photoURL = URL.createObjectURL(this.file);

      app.filesUpload(this.Dish.name, this.file, function (dataURL) {
        appOrders.Dish.photoURL = dataURL;
      });
    },
    deletedFileUpload() {
      app.filesUploadDeleted(this.Dish.name);
      this.file = [];
    }
  },
  delimiters: ['([', '])'],
});
onSnapshot("Dishes",["name", "asc"], function (data) {
      appOrders.Dishes = data;
    }
);
collectionRef = db.collection("Restaurants").doc(app.Restaurant);
collectionRef.get().then(function (doc) {
  if (doc.exists) {
    var data = doc.data();
    data.id = doc.id;
    appOrders.Restaurant = data;
  }
});







