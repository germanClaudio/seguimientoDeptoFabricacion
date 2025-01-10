function cookieExpireTime(req) {
    const cookie = req.session.cookie,
        time = cookie.expires,
        expires = new Date(time)
    return expires
}

const cookie = cookieExpireTime

module.exports = cookie