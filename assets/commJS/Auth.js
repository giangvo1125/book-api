var IeVer = (function() {
  var undef, v = 3,
    div = document.createElement('div'),
    all = div.getElementsByTagName('i');
  while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
  return v > 4 ? v : undef;
}());

function fxn(e, f) {
  if (e.keyCode == 13) {
    if (f == "D") {
      return callSubmit('', 'D');
    } else {
      if (!checkValidationCode())
        return false;
    }
  }
}

function checkValidationCode() {
  var codeobj;
  codeobj = document.getElementById('txtCode');
  if (codeobj.value == '') {
    codeobj.focus();
    alert(error_validation);
    return false;
  }
  var jData = new Object();
  jData.txtCode = $("#txtCode").val();
  $.ajax({
    url: "checkValidateLogin.ashx",
    async: false,
    cache: false,
    type: "GET",
    dataType: "json",
    data: {
      txtCode: jData.txtCode
    },
    success: function(data) {
      var vFlg = data['ValidateCheck'];
      if (vFlg == false) {
        alert(data['Msg'].replace("\\n", "\n"));
        $('#validateCode_href').click();
        CodeReset();
        return false;
      } else {
        return callSubmit('', 'V');
      }
    }
  });
}

function getloginCode() {
  var result = "";
  $.ajax({
    url: "getBeforeLoginCode.ashx",
    async: false,
    cache: false,
    type: "GET",
    success: function(data) {
      if (data != "") {
        result = data;
      }
    }
  });
  $("#txtCode").val(result);
}

function callSubmit(BDValue, f) {
  var idobj;
  var CFSKey;
  var EnCryptData;
  var pwobj;
  var codeobj;
  var hidubmit;
  idobj = document.getElementById('txtID');
  if (idobj.value == '' || idobj.value == unlabel) {
    idobj.focus();
    alert(error_username);
    return false;
  }
  pwobj = document.getElementById('txtPW');
  if (pwobj.value == '' || pwobj.value == pwlabel) {
    pwobj.focus();
    alert(error_password);
    return false;
  }
  var query = $('#txtCode');
  var isVisible = query.is(':visible');
  if (isVisible === true) {} else {
    getloginCode();
  }
  codeobj = document.getElementById('txtCode');
  if (codeobj.value == '') {
    codeobj.focus();
    alert(error_validation);
    return false;
  }
  if (f == 'D' || f == 'O') {
    CFSKey = CFS(pwobj.value);
    EnCryptData = CFSKey + codeobj.value;
    pwobj.value = MD5(EnCryptData);
  }
  hidubmit = document.getElementById('hidubmit');
  if (hidubmit != null) {
    hidubmit.value = BDValue;
  }
  if (IeVer != undefined && document.getElementById('IEVerison') != null) {
    document.getElementById('IEVerison').value = IeVer;
  }
  document.frmLogin.submit();
  return false;
}
