exports.listCrawlEntities = (req, res) => {
  client.listCrawlEntities({}, function (err, response) {
    if (err) {
      console.log("entities listall :  error: " + err);
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
      console.log("entities getone :  error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.saveEntity = (req, res) => {
  console.log(req.body);
  client.saveEntity(req.body, function (err, response) {
    if (err) {
      console.log("entities save :  error: " + err);
      res.status(500);
    }
    else {
      res.status(201).json(response);
    }
  })
};

exports.updateCrawlEntities = (req, res) => {
  client.saveEntity(req.body, function (err, response) {
    if (err) {
      console.log("entities update :  error: " + err);
      res.status(500);
    }
    else {

    }
  })
};

exports.deleteCrawlEntities = (req, res) => {
  client.deleteEntity({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("entities delete :  error: " + err);
      res.status(405).json(err);
    }
    else {
      res.status(200).json(req.params.id);
    }
  });
};

exports.searchCrawlEntities = (req, res) => {
  client.listCrawlEntities({name_prefix: req.params.name}, function (err, response) {
    if (err) {
      console.log("entities search :  error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  });
};
