var datepicker = {
  template: '<input type="text" class="form-control time-field" :id="name" :name="name">',
  props: {
    name: String,
    id: String,
    value: {},
    format: {},
  },
  data() {
    return {
      datePicker: null,
      defaultFormat: 'YYYY-MM-DD',
      dateFormat: this.format ? this.format : this.defaultFormat,
    }
  },
  mounted() {
    this.dateFormat = this.format ? this.format : this.defaultFormat;

    this.initDatePicker();
  },
  methods: {
    initDatePicker() {
      let self = this;

      this.datePicker = $(this.$el).datetimepicker({
        format: self.dateFormat,
      }).on('dp.change', function (e) {

        let date = e.date.format(self.dateFormat);

        self.$emit('changed', e);
        self.$emit('input', date);
      });

      if (this.value) {
        this.setDate(this.value);
      }
    },
    setDate(value) {
      this.datePicker.val(value).trigger('change');
    },
  },
  watch: {
    value(value) {
      if (value == this.datePicker.val()) return;

      this.datePicker.val(value).trigger('change');
    },
  },
};

new Vue({
  el: '#app',
  components: {
    datepicker: datepicker,
  },
  data: {
    dateFormat: 'MM/DD/YYYY',
    date: null,
  },
  methods: {
    setCurrent() {
      this.date = moment().format(this.dateFormat);
    },
  },
});