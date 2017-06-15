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
    res.status(200).json(response);
  })
};

exports.saveSeed = (req, res) => {
  console.log(req.body);
  //console.log({entity_id: req.body.entity_id[0].id, job_id: req.body.job_id[0].id, meta: {name: req.body.name, description: req.body.description, label: req.body.labels}});
  client.saveSeed(req.body, function (err, response) {
    res.status(201).json(response);
  })

};


exports.updateSeed = (req, res) => {
  client.saveSeed(req.body, function (err, response) {
    console.log(response);
    res.status(200).json(response);

  })
};

exports.deleteSeed = (req, res) => {
  client.deleteSeed({id: req.params.id}, function (err, response) {
  console.log('deleting: '+req.params.id);
  res.status(200).json(req.params.id);
  })
};

exports.seedSearch = (req, res) => {
  //console.log(req.params.name);
  client.listSeeds({name_prefix: req.params.name}, function (err, response) {
   // console.log(response);
    res.status(200).json(response);
  });
};
