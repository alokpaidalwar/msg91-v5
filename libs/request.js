const http = require('https')

/**
 * Http request
 *
 * @param {Object} options is request options to call msg91 api
 * @param {Promise<PromiseResolveEvent>} resolveP parent promoise - resolve call
 * @param {Promise<PromiseRejectionEvent>} rejectP parent promoise - reject call
 * @return {Promise<Object>}
 */
exports.httpRequest = async (options,resolveP,rejectP) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const chunks = []

      res.on('data', (chunk) => {
        chunks.push(chunk)
      })

      res.on('error', (aReason) => {
        reject(aReason)
      })

      res.on('end', () => {
        const body = Buffer.concat(chunks)
        resolve(JSON.parse(body.toString()))
      })
    })

    if (options.body) {
      req.write(JSON.stringify(options.body))
    }

    req.end()
  }).then((response)=>{
    if (response.type === 'error') {
      if (!response.code) {
        response.code = 201
      }
      rejectP(response)
    }
    resolveP(response)
  }, (response) =>{
      if (!response.code) {
        response.code = 201
      }
      rejectP(response)
    }
  )
}