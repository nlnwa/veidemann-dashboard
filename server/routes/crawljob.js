/**
 * Created by kristiana on 11.05.17.
 */
exports.listCrawlJobs = (req, res) => {
  client.listCrawlJobs({}, function (err, response) {
    if (err) {
      console.log("Crawljob:  " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.getCrawlJob = (req, res) => {
  client.listCrawlJobs({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("Crawljob: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.saveCrawlJob = (req, res) => {
  client.saveCrawlJob(req.body, function (err, response) {
    if (err) {
      console.log("Crawljob:  " + err);
      res.status(500);
    }
    else {
      res.status(201).json(response);
    }
  })
};

exports.updateCrawlJob = (req, res) => {
  client.saveCrawlJob(req.body, function (err, response) {
    if (err) {
      console.log("Crawljob:  " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.deleteCrawlJob = (req, res) => {
  client.deleteCrawlJob({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("Crawljob:  " + err);
      res.status(405).json(err);
    }
    else {
      res.status(200).json(req.params.id)
    }
  })
};
