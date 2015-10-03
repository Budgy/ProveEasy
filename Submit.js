function Submit(){//creates text box with the log inside for the tutorial

//get all xml collected
var xml = xw.flush();

//place it in the box
$("#box").text("Please copy the following into an email and send it to s1034617@sms.ed.ac.uk \n\n"+xml);

//show the box
$("#submitBox").show();

}