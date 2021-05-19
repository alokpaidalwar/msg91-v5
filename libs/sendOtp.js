const { httpRequest } = require('./request');

module.exports = {    
    
    /**
     * Changing the default OTP expiry time value
     *
     * @param {Number} expiryTime time in minutes
     */
    setOTPExpiry(expiryTime) {
        this.otpExpiry = expiryTime;
    },

    /**
     * Setting otp template id
     *
     * @param {String} OTPTemplateId
     */
    setOTPTemplateId(OTPTemplateId) {
        this.otpTemplateId = OTPTemplateId;
    },

     /**
     * Setting DLT id
     *
     * @param {String} dltId
     */
    setDltId(dltId) {
        this.dltId = dltId;
    },


    /**
     * Setting otp length
     *
     * @param {Number} OTPLength
     */
    setOTPLength(OTPLength) {
        this.otpLength = OTPLength;
    },

    /**
     * Generate OTP of the given length and return the random valued OTP
     *
     * @param {number} length max digits of the OTP
     * @return {string} random generated otp value
     */
    generateOTP(length) {
        const lowDigits = Math.pow(10, length - 1)
        const highDigits = 9 * Math.pow(10, length - 1)
        return Math.floor(lowDigits + Math.random() * highDigits).toString()
    },

    /**
     * Construct the otp url path according to option- verify,send,resend
     * @param {string} path is  url path section
     * @param {Object} params is the params to send with the url
     * @return {string} path of the send otp
     **/
    constructOTPRequest(path, params) {
        let sendOTPath = `/api/v5/${path}?authkey=${encodeURIComponent((params.authKey && params.authKey != null ? params.authKey:this.authKey))}`;
      
        Object.keys(params).forEach(key => {
            sendOTPath += `&${key}=${encodeURIComponent(params[key])}`;
        })
        return sendOTPath
    },


    /**
     * Verifying OTP
     *
     * @param {Object} params is parameters in url - Mandatory & Optional both
     * @return {Promise<Object>}
     */
    async verifyOTP(params) {
        return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: 'GET',
                hostname: 'api.msg91.com',
                port: null,
                headers: {}
            }

            options.path = await this.constructOTPRequest('otp/verify', params);
            await httpRequest(options,resolve,reject)
        } catch (error) {
            reject(error)
        }
        })
    },

    /**
     * Retrying OTP
     *
     * @param params is the parameters in url - Mandatory & Optional both
     * @return {Promise<Object>}
     */
    async retryOTP(params) {
        return new Promise(async (resolve, reject) => {
        try {
            const options = {
            method: 'GET',
            hostname: 'api.msg91.com',
            port: null,
            headers: {}
            }

            options.path = this.constructOTPRequest('otp/retry', params)
            await httpRequest(options,resolve,reject)
        } catch (error) {
            reject(error)
        }
        })
    },

    /**
     * Sending OTP to given mobile number
     *
     * @param {Object} params is the parameters Mandatory & Optional both
     * @param {Object} args is  the args of the message i.e variables 
     * @return {Promise<Object>}
     */
    async sendOTP(params,args) {
        return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: 'GET',
                hostname: 'api.msg91.com',
                port: null,
                headers: {
                    'content-type': 'application/json'
                }
            }

            options.path = await this.constructOTPRequest('otp', params)
            options.body = args;
        
            await httpRequest(options,resolve,reject)
        } catch (error) {
            reject(error)
        }
        })
    },

    /**
     * GET BALANCE ACCORDING TO ROUTE
     *
     * @param {Object} params is the parameters Mandatory & Optional both
     * @param {Object} args is  the args of the message i.e variables 
     * @return {Promise<Object>}
     */
    async getBalance(args) {
        return new Promise(async (resolve, reject) => {
        try {
            const options = {
                method: 'GET',
                hostname: 'api.msg91.com',
                port: null,
                headers: {
                    'content-type': 'application/json'
                }
            }

            options.path = `/api/balance.php?authkey=${encodeURIComponent(this.authKey)}&type=${args}`;

            await httpRequest(options,resolve,reject)
        } catch (error) {
            reject(error)
        }
        })
    },
}