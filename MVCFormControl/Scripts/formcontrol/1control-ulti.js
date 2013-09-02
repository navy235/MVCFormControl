(function ($) {
  $.extend($.fn, {
    uploadImg:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        default_url: '',
        save_url: '',
        uploadId: 'attachments',
        remove_url: '',
        value: ''
      }, setting);
      var that = this;

      var inputfile = $('<input />').attr({
        type: 'file',
        id: ps.uploadId,
        name: ps.uploadId
      });

      that.before(inputfile);

      $('#' + ps.uploadId).kendoUpload({
        "error": onError,
        "success": onSuccess,
        "upload": onUpload,
        "remove": onRemove,
        "localization":
            {
              "cancel": "取消",
              "dropFilesHere": "拖拽要上传文件到此处",
              "remove": "移除",
              "retry": "重试",
              "select": "选择...",
              "statusFailed": "失败",
              "statusUploaded": "已上传",
              "statusUploading": "上传中",
              "uploadSelectedFiles": "上传文件"
            },
        "async": {
          "saveUrl": ps.save_url,
          "autoUpload": true,
          "removeUrl": ps.remove_url
        }
      });

      function binding(imgurl, upload) {
        var _imgurl = ps.value === '' ? ps.default_url : ps.value,
            imgId = that.attr('id') + '_img',
            firstUpload = ps.value === '';
        if (upload) {
          firstUpload = false;
        }
        if (imgurl) {
          _imgurl = imgurl;
        }
        $('#' + imgId).attr('src', _imgurl);
        if (!firstUpload) {
          that.val(_imgurl);
        }
      }

      function onError(e) {

      }

      function onSuccess(e) {
        var resData = e.response;
        if (resData.err === '' && resData.status === 'upload') {
          binding(resData.imgurl, true);
          hideUploadSuccess();
          that.parents('form:first').validate().element('#' + that.attr('id'));
        }
        else {
          if (resData.err === '' && resData.status === 'remove') {
            return;
          } else {
            alert(resData.err);
          }
        }
      }

      function onUpload(e) {
        var files = e.files;
        $.each(files, function () {
          if (".gif.jpg.jpeg.bmp.png".indexOf(this.extension.toLowerCase()) == -1) {
            alert("请上传.gif.jpg.jpeg.bmp.png的图片文件！")
            e.preventDefault();
            return false;
          }
        });
      }

      function onRemove() {
        binding(ps.default_url);
        return false;
      }


      function hideUploadSuccess() {
        var formfield = that.parents('.form-field');
        formfield.find('.k-success').parents('li').hide();
        if (formfield.find('.k-loading').length === 0) {
          formfield.find('.k-upload-files').hide();
        } else {
          formfield.find('.k-upload-files').show();
        }
      }
      binding();
    }
  });

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

  $.extend($.fn, {
    foreignKeyForCheck:
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
        var selectText = $.map($('[name="' + id + ps.checkid + '"]:checked'), function (item) { return $(item).data('text') }).join(',');
        $('#' + id + ps.textid).val(selectText);
        $('#' + id + ps.textid).attr('title', selectText);
        var selectValus = $.map($('[name="' + id + ps.checkid + '"]:checked'), function (item) { return $(item).val() }).join(',');
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
  $.extend($.fn, {
    checkList:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        checkid: '_check'
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

  $.extend($.fn, {
    cascadingSelect:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        cascaQueue: [],
        read_url: '',
        get_url: '',
        optionLabel: '请选择'
      }, setting);

      var that = this;

      var id = that.attr('id');

      var proxy = $.proxy;

      for (var i = 0; i < ps.cascaQueue.length; i++) {
        var cascaId = ps.cascaQueue[i];

        if (i < ps.cascaQueue.length - 1) {
          var input = $('<input/>').addClass('k-valid-text').attr({
            id: id + '_' + cascaId,
            type: "text",
            tabindex: -1
          });
          that.before(input);
        }

        if (i === 0) {
          $("#" + id + '_' + cascaId).kendoDropDownList({
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
          });
        } else {
          var prevcascaId = ps.cascaQueue[i - 1];
          if (i === ps.cascaQueue.length - 1) {
            $("#" + id).kendoDropDownList({
              "select": proxy(select, that, cascaId),
              "dataBound": function (e) {
                console.log(e);
              },
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
            });
          } else {
            $("#" + id + '_' + cascaId).kendoDropDownList({
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
            });
          }
        }
      }

      function getValues() {
        var d = $.Deferred(),
            value = ps.value,
            result = [];
        if (value === 0) {
          for (var i = 0; i < ps.cascaQueue.length; i++) {
            result.push(0);
          }
          d.resolve(result);
        }
        else {
          $.get(ps.get_url, { value: value }, function (res) {
            d.resolve(res);
          })
        }
        return d.promise();
      }

      function dataBound(cascaId) {
        clearSelect();
      }

      function select(cascaId, e) {
        setTimeout(function () {
          clearSelect()
        }, 200);
      }

      function clearSelect() {
        var selector = $('#' + id);
        selector.removeAttr('disabled').removeAttr('style');
        if (selector.val() == '0') {
          selector.val('');
        }
      }

      function filterData(cascaId) {
        var index = $.inArray(cascaId, ps.cascaQueue),
            prevselectId = id + '_' + ps.cascaQueue[index - 1];
        return {
          pid: $('#' + prevselectId).val()
        }
      }

      function binding() {

      }


      binding();
    }
  });


})(jQuery)

