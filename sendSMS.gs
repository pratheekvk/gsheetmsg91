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
    
    var query = {"mobiles" : sheet.getRange(i,2).getValue(),"message": msg,"sender": "SASTAS","route" : "4","country" : "91"}
    var url = "https://control.msg91.com/api/sendhttp.php?authkey=107712AkqaZ29mqp56efbd26&sender=SASTAS&route=1&country=91&mobiles="+sheet.getRange(i,2).getValue()+"&message=Dear "+sheet.getRange(i,1).getValue()+", Best prices and high quality phone service for your "+sheet.getRange(i,3).getValue()+" only with SastaService. Visit www.sastaservice.com now!";  
    //Browser.msgBox(url)
    url = url.replace("%","\%");
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
  
 // Browser.msgBox("iService Contract Generator", "Please enter all employee details in the respective columns after deleting ALL old data if any. Then click Contracts to generate.", Browser.Buttons.OK);
}