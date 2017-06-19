/**
 * Created by kristiana on 11.05.17.
 */
exports.listCrawlConfigs = (req, res) => {
  client.listCrawlConfigs({}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.getCrawlConfig = (req, res) => {
  client.listCrawlConfigs({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.saveCrawlConfig = (req, res) => {
  client.saveCrawlConfig(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(201).json(response);
    }
  })
};

exports.updateCrawlConfig = (req, res) => {
  client.saveCrawlConfig(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {

    }
  })
};

exports.deleteCrawlConfig = (req, res) => {
  client.saveCrawlConfig({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {

    }
  })
};
