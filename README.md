# Msg91 [![NPM version](https://img.shields.io/npm/v/msg91-v5.svg?style=flat)](https://www.npmjs.com/package/msg91-v5) [![NPM monthly downloads](https://img.shields.io/npm/dm/msg91-v5.svg?style=flat)](https://npmjs.org/package/msg91-v5) [![NPM total downloads](https://img.shields.io/npm/dt/msg91-v5.svg?style=flat)](https://npmjs.org/package/msg91-v5)
Its msg91 package with latest api's of msg91 including DLT ID i.e v5  for sending otp via sendOtp,sms via flow api,whatsapp and many more.
> Note: It also supports latest dlt id as parameter in api i.e DLT_TE_ID

> Note: Send Sms via flow and whatsapp api is work in progess (WIP)


# Msg91-v5 Installation

```javascript 
npm i msg91-v5
```

# Msg91 Integration

### Initialization 
```javascript
const msg91 = new (require('msg91-v5'))("Auth Key");
```
## Send SMS via api v2 of msg91

Sending sms to many messages to many mobiles using msg91 v2 api

```javascript
const msg91 = new (require('msg91-v5'))('Auth Key','Sender id','route id');

const mobileNumbers = ["9194XXXX87XX", "88XXXX67XX", "77XXXX44XX"];
//OR
const mobileNumbers = "9194XXXX87XX,88XXXX67XX,77XXXX44XX";
//OR
const mobileNumbers = "88XXXX67XX";

const messages = ["Your order is placed.Thank You.", "Your order will be shipped tomorrow."]; 
//OR
const messages = "Your order is placed.Thank You.";

const options = {
    mobiles: mobileNumbers,// Mandatory param along with country dial code
    DLT_TE_ID: '540XXXXXXX1057XX', //Mandatory if applicable
    message : messages //Mandatory
}
msg91.sendSMS(options).then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})

```

### Send OTP

```javascript

// List of variable with the same name defind in msg sendOtp API
const params = {
    template_id: "VAL", // (Mandatory) You will get it from MSG91 panel
    mobile: "VAL", // (Mandatory)  Keep number in international format with country code  
    authkey: "VAL", // (Optional) Auth Key - if added then it will use this key for the particular api call else it will use default key i.e added when creating msg91 object
    invisible: "VAL", //(Optional) For MOBILE APP only (do not use for Browsers); 1 for ON, 0 for OFF; Mobile Number Automatically Verified if its Mobile Network is ON
    otp: "VAL", //(Optional) OTP you want to send
    invisible: "VAL", // Optional | Description: For MOBILE APP only (do not use for Browsers); 1 for ON, 0 for OFF; Mobile Number Automatically Verified if its Mobile Network is ON
    userip: "VAL", //(Optional) Description: User IP
    email: "VAL", //(Optional) Description: Email ID on which you want to send OTP
    otp_length: "VAL", //(Optional) Description: Number of digits in OTP (default : 4, min : 4, max : 9)
    userip: "VAL", //(Optional) Description: User IP
    otp_expiry: "VAL", //(Optional) Description: Expiry of OTP to verify, in minutes (default : 1 day, min : 1 minute)
    unicode: "VAL", //(Optional) Description: Enter 1 if sending SMS in languages other than English, for english pass 0
}

const args = {
  "Value1": "Param1",
  "Value2": "Param2",
  "Value3": "Param3"
};

msg91.sendOTP(params,args).then(() => {
    //Handle success
}).catch(() => {
    //Handle failure
})
```

### Verify OTP - This can be used to verify the OTP.

```javascript

const params = {
   mobile: "VAL", // (Mandatory)  Keep number in international format with country code  
   authkey: "VAL", // (Optional) Auth Key - if added then it will use this key for the particular api call else it will use default key i.e added when creating msg91 object
   otp: "VAL", //(Optional) OTP you want to send
   otp_expiry: "VAL" //(Optional) Expiry time to verify an OTP (default time 10 mins). Mandatory to pass if you pass an expiry time in Send OTP API
}

msg91.verifyOTP(params).then(() => {
    //Handle success
}).catch(() => {
    //Handle failure
})
```

### Resend OTP - This can be used to resend the same OTP again to a defined mobile number, resend request can be attempted with both the voice call or text message.

```javascript
const params = {
   mobile: "VAL", // (Mandatory)  Keep number in international format with country code  
   authkey: "VAL", // (Optional) Auth Key - if added then it will use this key for the particular api call else it will use default key i.e added when creating msg91 object
   retrytype: "VAL", //Description: Default - Voice, For text it should be text
}

msg91.retryOTP(params).then(() => {
    //Handle success
}).catch(() => {
    //Handle failure
})

```

 
### Checking balance according route type

```javascript
msg91.getBalance("ROUTE_ID").then(() => {
//Handle success result
}).catch(() => {
//Handle failure result
})
```