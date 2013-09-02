(function ($) {
  $.extend($.fn, {
    selectRadio:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        checkid: '_radio'
      }, setting);

      var that = this;

      var id = that.attr('id');

      var inited = false;

      function binding() {
        setValue();
        $('[name="' + id + ps.checkid + '"]').on('click', setValue);
        inited = true;
      }

      function setValue() {
        var selectValus = $('[name="' + id + ps.checkid + '"]:checked').val();
        that.val(selectValus);
        if (inited) {
          that.parents('form:first').validate().element('#' + id);
        }
      }
      binding();
    }
  });
})(jQuery)