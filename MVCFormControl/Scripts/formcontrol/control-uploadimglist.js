(function ($) {
  $.extend($.fn, {
    uploadImgList:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        default_url: '',
        save_url: '',
        uploadId: 'listattachments',
        remove_url: '',
        value: '',
        imgId: '_img',
        listId: '_list',
        templateId: '_template',
        imgUrlId: '_imgurl',
        maxLength: 6
      }, setting);
      var that = this,
          id = that.attr('id'),
          inputfile = $('<input />').attr({
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
        "select": onSelect,
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

      $('#' + id + ps.listId).on('click', 'a.img-item-close', deleteImg);
      $('#' + id + ps.listId).on('click', 'a.img-item-sorter', sorterImg);

      function binding() {
        var _imgurl = ps.value === '' ? ps.default_url : ps.value;
        if (_imgurl !== '') {
          var imgList = _imgurl.split(',');
          for (var i = 0; i < imgList.length; i++) {
            var template = $('#' + id + ps.templateId).clone();
            $('#' + id + ps.listId)
              .append(template
                      .find('[name="' + id + ps.imgUrlId + '"]').val(imgList[i]).end()
                      .find('.' + id + ps.imgId).attr('src', getImgUrl(imgList[i], 120)).end()
                      .show());
          }
        }
      }

      function getImgUrl(imgUrl, size) {
        var url = imgUrl;
        var imgPreUrl = imgUrl.substring(0, imgUrl.lastIndexOf('.'));
        var imgExtesion = imgUrl.substring(imgUrl.lastIndexOf('.'));
        if (size === undefined) {
          size = 0;
        }
        switch (size) {
          case 0:
            break;
          case 120:
            url = imgPreUrl + "_120" + imgExtesion;
            break;
          case 430:
            url = imgPreUrl + "_430" + imgExtesion;
            break;
          case 800:
            url = imgPreUrl + "_800" + imgExtesion;
            break;
          default:
            break;
        }
        return url;
      }

      function onError(e) {

      }

      function onSuccess(e) {
        var resData = e.response;
        var input = $('#' + id);
        if (resData.err === '' && resData.status === 'upload') {
          var template = $('#' + id + ps.templateId).clone();
          $('#' + id + ps.listId)
           .append(template
                   .find('[name="' + id + ps.imgUrlId + '"]').val(resData.imgurl).end()
                   .find('.' + id + ps.imgId).attr('src', getImgUrl(resData.imgurl, 120)).end()
                   .show());
          var inputVal = input.val() === '' ? '' : input.val() + ',';
          inputVal += resData.imgurl;
          input.val(inputVal);
          validate();
          hideUploadSuccess();
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

      function onSelect(e) {
        var files = e.files;
        var input = $('#' + id);
        var hasLength = input.val() === '' ? 0 : input.val().split(',').length;
        if ((e.files.length + hasLength) > ps.maxLength) {
          alert("最多上传" + ps.maxLength
              + "张图片!当前已经上传"
              + hasLength + "张");
          e.preventDefault();
          return false;
        }
      }

      function deleteImg(e) {
        var $target = $(e.target),
            $imgitem = $target.parents('.img-item'),
            index = $imgitem.index(),
            inputVals = $('#' + id).val().split(',');
        inputVals.splice(index, 1);
        $('#' + id).val(inputVals.join(','));
        $imgitem.remove();
        validate();
      }


      function sorterImg(e) {
        var $target = $(e.target),
            direction = $target.data('direction'),
            $imgboxlist = $("#" + id + ps.listId),
            $imgitem = $target.parents('.img-item'),
            index = $imgitem.index(),
            $imgitems = $imgboxlist.find('.img-item'),
            length = $imgitems.size();
        if ((direction === 'right' && index === length - 1) || (direction === 'left' && index === 0)) {
          return false;
        } else {
          if (direction === 'right') {
            $imgitem.insertAfter($imgitems.eq(index + 1));
          } else if (direction === 'left') {
            $imgitem.insertBefore($imgitems.eq(index - 1));
          }
          sortValue();
        }
      }

      function sortValue() {
        var $imgboxlist = $("#" + id + ps.listId),
            $imgInputs = $imgboxlist.find('[name="' + id + ps.imgUrlId + '"]'),
            inputVals = $.map($imgInputs, function (item) {
              return $(item).val();
            });
        $('#' + id).val(inputVals.join(','));
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

      function validate() {
        $('#' + id).parents('form:first').validate().element('#' + id);
      }

      binding();
    }
  });
})(jQuery)
