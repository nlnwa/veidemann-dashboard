exports.listCrawlEntities = (req, res) => {
  client.listCrawlEntities({}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.getCrawlEntities = (req, res) => {
  client.listCrawlEntities({id: req.params.id}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.saveCrawlEntities = (req, res) => {
  console.log(req.body.labels);
  //res.status(201).json(req.body);
  client.saveEntity({meta: {name: req.body.name, description: req.body.description, label: req.body.labels}}, function (err, response) {
    console.log(response);
    res.status(201).json(response);
  });
};

exports.updateCrawlEntities = (req, res) => {
  client.saveEntity(req.body, function (err, response) {
  })
};

exports.deleteCrawlEntities = (req, res) => {
  client.deleteEntity({id: req.params.id}, function (response) {
      res.status(200).json(req.params.id);
    });
};

exports.searchCrawlEntities = (req, res) => {
  console.log(req.params.name);
  client.listCrawlEntities({name_prefix: req.params.name}, function (err, response) {
    console.log(response);
    res.status(200).json(response);
  });
};
