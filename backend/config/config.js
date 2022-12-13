const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/messenger92",
  mailHost: process.env.MAIL_HOST || "smtp.gmail.com",
  mailPort: process.env.MAIL_PORT || "465",
  mailUser: process.env.MAIL_USER || "konedangui@gmail.com",
  mailPass: process.env.MAIL_PASS || "uwhqchasujnuxabc",
  mailAdress: process.env.MAIL_EMAIL || "konedangui@gmail.com",
};

module.exports = config;
