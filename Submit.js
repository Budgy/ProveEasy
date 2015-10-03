function Submit(){

var xml = xw.flush();

$("#box").text("Please copy the following into an email and send it to s1034617@sms.ed.ac.uk \n\n"+xml);

$("#submitBox").show();



}