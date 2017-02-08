This is a simple tool to send out bulk SMSs to a set of numbers stored in a Google Spreadsheet.

Prerequisites:
1. You need a Google Account.
2. If you want to make an advanced version of this you will need to learn some basics from https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app
3. This script is built to send SMSs to Indian numbers only, but that can easily be changed with a few corrections.

Step 1: Create a Google Spreadsheet - https://drive.google.com/
Step 2: In cell A1, Type "Name of Customer", and in B2, Type "Phone Number". This is just as a guide, you can name it whatever you like. These values in the first row will not affect script execution
Step 2: Click Tools -> Script Editor
Step 3: In the editor that opens up, copy paste the code from sendSMS.gs in this repository.
Step 4: Click File -> Save , Name the file whatever you want.
Step 5: Type or Copy paste your Contact details into the sheet under the respective headings. Names in first column, and Phone Number in the seconds column.
Step 6: Click on SMS in the Menu, then click Send SMS.

Result:
- All successful calls to MSG91 will have a success message in the 4th column correspnding to that row.
- In case the script detects a "Sent" content in the 4th column in the row already, there will be a prompt to confirm if the SMS should be resent
- In case the phone number is not 10 digits, the 4th column will contain a Failure message.

Cheers!
pratheekvk
@pratheek_vk
pratheek.vk@gmail.com