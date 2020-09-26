let HomeController = {
  index: (req, res, next) => {
    return res.render('index', {title: 'Pizzaria DH'})
  }
}

module.exports = HomeController