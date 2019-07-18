const appRestaurant = new Vue({
  el: "#appRestaurant",
  data: {
    Restaurants: [],
    Restaurant: [],
    file: [],
    search: '',
  },
  computed: {
    filteredRestaurants() {
      if (this.search) {
        app.pagActive(1);
        var Restaurants = this.Restaurants.filter((restaurant) => {
          return restaurant.name.toLowerCase().match(this.search);
        });
        if (Restaurants.length > 0) {
          app.pagination(Restaurants.length, 4);
          return Restaurants;
        } else {
          return false
        }
      } else {
        app.pagination(this.Restaurants.length, 4);
        return false;
      }
    }
  },
  methods: {
    addRestaurant() {
      if ($("#formRestaurant").valid()) {
        app.create("Restaurants", this.Restaurant);
        $("#formRestaurantModal").modal("hide");
      }
    },
    editRestaurant(id) {
      this.file = [];
      app.edit(id, "Restaurants", function (data) {
        appRestaurant.Restaurant = data;
      });
    },
    updateRestaurant(id) {
      if ($("#formRestaurant").valid()) {
        app.update(id, "Restaurants", this.Restaurant);
        $("#formRestaurantModal").modal("hide");
      }
    },
    deleteRestaurant(id, name) {
      $("#deleted").on("click", function () {
        app.deleted(id, "Restaurants");
        appRestaurant.Restaurant.name = name;
        deletedFileUpload();
        $("#alertDeleteModal").modal("hide");
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.file.photoURL = URL.createObjectURL(this.file);

      app.filesUpload(this.Restaurant.name, this.file, function (dataURL) {
        appRestaurant.Restaurant.photoURL = dataURL;
      });
    },
    deletedFileUpload() {
      app.filesUploadDeleted(this.Restaurant.name);
      this.file = [];
    }
  },
  delimiters: ['([', '])'],
});

onSnapshot(
  db.collection("Restaurants")
    .orderBy("name", "asc"),
  function (data) {
    appRestaurant.Restaurants = data;
  }
);


