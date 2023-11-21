/*Please specify the e-mail address for bulk authorization here
*
* No other changes are required, but if you create a new shared drive, add it to the getFolderList method.
* The shared drive ID is the string after "/folders/" in the shared drive URL.
*/
var ADD_USER_EMAIL_ADDRESS = "example@example.com";

// Private key for service account created with GCP credentials
var PRIVATE_KEY = "YOUR_PRIVATE_KEY";
// Email address of service account created with GCP credentials
var CLIENT_EMAIL = "YOUR_CLIENT_EMAIL";
// API key created with GCP credentials
var API_KEY = 'YOUR_APY-KEY';


function main() {
  var token = getOAthToken();

  // header setting
  var headers = {
    "Authorization": "Bearer " + token,
    "Accept": "application/json",
    "Content-Type": "application/json"
  };

  // get shared drive id list
  var folderList = getFolderList();
  
  folderList.forEach(function(folderId){
    //permission setting
    var newPermission = {
      'type':'user',
      'role':'organizer',
      'emailAddress':ADD_USER_EMAIL_ADDRESS
    };

    // REST API option setting
    var options = {
      'method':'post',
      'headers':headers,
      'muteHttpExceptions':true,
      'payload':JSON.stringify(newPermission)
    };

    // REST API URL(Google Drive API v3)
    var url = 'https://www.googleapis.com/drive/v3/files/' + folderId + '/permissions?sendNotificationEmail=true&supportsAllDrives=true&key=' + API_KEY;
    try {

      // REST API execute
      var response = UrlFetchApp.fetch(url, options);
      var result = JSON.parse(response.getContentText());
      Logger.log('Permission added: ' + result.id);  
    } catch (e) {
      Logger.log('Error adding permission: ' + e.message);
    }
  });
}

/*
* get shared drive id list
*/
function getFolderList(){
  var folderList = [];


  folderList.push('SHEARE_DRIVE_ID_1');

  return folderList;
}

/*
* get OAuth2.0 token
*/
function getOAthToken() {
  //scope setting
  var scope = 'https://www.googleapis.com/auth/drive';
  var jwt = {
    alg:'RS256',
    typ:'JWT'
  };
  var claimSet = {
    iss: CLIENT_EMAIL,
    scope: scope,
    aud: 'https://oauth2.googleapis.com/token',
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000)
  };
  var key = PRIVATE_KEY;
  var encodedJwt = Utilities.base64EncodeWebSafe(JSON.stringify(jwt)) + '.'
                  + Utilities.base64EncodeWebSafe(JSON.stringify(claimSet));
  var signature = Utilities.computeRsaSha256Signature(encodedJwt, key);
  var jwtSigned =  encodedJwt + '.' + Utilities.base64EncodeWebSafe(signature);

  var options = {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    payload: {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwtSigned
    }
  };
  var response = UrlFetchApp.fetch('https://oauth2.googleapis.com/token', options);
  return JSON.parse(response.getContentText()).access_token;
}
