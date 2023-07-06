const { Category, User, Profile, Course } = require("../models");
const bcrypt = require("bcryptjs");

class Controller {
  static home(req, res) {
    let { isAdmin, isUser, userId } = req.session;
    Profile.findOne({ where: { userId } })
      .then((data) => {
        res.render("home", { data, isAdmin, isUser });
      })
      .catch((err) => res.send(err));
  }

  static login(req, res) {
    const { error } = req.query;
    res.render("login", { error });
  }

  static checkLogin(req, res) {
    let { userName, password } = req.body;
    User.findOne({ where: { userName } })
      .then((data) => {
        if (data) {
          const isPasswordValid = bcrypt.compareSync(password, data.password);
          if (isPasswordValid) {
            req.session.role = data.dataValues.role;
            req.session.userId = data.dataValues.id;
            return res.redirect("/");
          } else {
            req.session.role = null;
            req.session.userId = null;
            const error = "Invalid password";
            return res.redirect(`/login?error=${error}`);
          }
        }
        req.session.role = null;
        req.session.userId = null;
        const error = `${userName} hasn't registered, Please register first`;
        res.redirect(`/register?error=${error}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static register(req, res) {
    const { error } = req.query;
    res.render("register", { error });
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
    let { isAdmin, isUser, userId } = req.session;
    if (isAdmin || isUser) {
      Profile.findOne({ where: { userId } })
        .then((data) => {
          console.log(data);
          return res.render("profile", { data });
        })
        .catch((err) => {
          res.send(err);
        });
    } else {
      const error = "Please Login First";
      return res.redirect(`/login?error=${error}`);
    }
    // isAdmin || isUser ? res.render("profile") : res.redirect("/login");
    // res.render("profile");
  }

  static seeAllCourse(req, res) {
    let { isAdmin, isUser } = req.session;
    Course.findAll({
      attributes: ["name"],
      include: { model: Category, attributes: ["name"] },
    })
      .then((data) => {
        res.send(data);
        // res.render("see_all_course", { isAdmin, isUser, data });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static userCourse(req, res) {
    res.send('ini your course')
  }

  static contactUs(req, res) {
    res.render("contact-us");
  }
}

module.exports = Controller;
