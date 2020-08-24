const JWTSECRET = process.env.JWTSECRET;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
  jwtSecret: JWTSECRET,
  mongodburi: `mongodb+srv://user2:pass2@cluster0.hkoyx.mongodb.net/mern-app`,
};
