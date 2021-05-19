const { httpRequest } = require('./request');

module.exports = {    
    
    /**
     * Changing the default OTP expiry time value
     *
     * @param {Number} expiryTime time in minutes
     */
    setSenderId(senderId) {
        this.sender = senderId;
    },

    /**
     * Changing the default OTP expiry time value
     *
     * @param {Number} expiryTime time in minutes
     */
    setRoute(routeId) {
        this.route = routeId;
    },

    
    /**
     * @param {Object} aMobileNumbers will list of mobile numbers
     * @param {Object} aMessages to send it to the users
     * @return {Array} list of message object
     */
    extractMessagesObject(aMobileNumbers, aMessages) {
        const messages = []

        if (aMessages && aMessages.length > 0) {
            if (aMessages instanceof Array) {
                aMessages.forEach((message) => {
                    message = message.trimEnd()
                    if (message.length > 0) {
                        messages.push(this.extractedMessage(message, aMobileNumbers))
                    }
                })
            }else{
                messages.push(this.extractedMessage(aMessages, aMobileNumbers))
            }
        }else {
            throw new Error('Message should not be  null')
        }

        return messages
    },

    extractedMessage(aMessage, aMobileNumbers) {
        const message = {}
        message.message = aMessage
        message.to = ['9444']
        if (aMobileNumbers && aMobileNumbers.length > 0) {
            if (aMobileNumbers instanceof Array) {
                message.to = aMobileNumbers;
            } else if ( aMobileNumbers instanceof String && aMobileNumbers.includes(',') ) {
                const numberArray = aMobileNumbers.split(',')
                numberArray.forEach((aNumber) => {
                 aNumber.trim()
                })
                message.to = aMobileNumbers;
            } else {
                message.to = [aMobileNumbers];
            }
        } else {
            throw new Error('Mobile numbers should not be  null')
        }
        return message
    },

    /**
     * Sending OTP to given mobile number
     *
     * @param {Object} params is the parameters Mandatory & Optional both
     * @param {Object} args is  the args of the message i.e variables 
     * @return {Promise<Object>}
     */
    async sendSms(args) {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: 'POST',
                    hostname: 'api.msg91.com',
                    path: '/api/v2/sendsms',
                    port: null,
                    headers: {
                        authkey: this.authKey,
                        'content-type': 'application/json'
                      },
                }
                if(args && !args.route){
                    args.route = this.route;
                }
                if(args && !args.sender){
                    args.sender = this.sender;
                }
                const messageArray = this.extractMessagesObject(args.mobiles, args.message)
          
                if (!messageArray || messageArray.length === 0) {
                    reject('Message object should not null or empty')
                }
                args.sms = messageArray;
                delete args.message;
                delete args.mobiles;
                options.body = args;
                await httpRequest(options,resolve,reject)
            } catch (error) {
                reject(error)
            }
        })
    },
}