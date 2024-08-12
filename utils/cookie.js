function cookieExpireTime(req) {
    const cookie = req.session.cookie
    const time = cookie.expires
    const expires = new Date(time)
    return expires
}

const cookie = cookieExpireTime

module.exports = cookie