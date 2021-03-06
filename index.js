var http = require('http')
var urls = require('./urls.json')
var crypto = require('crypto')

function getHashedIP(req) {
  var timeBlock = Math.round(Date.now() / Math.pow(10, ((1000 * 60 * 60 * 4)+'').length))
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  var hash = crypto.createHash('sha256')
  hash.update(String(process.env.PRIVACY_SEED))
  hash.update(String(timeBlock))
  hash.update(ip)
  return hash.digest('hex').substr(0,24)
}

function redirect(res, dest) {
  if (!dest) {
    // res.statusCode = 404
    // return res.end('not found') // todo: friendlier not found page
    res.statusCode = 301
    res.setHeader('location', 'https://www.civicquarterly.com')
    res.setHeader('Cache-Control', 'public; max-age=900')
    return res.end()
  }

  res.statusCode = 301
  res.setHeader('location', dest)
  res.setHeader('Cache-Control', 'public; max-age=900')
  return res.end()
}


http
  .createServer(function (req, res) {
    var slug = req.url.toLowerCase()
    if (slug[slug.length-1] === '/') {
      slug = slug.substr(0, slug.length - 1)
    }

/*
    if (!slug) {
      // ultimately we might want some helpful
      // disambiguation page, since short urls
      // are possibly typed by hand and prone to error.
      // for now, just redirect to default
      redirect(res)
    }
*/

    redirect(res, urls[slug])
    console.log(JSON.stringify({
      ipHash: getHashedIP(req),
      time: Date.now(),
      slug: slug,
      status: res.statusCode
    }))
  })
  .listen(process.env.PORT || 8888, function (e) {
    if (e) {
      console.error(e)
      process.exit(1)
    }
    console.log(JSON.stringify({
      msg: 'serving ' + Object.keys(urls).length + ' shorturls',
      time: Date.now()
    }))
  })
