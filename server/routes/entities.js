exports.listCrawlEntities = (req, res) => {
  client.listCrawlEntities({}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.getCrawlEntities = (req, res) => {
  client.listCrawlEntities({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

///skrot
exports.saveCrawlEntities = (req, res) => {
  console.log(req.body.labels);
  client.saveEntity({
    meta: {
      name: req.body.name,
      description: req.body.description,
      label: req.body.labels
    }
  }, function (err, response) {
    console.log(response);
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(201).json(response);
    }
  });
};

exports.updateCrawlEntities = (req, res) => {
  client.saveEntity(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {

    }
  })
};

exports.deleteCrawlEntities = (req, res) => {
  client.deleteEntity({id: req.params.id}, function (response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(req.params.id);
    }
  });
};

exports.searchCrawlEntities = (req, res) => {
  client.listCrawlEntities({name_prefix: req.params.name}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  });
};
