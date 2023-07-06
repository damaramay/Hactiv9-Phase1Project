const { Category, User, Profile, Course } = require("../models");
const bcrypt = require("bcryptjs");

class Controller {
  static home(req, res) {
    let { isAdmin, isUser, userName } = req.session;
    res.render("home", { userName, isAdmin, isUser });
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
            req.session.userName = userName;
            return res.redirect("/");
          } else {
            req.session.role = null;
            req.session.userId = null;
            req.session.userName = null;
            const error = "Invalid password";
            return res.redirect(`/login?error=${error}`);
          }
        }
        req.session.role = null;
        req.session.userId = null;
        req.session.userName = null;
        const error = `${userName} hasn't registered, Please register first`;
        res.redirect(`/register?error=${error}`);
      })
      .catch((err) => {
        res.send(err.errors.map((el) => el.message));
      });
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) console.log(err);
      else res.redirect("/");
    });
  }

  static register(req, res) {
    const { error } = req.query;
    res.render("register", { error });
  }

  static renderSaveRegister(req, res) {
    let { userName, email, password } = req.body;
    User.create({ userName, email, password })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        let error = err.errors.map((el) => el.message);
        res.redirect(`/register?error=${error}`);
      });
  }

  static profile(req, res) {
    let gender = ["Male", "Female"];
    let { isAdmin, isUser, userId } = req.session;
    if (isAdmin || isUser) {
      Profile.findOne({ where: { userId } })
        .then((data) => {
          if (data) return res.render("profile", { data, gender });
          else return res.redirect("/profile/create");
        })
        .catch((err) => {
          res.send(err.errors.map((el) => el.message));
        });
    } else {
      const error = "Please Login First";
      return res.redirect(`/login?error=${error}`);
    }
  }

  static updateProfile(req, res) {
    let { userId } = req.session;
    let { firstName, lastName, gender } = req.body;
    Profile.create({ firstName, lastName, gender, userId })
      .then(() => {
        res.redirect("/profile");
      })
      .catch((err) => {
        res.send(err.errors.map((el) => el.message));
      });
  }

  static createProfile(req, res) {
    let gender = ["Male", "Female"];
    res.render("create_profile", { gender });
  }

  static saveCreateProfile(req, res) {
    let { userId } = req.session;
    let { firstName, lastName, gender } = req.body;
    Profile.create({ firstName, lastName, gender, userId })
      .then(() => {
        res.redirect("/profile");
      })
      .catch((err) => {
        res.send(err.errors.map((el) => el.message));
      });
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
        res.send(err.errors.map((el) => el.message));
      });
  }

  static userCourse(req, res) {
    res.send("ini your course");
  }

  static contactUs(req, res) {
    res.render("contact-us");
  }
}

module.exports = Controller;
