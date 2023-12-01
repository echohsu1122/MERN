const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/userModel");
module.exports = (passport) => {
  //user 會被存入session，並將id簽名後存在cookie
  //set req.isAuthenticated() is true
  //執行完serializeUser進入callbackURL在進入deserializeUser
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  //deserializeUser 附加一個功能
  //提供將資料設定成req.user
  passport.deserializeUser(async (_id, done) => {
    let user = await User.findOne({ _id });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://mern-api-nu-nine.vercel.app/user/auth/google/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        let foundUser = await User.findOne({ email: profile.emails[0].value });
        if (foundUser) {
          done(null, foundUser);
        } else {
          let newUser = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          });
          let saveUser = await newUser.save();
          done(null, saveUser);
        }
      }
    )
  );
};
