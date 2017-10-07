
function ping(url,callBack,async)
{var requestTime;$.ajax({url:url,type:"GET",dataType:"jsonp",timeout:5000,cache:false,async:async,beforeSend:function(){requestTime=new Date().getTime();},complete:function(jqXHR,textStatus){var responseTime=new Date().getTime();var ackTime=responseTime-requestTime;var status;if(textStatus=="parsererror"){status="success";}
else{status=textStatus;}
callBack({url:url,ackTime:ackTime,status:status});}});};