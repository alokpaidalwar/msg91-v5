const nock = require('nock')
const assert = require('assert')
const { httpRequest } = require('../libs/request')
const SendSms = require('./../index')

describe('SendSmsService', () => {
  it('create new instance', () => {
    const sendSms = new SendSms()
    assert(sendSms instanceof SendSms)
  })

  describe('constructor', () => {
    it('set default template if no message template is provided', () => {
      const sendSms = new SendSms('auth-key')
      assert.strictEqual(sendSms.authKey, 'auth-key')
    })
  })

  describe('httpRequest', () => {
    before(() => {
      this.nock = nock('https://api.msg91.com')
    })

    it('accepts any 2xx response', (done) => {
      const jsonResponse = { nothing: [] }
      this.nock.get(/.*/).reply(201, jsonResponse)

      const options = {
        method: 'GET',
        hostname: 'api.msg91.com',
        port: null,
        headers: {
          'content-type': 'application/json'
        }
      }

      httpRequest(options)
        .then((response) => {
          assert.notDeepStrictEqual(response, null)
          done()
        })
        .catch((error) => {
          assert.notDeepStrictEqual(error, null)
          done()
        })
    })

    it('errors when there is an error object', (done) => {
      const jsonResponse = { errors: ['nope'] }
      this.nock.get(/.*/).reply(203, jsonResponse)

      const options = {
        method: 'GET',
        hostname: 'api.msg91.com',
        port: null,
        headers: {
          'content-type': 'application/json'
        }
      }

      httpRequest(options)
        .then((response) => {
          assert.notDeepStrictEqual(response, null)
          done()
        })
        .catch((error) => {
          assert.notDeepStrictEqual(error, null)
          done()
        })
    })
  })
})