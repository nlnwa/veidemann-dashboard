/**
 * Created by kristiana on 11.05.17.
 */
exports.listSeeds = (req, res) => {
  client.listSeeds({page_size: 10000}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.getSeedsOfEntity = (req, res) => {
  console.log(req.params.entityid);
client.listSeeds({entity_id: req.params.entityid, page_size: 30}, function (err, response) {
  if (err) {
    console.log("Seeds: " + err);
    res.status(500);
  }
  else {
    res.status(201).json(response);
  }
})
};


exports.getSeed = (req, res) => {
  client.listSeeds({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("Seeds: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.saveSeed = (req, res) => {
  client.saveSeed(req.body, function (err, response) {
    if (err) {
      console.log("Seeds: " + err);
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
      console.log("Seeds: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.deleteSeed = (req, res) => {
  client.deleteSeed({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("Seeds: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(req.params.id);
    }
  })
};

exports.seedSearch = (req, res) => {
  client.listSeeds({name_prefix: req.params.name, page_size: 10000}, function (err, response) {
    if (err) {
      console.log("Seeds: " + err);
      res.status(405).json(err);
    }
    else {
      res.status(200).json(response);
    }
  });
};
