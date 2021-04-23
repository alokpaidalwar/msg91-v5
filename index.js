const { performRequest, handleResponse } = require('./libs/request')

class SendSms {
    /**
     * Creates a new SendOtp instance to handle OTP message handling of the MSG91 services
     * @param {String} aAuthKey Authentication key
     */
    constructor(authKey) {
        this.authKey = authKey;
    }

    /**
     * Changing the default OTP expiry time value
     *
     * @param {Number} ExpiryTime which will set the time in minutes
     */
    setOTPExpiry(expiryTime) {
        this.otpExpiry = expiryTime;
    }

    /**
     * Setting otp template value to replace the given text
     *
     * @param {String} OTPTemplateId which will set the time in minutes
     */
    setOTPTemplateId(OTPTemplateId) {
        this.otpTemplateId = OTPTemplateId;
    }

    /**
     * Setting otp generation max digits value
     *
     * @param {Number} OTPLength which will set the time in minutes
     */
    setOTPLength(OTPLength) {
        this.otpLength = OTPLength;
    }

    /**
     * Generate OTP for the max digits and giving the random values
     *
     * @param {number} lenght max digits of the OTP
     * @return {string} random generated otp value
     */
    generateOTP(length) {
        if (length < 4) {
         console.log(
            'OTP length must be greater than 4 to avoid security breaches.'
         )
        }

        const lowDigits = Math.pow(10, length - 1)
        const highDigits = 9 * Math.pow(10, length - 1)
        return Math.floor(lowDigits + Math.random() * highDigits).toString()
    }

    /**
     * @param {SendOtpService} sendOtpS
     * @param {Object} aOptions will contain the params to verify
     * @return {string} path of the send otp
     **/
    constructRetryOTPRequest(aOptions) {
        let sendOTPath = `/api/v5/otp/retry?authkey=${encodeURIComponent(
        sendOtpS.authKey
        )}`

        if (aOptions.mobile && aOptions.mobile.length > 0) {
        if (aOptions.mobile.length > 10) {
            sendOTPath += `&mobile=${aOptions.mobile}`
        } else {
            throw new Error('mobile number is not having the country dial code')
        }
        } else {
        throw new Error('mobile number should not be null')
        }

        if (
        aOptions.retryType &&
        aOptions.retryType.length > 0 &&
        ['voice', 'text'].includes(aOptions.retryType)
        ) {
        sendOTPath += `&retrytype=${aOptions.retryType}`
        } else {
        sendOTPath += '&retrytype=text'
        }

        return sendOTPath
    }

    /**
     * @param {SendOtpService} sendOtpS
     * @param {Object} aOptions will contain the params to verify
     * @return {string} path of the send otp
     **/
    constructVerifyOTPRequest(sendOtpS, aOptions) {
        let sendOTPath = `/api/v5/otp/verify?authkey=${encodeURIComponent(
        sendOtpS.authKey
        )}`

        if (aOptions.otp && aOptions.otp > 0) {
        sendOTPath += `&otp=${aOptions.otp}`
        } else {
        throw new Error('otp should not be null')
        }

        if (aOptions.mobile && aOptions.mobile.length > 0) {
        if (aOptions.mobile.length > 10) {
            sendOTPath += `&mobile=${aOptions.mobile}`
        } else {
            throw new Error('mobile number is not having the country dial code')
        }
        } else {
        throw new Error('mobile number should not be null')
        }

        return sendOTPath
    }


    constructImportantOTPParams(aOptions, sendOTPath, sendOtpS) {
        if (aOptions.mobile && aOptions.mobile.length > 0) {
        sendOTPath += `&mobile=${aOptions.mobile}`
        }

        if (
        sendOtpS.otpTemplateId &&
        sendOtpS.otpTemplateId.length > 0
        ) {
        sendOTPath += `&template_id=${encodeURIComponent(
            sendOtpS.otpTemplateId
        )}`
        }
        return sendOTPath
    }

    /**
     * @param {SendOtpService} sendOtpS
     * @param {Object} aOptions will contain the params to send
     * @return {string} path of the send otp
     **/
     constructSendOTPRequest(path, params) {
        let sendOTPath = `/api/v5/${path}?authkey=${encodeURIComponent(this.authKey)}`;
      
        Object.keys(params).forEach(key => {
            sendOTPath += `&${key}=${encodeURIComponent(params[key])}`;
        })
        return sendOTPath
    }

    /**
     * Sending OTP message to the users
     *
     * @param aOptions will contain the information about the phone number, template id, otp
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

            options.path = this.constructSendOTPRequest('otp', params)
            options.body = args;
         
            await performRequest(options,resolve,reject)
            //handleResponse(response, resolve, reject)
        } catch (error) {
            reject(error)
        }
        })
    }

    /**
     * Verifying OTP message to the users
     *
     * @param aOptions will contain the information about the phone number, template id, otp
     * @return {Promise<Object>}
     */
    async verifyOTP(aOptions) {
        return new Promise(async (resolve, reject) => {
        try {
            const options = {
            method: 'POST',
            hostname: 'api.msg91.com',
            port: null,
            headers: {}
            }

            options.path = this.constructVerifyOTPRequest(this, aOptions)
            const response = await performRequest(options)
           // handleResponse(response, resolve, reject)
        } catch (error) {
            reject(error)
        }
        })
    }

    /**
     * Retrying OTP message to the user
     *
     * @param aOptions will contain the information about the phone number, template id, otp
     * @return {Promise<Object>}
     */
    async retryOTP(aOptions) {
        return new Promise(async (resolve, reject) => {
        try {
            const options = {
            method: 'POST',
            hostname: 'api.msg91.com',
            port: null,
            headers: {}
            }

            options.path = this.constructRetryOTPRequest(this, aOptions)
            const response = await performRequest(options)
           // handleResponse(response, resolve, reject)
        } catch (error) {
            reject(error)
        }
        })
    }
}

module.exports = SendSms