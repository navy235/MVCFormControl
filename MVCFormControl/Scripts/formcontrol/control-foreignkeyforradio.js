(function ($) {
  $.extend($.fn, {
    foreignKeyForRadio:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        checkid: '_check',
        textid: '_text',
        selectid: '_select',
        windowid: '_window',
        saveid: '_save',
      }, setting);
      var that = this;
      var id = that.attr('id');
      function binding() {
        setValue();
        $('#' + id + ps.selectid).on('click', function () {
          $("#" + id + ps.windowid).data("kendoWindow").center().open();
        })
        $('#' + id + ps.saveid).on('click', saveData)
      }

      function setValue() {
        var selectText = $('[name="' + id + ps.checkid + '"]:checked').data('text');
        $('#' + id + ps.textid).val(selectText);
        $('#' + id + ps.textid).attr('title', selectText);
        var selectValus = $('[name="' + id + ps.checkid + '"]:checked').val();
        that.val(selectValus);
      }
      function saveData() {
        setValue();
        that.parents('form:first').validate().element('#' + id);
        $('#' + id + ps.windowid).data("kendoWindow").close();
      }

      binding();
    }
  })

})(jQuery)