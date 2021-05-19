const BindToClass = require('./libs/bind');
const otpFunctions = require('./libs/sendOtp');
const flowFunctions = require('./libs/flowSms');

class SendSms {
    /**
     * Creates a new SendSms instance
     * @param {String} authKey Authentication key
     */
    constructor(authKey,senderId,routeId) {
        this.authKey = authKey;
        this.sender = senderId;
        this.route = routeId;
        BindToClass(otpFunctions, this);
        BindToClass(flowFunctions, this);
    }

    
}

module.exports = SendSms