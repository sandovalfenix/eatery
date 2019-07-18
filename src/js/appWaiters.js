const appWaiters = new Vue({
  el: "#appWaiters",
  data: {
    Waiters: [],
    Waiter: [],
    file: [],
    pag: app.pag,
    search: '',
  },
  computed: {
    filteredWaiters() {
      if (this.search) {
        app.pagActive(1);
        var Waiters = this.Waiters.filter((Waiter) => {
          return Waiter.name.toLowerCase().match(this.search);
        });
        if (Waiters.length > 0) {
          app.pagination(Waiters.length, 12);
          return Waiters;
        } else {
          return false
        }
      } else {
        app.pagination(this.Waiters.length, 12);
        return false;
      }
    }
  },
  methods: {
    addWaiter() {
      if ($("#formWaiter").valid()) {
        app.create("Waiters", this.Waiter);
        $("#formWaiterModal").modal("hide");
      };
    },
    editWaiter(id) {
      this.file = [];
      app.edit(id, "Waiters", function (data) {
        appWaiters.Waiter = data;
      });
    },
    updateWaiter(id) {
      if ($("#formWaiter").valid()) {
        app.update(id, "Waiters", this.Waiter);
        $("#formWaiterModal").modal("hide");
      }
    },
    deleteWaiter(id) {
      $("#deleted").on("click", function () {
        app.deleted(id, "Waiters");
        if (appWaiters.Waiter.photoURL) {
          appWaiters.deletedFileUpload();
        }
        $("#alertDeleteModal").modal("hide");
      })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      this.file.photoURL = URL.createObjectURL(this.file);

      app.filesUpload(this.Waiter.name, this.file, function (dataURL) {
        appWaiters.Waiter.photoURL = dataURL;
      });
    },
    deletedFileUpload() {
      app.filesUploadDeleted(this.Waiter.name + '.' + this.Waiter.photoURL.split(".")[5].split("?")[0]);
      this.file = [];
    }
  },
  delimiters: ['([', '])'],
});

onSnapshot(
  db.collection("Waiters")
    .orderBy("name", "asc"), function (data) {
      appWaiters.Waiters = data;
      app.pagination(data.length, 12);
    }
);






