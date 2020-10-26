const cookieConfig = {
  domain: process.env.COOKIE_DOMAIN,
  httpOnly: Boolean(process.env.COOKIE_HTTP_ONLY),
}

export default cookieConfig
