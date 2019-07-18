const appOrders = new Vue({
  el: "#appOrders",
  data: {
    Dishes: [],
    Dish: [],
    file: [],
    pag: app.pag,
    search: '',
  },
  computed: {
    filteredDishes() {
      if (this.search) {
        app.pagActive(1);
        var Dishes = this.Dishes.filter((dish) => {
          return dish.name.toLowerCase().match(this.search);
        });
        if (Dishes.length > 0) {
          app.pagination(Dishes.length, 4);
          return Dishes;
        } else {
          return false
        }
      } else {
        app.pagination(this.Dishes.length, 4);
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

onSnapshot(
  db.collection("Dishes")
    .orderBy("name", "asc"), function (data) {
      appOrders.Dishes = data;
      app.pagination(data.length, 4);
    }
);






