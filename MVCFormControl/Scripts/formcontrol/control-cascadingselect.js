(function ($) {
  $.extend($.fn, {
    cascadingSelect:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        cascaQueue: [],
        selectQueue: [],
        read_url: '',
        get_url: '',
        optionLabel: '请选择',
        value: 0,
        result: []
      }, setting);

      var that = this;

      var id = that.attr('id');

      var proxy = $.proxy;

      var form = $('#' + id).parents('form:first');

      var init = false;

      function binding() {

        for (var i = 0; i < ps.cascaQueue.length; i++) {

          var cascaId = ps.cascaQueue[i];

          if (i < ps.cascaQueue.length - 1) {
            var input = $('<input/>').attr({
              id: id + '_' + cascaId,
              type: "text",
              tabindex: -1
            });
            that.before(input);
          }

          if (i === 0) {
            ps.selectQueue[i] = $("#" + id + '_' + cascaId).kendoDropDownList({
              "dataBound": proxy(dataBound, that, cascaId),
              "select": proxy(select, that, cascaId),
              "dataSource": {
                "transport": {
                  "read": {
                    "url": ps.read_url + '?key=' + cascaId
                  }
                },
                "schema": {
                  "errors": "Errors"
                }
              },
              "dataTextField": "Text",
              "dataValueField": "Value",
              "optionLabel": ps.optionLabel
            }).data('kendoDropDownList');
          } else {
            var prevcascaId = ps.cascaQueue[i - 1];
            if (i === ps.cascaQueue.length - 1) {
              ps.selectQueue[i] = $("#" + id).kendoDropDownList({
                "select": proxy(select, that, cascaId),
                "dataBound": proxy(dataBound, that, cascaId),
                "dataSource": {
                  "transport": {
                    "read": {
                      "url": ps.read_url,
                      "data": proxy(filterData, that, cascaId)
                    }
                  },
                  "serverFiltering": true,
                  "filter": [],
                  "schema": {
                    "errors": "Errors"
                  }
                },
                "dataTextField": "Text",
                "autoBind": false,
                "dataValueField": "Value",
                "optionLabel": ps.optionLabel,
                "cascadeFrom": id + '_' + prevcascaId
              }).data('kendoDropDownList');
            } else {
              ps.selectQueue[i] = $("#" + id + '_' + cascaId).kendoDropDownList({
                "select": proxy(select, that, cascaId),
                "dataBound": proxy(dataBound, that, cascaId),
                "dataSource": {
                  "transport": {
                    "read": {
                      "url": ps.read_url,
                      "data": proxy(filterData, that, cascaId)
                    }
                  },
                  "serverFiltering": true,
                  "filter": [],
                  "schema": {
                    "errors": "Errors"
                  }
                },
                "dataTextField": "Text",
                "autoBind": false,
                "dataValueField": "Value",
                "optionLabel": ps.optionLabel,
                "cascadeFrom": id + '_' + prevcascaId
              }).data('kendoDropDownList');
            }
          }
        }
        $('#' + id).addClass('field-valid-text');
      }

      function getValues() {
        var d = $.Deferred(),
            value = ps.value;
        if (ps.result.length > 0) {
          d.resolve(ps.result);
        } else {
          if (value === 0) {
            for (var i = 0; i < ps.cascaQueue.length - 1; i++) {
              ps.result.push(0);
            }
            d.resolve(ps.result);
          }
          else {
            $.get(ps.get_url, { value: value }, function (res) {
              $.each(res, function (index, item) {
                ps.result.push(item);
              })
              d.resolve(ps.result);
            })
          }
        }
        return d.promise();
      }

      function dataBound(cascaId) {
        var index = $.inArray(cascaId, ps.cascaQueue);
        if (ps.value !== 0) {
          getValues().done(function (values) {
            var value = values[index];
            ps.selectQueue[index].value(value);
            if (index < ps.cascaQueue.length - 1) {
              var nextcascaId = ps.cascaQueue[index + 1];
              ps.selectQueue[index + 1].enable();
              dataBound(nextcascaId);
            }
            clearSelect();
          })
        } else {
          clearSelect();
        }
      }

      function select(cascaId, e) {
        setTimeout(function () {
          clearSelect();
          if (init) {
            form.validate().element('#' + id);
          }
        }, 200);
      }

      function clearSelect() {
        var selector = $('#' + id);
        selector.removeAttr('disabled').removeAttr('style');
        if (selector.val() == '0') {
          selector.val('');
          form.validate().element('#' + id);
        }
      }

      function filterData(cascaId) {
        var index = $.inArray(cascaId, ps.cascaQueue),
            prevselectId = id + '_' + ps.cascaQueue[index - 1];
        return {
          pid: $('#' + prevselectId).val()
        }
      }

      binding();
    }
  });
})(jQuery)