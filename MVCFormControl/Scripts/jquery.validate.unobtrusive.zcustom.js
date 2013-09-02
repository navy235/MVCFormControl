jQuery.validator.unobtrusive.adapters.add("dategreaterthan", ['compareto'],
    function(options) {
      options.rules['dategreaterthan'] = {
        compareto: options.params.compareto
      };
      options.messages['dategreaterthan'] = options.message;
    }
);

jQuery.validator.addMethod("dategreaterthan", function(value, element, params) {
  var selfDate, compareToData;
  if ($(element)) {
    selfDate = new Date($(element).val());
  }
  if (params.compareto) {
    compareToData = new Date($('#' + params.compareto).val());
  }
  return selfDate > compareToData;
});

/**********
*
*requirewith 验证某个值两者必填其一
*
***********/

jQuery.validator.unobtrusive.adapters.add("requirewith", ['requireto'],
    function(options) {
      options.rules['requirewith'] = {
        requireto: options.params.requireto
      };
      options.messages['requirewith'] = options.message;
    }
);

jQuery.validator.addMethod("requirewith", function(value, element, params) {
  var thisValue, targetValue;
  if ($(element)) {
    thisValue = $(element).val();
  }
  if (params.requireto) {
    targetValue = $('#' + params.requireto).val();
  }
  return targetValue !== '' || thisValue !== '';
});

/**********
*
*cascaderequire 当前值为true时，cascadeto的element必须填写
*
***********/

jQuery.validator.unobtrusive.adapters.add("cascaderequire", ['cascadeto', 'cascadeclass'],
    function(options) {
      options.rules['cascaderequire'] = {
        cascadeto: options.params.cascadeto,
        cascadeclass: options.params.cascadeclass
      };
      options.messages['cascaderequire'] = options.message;
    }
);

jQuery.validator.addMethod("cascaderequire", function(value, element, params) {
  var thisValue, targetValue;
  if ($(element)) {
    thisValue = $(element).val() === 'true';
  }
  if (params.cascadeto) {
    targetValue = $('#' + params.cascadeto).val();
  }
  if (thisValue) {
    $('.form-field-' + params.cascadeclass).show();
  } else {
    $('.form-field-' + params.cascadeclass).hide();
  }
  return !thisValue || (targetValue !== '' && thisValue);
});

/**********
*
*cascadeback 当前值验证时 backto cascade
*
***********/

jQuery.validator.unobtrusive.adapters.add("timequantum", [],
    function(options) {
      options.rules['timequantum'] = {
      };
      options.messages['timequantum'] = options.message;
    }
);

jQuery.validator.addMethod("timequantum", function(value, element, params) {
  var thisValue;
  if ($(element)) {
    thisValue = $(element).val();
  }
  var values = thisValue.split('|');
  var isCheck = true;
  $.each(values, function(index, item) {
    if (item === '') {
      isCheck = false;
    }
  })
  return isCheck;
});




/**********
*
*checkmaxlength 验证最多check的个数
*
***********/

jQuery.validator.unobtrusive.adapters.add("checkmaxlength", ['maxlength'],
    function(options) {
      options.rules['checkmaxlength'] = {
        maxlength: options.params.maxlength
      };
      options.messages['checkmaxlength'] = options.message;
    }
);
jQuery.validator.addMethod("checkmaxlength", function(value, element, params) {
  var checkvalues = [];
  checkvalues = $.map($('[name="' + element.id + '_check"]:checked'), function(item) { return $(item).val() });
  return params.maxlength >= checkvalues.length;
});



/**********
*
*checkstringlength 中文占2个字符
*
***********/



jQuery.validator.unobtrusive.adapters.add("stringchecklength", ['minlength', 'maxlength'],
    function(options) {
      options.rules['stringchecklength'] = {
        minlength: options.params.minlength,
        maxlength: options.params.maxlength
      };
      options.messages['stringchecklength'] = options.message;
    }
);

jQuery.validator.addMethod('stringchecklength', function(value, element, params) {
  var stringlength = 0;
  var strArray = value.split('');
  for (var i = 0; i < strArray.length; i++) {
    if (strArray[i].charCodeAt(0) < 299) {
      stringlength++;
    } else {
      stringlength += 2;
    }
  }
  return stringlength <= params.maxlength && stringlength >= params.minlength;
});


jQuery.validator.unobtrusive.adapters.add("checkarea", [],
    function(options) {
      options.rules['checkarea'] = {
      };
      options.messages['checkarea'] = options.message;
    }
);



jQuery.validator.addMethod("checkarea", function(value, element, params) {
  var thisValue;
  if ($(element)) {
    thisValue = $(element).val();
  }
  var values = thisValue.split('|');
  if (values.length < 3) {
    return false;
  } else {
    var isCheck = true;
    $.each(values, function(index, item) {
      if (parseFloat(item) <= 0) {
        isCheck = false;
      }
    })
    return isCheck;
  }
});


jQuery.validator.unobtrusive.adapters.add("checkcontact", [],
    function(options) {
      options.rules['checkcontact'] = {
      };
      options.messages['checkcontact'] = options.message;
    }
);

jQuery.validator.addMethod("checkcontact", function(value, element, params) {
  var regText = /[\u4e00-\u9fa5]/
  reg = new RegExp(regText),
  result = false;
  if (!reg.test(value)) {
    return false;
  } else {
    regText = /([0-9\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u58f9\u8d30\u53c1\u8086\u4f0d\u9646\u67d2\u634c\u7396]{7})/;
    reg = new RegExp(regText);
    result = reg.test(value);
    if (result) {
      return false;
    } else {
      regText = /(([q\uff51Q\uff31]+)(.?|.{1,5})(([0-9]|[\uff10-\uff19]|[\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]|[\u2460-\u2468]|[\u3220-\u3228])[-_@\~\#\$\%\^\&\*]*){5,13})|((([0-9]|[\uff10-\uff19]|[\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]|[\u2460-\u2468]|[\u3220-\u3228])[-_@\~\#\$\%\^\&\*]*){5,13}(.?|.{1,5})([q\uff51Q\uff31]+))/;
      reg = new RegExp(regText);
      result = !reg.test(value);
    }
  }
  return result;
});