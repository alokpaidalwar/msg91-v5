const http = require('https')

/**
 * calling corresponding
 *
 * @param {Object} options is request option to call msg91 server
 * @return {Promise<Object>}
 */
exports.performRequest = async (options,resolveP,rejectP) => {
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
    resolveP(response)
  }, (response) =>{
      if (!response.code) {
        response.code = 201
      }
      rejectP(response)
    }
  )
}

exports.handleResponse = (response, resolve, rejects) => {
  if (response.type === 'error') {
    if (!response.code) {
      response.code = 201
    }
    rejects(response)
  }

  resolve(response)
}