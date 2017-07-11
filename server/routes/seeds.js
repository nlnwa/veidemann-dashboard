/**
 * Created by kristiana on 11.05.17.
 */
exports.listSeeds = (req, res) => {
  client.listSeeds({}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.getSeed = (req, res) => {
  client.listSeeds({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      console.log(response);
      res.status(200).json(response);
    }
  })
};

exports.saveSeed = (req, res) => {
  console.log(req.body);
  client.saveSeed(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(201).json(response);
    }
  })
};

exports.updateSeed = (req, res) => {
  client.saveSeed(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      console.log(response);
      res.status(200).json(response);
    }
  })
};

exports.deleteSeed = (req, res) => {
  client.deleteSeed({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(req.params.id);
    }
  })
};

exports.seedSearch = (req, res) => {
  client.listSeeds({name_prefix: req.params.name}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(405).json(err);
    }
    else {
      console.log(response);
      res.status(200).json(response);
    }
  });
};
