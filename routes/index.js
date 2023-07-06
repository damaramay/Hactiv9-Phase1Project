const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.use(function (req, res, next) {
  let isAdmin;
  let isUser;

  let { role } = req.session;

  role === "admin" ? (isAdmin = true) : (isAdmin = false);
  role === "user" ? (isUser = true) : (isUser = false);
  req.session.isAdmin = isAdmin;
  req.session.isUser = isUser;
  // console.log(isAdmin, isUser);
  next();
});

router.get("/", Controller.home);
router.get("/home", Controller.home);

// router.get("/home/admin", Controller.home);
// router.get("/home/user", Controller.home);

router.get("/register", Controller.register);
router.post("/register", Controller.renderSaveRegister);

router.get("/login", Controller.login);
router.post("/login", Controller.checkLogin);

router.get("/profile", Controller.profile);
router.post("/profile", Controller.updateProfile);

router.get("/profile/create", Controller.createProfile);
router.post("/profile/create", Controller.saveCreateProfile);

router.get("/logout", Controller.logout);

router.get("/seeAllCourse", Controller.seeAllCourse);

router.get("/userCourse", Controller.userCourse);

// router.get("/seeAllCourse/admin", Controller.home);
// router.get("/seeAllCourse/user", Controller.home);

router.get("/contactUs", Controller.contactUs);

module.exports = router;
