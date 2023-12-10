function homePageEjsLoader() {
    return function (req, res, next) {
      res.render("test");
      next();
    };
  }

module.exports =  homePageEjsLoader;