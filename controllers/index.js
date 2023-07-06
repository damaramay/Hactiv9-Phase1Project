const { Category, User, Profile, Course } = require("../models");

class Controller {
  static home(req, res) {
    res.render("home");
  }

  static login(req, res) {
    res.render("login");
  }

  static checkLogin(req, res) {
    let { userName, password } = req.body;
    User.findOne({ where: { userName, password } })
      .then((data) => {
        if (data === null) return res.redirect("/login");
        res.send(data);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static register(req, res) {
    res.render("register");
  }

  static renderSaveRegister(req, res) {
    let { userName, email, password, firstName, lastName, gender } = req.body;
    User.create({ userName, email, password })
      .then(() => {
        return User.findOne({ where: { userName } });
      })
      .then((data) => {
        let userId = data.dataValues.id;
        return Profile.create({ firstName, lastName, gender, userId });
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static profile(req, res) {
    res.render("profile");
  }

  static seeAllCourse(req, res) {
    res.render("see-all-course");
  }

  static contactUs(req, res) {
    res.render("contact-us");
  }
}

module.exports = Controller;
