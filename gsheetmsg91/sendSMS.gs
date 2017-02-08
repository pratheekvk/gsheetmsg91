function sendSMS() 
{
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SendSMS");
  var numRows = sheet.getLastRow();
  var i = 0;
  for(i = 2;i<= numRows;i++)
  {
    if(String(sheet.getRange(i,2).getValue()).length != 10)
    {
        sheet.getRange(i,4).setValue("Message sending failed. Invalid phone number."); 
        SpreadsheetApp.flush()
        continue;
    }
    if(sheet.getRange(i,4).getValue()=="Sent")
    if(Browser.msgBox("Row "+i+". This message seems to have been sent already. Click Ok to send anyway, or click Cancel to abort sending to this contact.", Browser.Buttons.OK_CANCEL)=='cancel')
    {
        sheet.getRange(i,5).setValue("Cancelled by User.");
      SpreadsheetApp.flush()  
      continue;
    }
    else sheet.getRange(i,5).setValue("Resent")
    
    var msg = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Message Template").getRange(1,1).getValue();
    msg = msg.replace("fieldName",sheet.getRange(i,1).getValue());
    msg = msg.replace("fieldDev",sheet.getRange(i,3).getValue());
    //Browser.msgBox(msg);
    sheet.getRange(i,4).setValue("Sending")
    var authkey = "TypeYourAuthKeyHere"
    var senderid = "ABCDEF" //Type your chosen 6 character Sender Id here
    var url = "https://control.msg91.com/api/sendhttp.php?authkey="+authkey+"&sender="+senderid+"&route=1&country=91&mobiles="+sheet.getRange(i,2).getValue()+"&message=Dear "+sheet.getRange(i,1).getValue()+", Type rest of your message here.";  
    //Browser.msgBox(url)
    Logger.log("Making request to "+url);
    var response = UrlFetchApp.fetch(url);
    Logger.log(response);
    sheet.getRange(i,4).setValue("Sent");
  }
}

function onOpen() 
{
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Send Messages", functionName: "sendSMS"}];
  ss.addMenu("SMS", menuEntries);
}