const express = require("express");
const router = express.Router();
const Controller = require("../controllers");

router.get("/", Controller.home);
router.get("/home", Controller.home);

// router.get("/home/admin", Controller.home);
// router.get("/home/user", Controller.home);

router.get("/login", Controller.login);
router.post("/login", Controller.checkLogin);

router.get("/register", Controller.register);
router.post("/register", Controller.renderSaveRegister);

router.get("/profile", Controller.profile);

router.get("/seeAllCourse", Controller.seeAllCourse);
router.get("/seeAllCourse/detail/:id", Controller.seeAllCourse);

router.get("/allCategories", Controller.seeAllCourse);
router.get("/allCategories/edit", Controller.seeAllCourse);
router.get("/allCategories/add", Controller.seeAllCourse);





// router.get("/seeAllCourse/admin", Controller.home);
// router.get("/seeAllCourse/user", Controller.home);

router.get("/contactUs", Controller.contactUs);

module.exports = router;
