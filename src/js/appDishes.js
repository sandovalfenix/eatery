const appDishes = new Vue({
  el: "#appDishes",
  data: {
    Dishes: false,
    Dish: false,
    file: false,
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
      if ($("#formDish").valid()) {
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
      this.file = false;
      app.edit(id, "Dishes", function (data) {
        appDishes.Dish = data;
      });
    },
    updateDish(id) {
      if ($("#formDish").valid()) {
        app.update(id, "Dishes", this.Dish);
        $("#formDishModal").modal("hide");
      }
    },
    deleteDish(id) {
      $("#deleted").on("click", function () {
        this.deletedFileUpload();
        app.deleted(id, "Dishes");
        $("#alertDeleteModal").modal("hide");
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.file.photoURL = URL.createObjectURL(this.file);
      this.uploadFilesDish();
    },
    uploadFilesDish() {
      if (this.Dish.name) {
        app.filesUpload(this.Dish.name, this.file, function (dataURL) {
          appDishes.Dish.photoURL = dataURL;
        });
      }
    },
    deletedFileUpload() {
      if (this.Dish.name){
        app.filesUploadDeleted(this.Dish.name+'.'+this.Dish.photoURL.split(".")[5].split("?")[0]);
      }
      this.Dish.photoURL = false;
    }
  },
  delimiters: ['([', '])'],
});

onSnapshot("Dishes", ["name", "asc"], function (data) {
      appDishes.Dishes = data;
      app.pagination(data.length, 4);
    }
);








