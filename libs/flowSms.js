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
     * @param {Object} mobileNumbers will list of mobile numbers
     * @param {Object} messagesArg to send it to the users
     * @return {Array} list of message object
     */
    extractMessagesObject(mobileNumbers, messagesArg) {
        const messages = []

        if (messagesArg && messagesArg.length > 0) {
            if (messagesArg instanceof Array) {
                messagesArg.forEach((message) => {
                    message = message.trimEnd()
                    if (message.length > 0) {
                        messages.push(this.createSmsObject(mobileNumbers,message))
                    }
                })
            }else{
                messages.push(this.createSmsObject(mobileNumbers,messagesArg))
            }
        }else {
            throw new Error('Message should not be  null')
        }

        return messages
    },

    createSmsObject(mobileNumbers,messageArgs) {
        const message = {}
        message.message = messageArgs
        message.to = ['9444']
        if (mobileNumbers && mobileNumbers.length > 0) {
            if (mobileNumbers instanceof Array) {
                message.to = mobileNumbers;
            } else if ( mobileNumbers instanceof String && mobileNumbers.includes(',') ) {
                const numberArray = mobileNumbers.split(',')
                numberArray.forEach((aNumber) => {
                 aNumber.trim()
                })
                message.to = mobileNumbers;
            } else {
                message.to = [mobileNumbers];
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