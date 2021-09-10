const axios = require('axios')

class Covid {
  static getDataProv(req, res, next) {
    axios({
      method: 'get',
      url: 'https://data.covid19.go.id/public/api/prov.json'
    })
      .then(({ data }) => {
        res.status(200).json({
          data
        })
      })
      .catch((err) => {
        next(err);
      });
  }

  static getWeekly(req, res, next) {
    axios({
      method: 'get',
      url: 'https://data.covid19.go.id/public/api/update.json',
    })
      .then(({ data }) => {
        let detailData = data.update.harian
        let weekly = []
        detailData.forEach((el, i, arr) => {
          if (i >= arr.length - 6) {
            weekly.push(el)
          }
        });
        res.status(200).json({
          data: weekly
        })
      })
      .catch((err) => {
        next(err)
      })
  }

  static getCovidNews(req, res, next) {
    axios({
      method: 'get',
      url: 'https://newsapi.org/v2/top-headlines?country=id&q=covid',
      headers: {
        Authorization: process.env.API_KEY
      }
    })
      .then(({ data }) => {
        res.status(200).json({
           data: data.articles
        })
      })
      .catch((err) => next(err))
  }
  
  static getCatNews(req, res, next) {
    let { cat } = req.params
    axios({
      method: 'get',
      url: `https://newsapi.org/v2/top-headlines?country=id&category=${cat}`,
      headers: {
        Authorization: process.env.API_KEY
      }
    })
      .then(({ data }) => {
        res.status(200).json({
          data: data.articles
        })
      })
      .catch((err) => next(err))
  }
}

module.exports = Covid