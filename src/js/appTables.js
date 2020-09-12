const appTables = new Vue({
  el: '#appTables',
  data: {
    Tables: false,
    Table: [],
    qrCodeURL: 'javascript:void(0)',
  },
  methods: {
    addTable() {
      if ($('#formTable').valid()) {
        app.create('Tables', this.Table);
        $('#formTableModal').modal('hide');
        this.Table = false;
      }
    },
    editTable(id) {
      app.edit(id, "Tables", function (data) {
        appTables.Table = data;
      });
    },
    updateTable(id) {
      if ($('#formTable').valid()) {
        app.update(id, 'Tables', this.Table);
        $('#formTableModal').modal('hide');
        this.Table = false;
      } else {
        console.log('error en el formulario');
      }
    },
    deleteTable(id) {
      $('#alertDeleteModal').modal('show');
      $('#deleted').on('click', function () {
        app.deleted(id, 'Tables');
        $('#alertDeleteModal').modal('hide');
      });
    },
    createQRTable(id) {
      var url = window.location.href;
      var array = url.split('/');

      var formData = new FormData();
      formData.append(
        'codeContents',
        array[0] + '//' + array[2] + '/customer/orders/' + app.Restaurant + '_' + id
      );
      formData.append('id', id);
      app.createQR(formData, function (data) {
        if (data.success) {
          appTables.qrCodeURL = data.qrCodeURL;
          $('#qrCode').attr('src', data.qrCodeURL);
        } else {
          appTables.qrCodeURL = false;
        }
      });
      $('#qrCodeTableModal').modal('show');
    },
    viewOrders(id) {
      $('#ordersModal').modal('show');
    }
  },
  delimiters: ['([', '])']
});

onSnapshot('Tables', ['name', 'asc'], function (data) {
  appTables.Tables = data;
});
