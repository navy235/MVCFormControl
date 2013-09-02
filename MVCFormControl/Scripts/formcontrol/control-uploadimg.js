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
})(jQuery)
