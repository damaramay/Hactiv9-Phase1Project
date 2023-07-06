//happy coding
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "s3Cur3",
    name: "sessionId",
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "example.com",
      path: "foo/bar",
      expires: expiryDate,
    },
  })
);
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
