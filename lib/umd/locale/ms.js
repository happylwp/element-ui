(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('element/locale/ms', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.ELEMENT.lang = global.ELEMENT.lang || {}; 
    global.ELEMENT.lang.ms = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  exports.__esModule = true;
  exports.default = {
    el: {
      colorpicker: {
        confirm: 'Sah',
        clear: 'Padam'
      },
      datepicker: {
        now: 'Sekarang',
        today: 'Hari ini',
        cancel: 'Batal',
        clear: 'Padam',
        confirm: 'Sah',
        selectDate: 'Pilih Tarikh',
        selectTime: 'Pilih Masa',
        startDate: 'Tarikh Mula',
        startTime: 'Masa Mula',
        endDate: 'Tarik Tamat',
        endTime: 'Masa Tamat',
        prevYear: 'Tahun Lepas',
        nextYear: 'Tahun Depan',
        prevMonth: 'Bulan Lepas',
        nextMonth: 'Bulan Depan',
        year: 'Tahun',
        month1: 'Januari',
        month2: 'Febuari',
        month3: 'Mac',
        month4: 'April',
        month5: 'Mei',
        month6: 'Jun',
        month7: 'Julai',
        month8: 'Ogos',
        month9: 'September',
        month10: 'Oktober',
        month11: 'November',
        month12: 'Disember',
        // week: '周次',
        weeks: {
          sun: 'Ahad',
          mon: 'Isnin',
          tue: 'Selasa',
          wed: 'Rabu',
          thu: 'Khamis',
          fri: 'Jumaat',
          sat: 'Sabtu'
        },
        months: {
          jan: 'Januari',
          feb: 'Febuari',
          mar: 'Mac',
          apr: 'April',
          may: 'Mei',
          jun: 'Jun',
          jul: 'Julai',
          aug: 'Ogos',
          sep: 'September',
          oct: 'Oktober',
          nov: 'November',
          dec: 'Disember'
        }
      },
      select: {
        loading: 'Sedang dimuat turun',
        noMatch: 'Tiada maklumat yang sepadan',
        noData: 'Tiada maklumat',
        placeholder: 'Sila pilih'
      },
      cascader: {
        noMatch: 'Tiada maklumat yang sepadan',
        loading: 'Sedang dimuat turun',
        placeholder: 'Sila pilih',
        noData: 'Tiada maklumat buat sementara'
      },
      pagination: {
        goto: 'Seterusnya',
        pagesize: 'x/Halaman',
        total: 'Jumlah {total} ',
        pageClassifier: 'Halaman'
      },
      messagebox: {
        title: 'Tip',
        confirm: 'Sah',
        cancel: 'Batal',
        error: 'Data yang diisikan tidak sah!'
      },
      upload: {
        deleteTip: 'Tekan "Padam" untuk memadam',
        delete: 'Padam',
        preview: 'Semak gambar',
        continue: 'Meneruskan muat naik'
      },
      table: {
        emptyText: 'Tiada maklumat buat sementara',
        confirmFilter: 'Tapis',
        resetFilter: 'Set Semula',
        clearFilter: 'Semua',
        sumText: 'Jumlah'
      },
      tree: {
        emptyText: 'Tiada maklumat buat sementara'
      },
      transfer: {
        noMatch: 'Tiada maklumat yang sepadan',
        noData: 'Tiada maklumat',
        titles: ['Senarai 1', 'Senarai 2'],
        filterPlaceholder: 'Masukkan kandungan carian',
        noCheckedFormat: 'Jumlah {total} item',
        hasCheckedFormat: 'Telah memilih {checked}/{total} item'
      },
      image: {
        error: 'Muat turun gagal'
      },
      pageHeader: {
        title: 'Kembali'
      },
      popconfirm: {
        confirmButtonText: 'Sah',
        cancelButtonText: 'Batal'
      },
      empty: {
        description: 'Tiada maklumat buat sementara'
      }
    }
  };
  module.exports = exports['default'];
});