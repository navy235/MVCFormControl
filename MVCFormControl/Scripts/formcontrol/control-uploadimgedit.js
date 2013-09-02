(function ($) {
  $.extend($.fn, {
    uploadImgEdit:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        default_url: '',
        save_url: '',
        uploadId: 'editattachments',
        remove_url: '',
        crop_url: '',
        imgId: '_img',
        windowId: '_window',
        templateId: '_template',
        cropId: '_crop',
        previewId: '_preview',
        urlId: '_url',
        xId: '_x',
        yId: '_y',
        wId: '_w',
        hId: '_h',
        saveId: '_save',
        targetWidth: 200,
        targetHeight: 200,
        value: ''
      }, setting);

      var that = this,
          jCropApi = null,
          inputfile = $('<input />').attr({
            type: 'file',
            id: ps.uploadId,
            name: ps.uploadId
          }),
          boundx,
          boundy,
          id = that.attr('id');

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

      function binding(imgurl) {
        var _imgurl = ps.value === '' ? ps.default_url : ps.value;
        if (imgurl) {
          _imgurl = imgurl;
        }
        $('#' + id + ps.imgId).attr('src', _imgurl);
      }

      function onError(e) {

      }

      function onSuccess(e) {
        var resData = e.response;
        if (resData.err === '' && resData.status === 'upload') {
          buildEditor(resData.imgname, resData.imgurl);
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

      function buildEditor(imgname, imgurl) {
        var template = $('#' + id + ps.templateId);
        template.find('[name="' + id + ps.urlId + '"]')
        .val(imgurl).end()
        .find('img').attr('src', imgurl);

        if (jCropApi) {
          jCropApi.destroy();
          template.find('img').removeAttr('style').end()
            .find('.jcrop-holder').remove();
        }
        initJcrop();

        $('#' + id + ps.saveId).off('click');
        $('#' + id + ps.saveId).on('click', saveCrop);
      }

      function initJcrop() {
        $('#' + id + ps.cropId).Jcrop({
          bgFade: true,
          bgOpacity: .3,
          aspectRatio: ps.targetWidth / ps.targetHeight,
          boxWidth: 450,
          boxHeight: 400,
          minSize: [ps.targetWidth, ps.targetHeight],
          setSelect: [0, 0, ps.targetWidth, ps.targetHeight],
          onChange: onCropChange,
          onSelect: onCropChange
        }, function () {
          // Use the API to get the real image size
          var bounds = this.getBounds();
          boundx = bounds[0];
          boundy = bounds[1];
          // Store the API in the jcrop_api variable
          jCropApi = this;
          $("#" + id + ps.windowId).data("kendoWindow").center().open();

        });
      }

      function onCropChange(c) {
        $('#' + id + ps.xId).val(c.x);
        $('#' + id + ps.yId).val(c.y);
        $('#' + id + ps.wId).val(c.w);
        $('#' + id + ps.hId).val(c.h);
        if (parseInt(c.w) > 0) {
          var rx = 100 / c.w;
          var ry = 100 / c.h;
          $('#' + id + ps.previewId).css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * c.x) + 'px',
            marginTop: '-' + Math.round(ry * c.y) + 'px'
          });
        }
      }
      function saveCrop() {
        var x = parseInt($('#' + id + ps.xId).val());
        var y = parseInt($('#' + id + ps.yId).val());
        var w = parseInt($('#' + id + ps.wId).val());
        var h = parseInt($('#' + id + ps.hId).val());
        var targetwidth = ps.targetWidth
        var imgurl = $('#' + id + ps.urlId).val();
        $.get(ps.crop_url, {
          imgurl: imgurl,
          width: w,
          height: h,
          x: x,
          y: y,
          targetwidth: targetwidth
        }, function (res) {
          var resData = $.parseJSON(res);
          if (resData.err === '') {
            $('#' + id + ps.windowId).data('kendoWindow').close();
            $('#' + id + ps.imgId).attr('src', resData.imgurl);
            $('#' + id).val(resData.imgurl);
            $('#' + id).parents('form:first').validate().element('#' + id);
          } else {
            alert(resData.err);
          }
        });
      }


      binding();
    }
  });
})(jQuery)
