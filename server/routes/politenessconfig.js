/**
 * Created by kristiana on 11.05.17.
 */

exports.listPolitenessConfigs = (req, res) => {
  client.listPolitenessConfigs({}, function (err, response) {
    if (err) {
      console.log("Politenessconfig " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.getPolitenessConfig = (req, res) => {
  client.listPolitenessConfigs({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("Politenessconfig " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.savePolitenessConfig = (req, res) => {
  client.savePolitenessConfig(req.body, function (err, response) {
    if (err) {
      console.log("Politenessconfig " + err);
      res.status(500);
    }
    else {
      console.log(response);
      res.status(201).json(response);
    }
  })
};

exports.updatePolitenessConfig = (req, res) => {
  client.savePolitenessConfig(req.body, function (err, response) {
    if (err) {
      console.log("Politenessconfig " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response)
    }
  });
};

exports.deletePolitenessConfig = (req, res) => {
  client.deletePolitenessConfig({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("Politenessconfig " + err);
      res.status(405).json(err);
    }
    else {
      res.status(200).json(req.params.id);
    }
  })
};

exports.getrobotsconfig = (req, res) => {
  res.status(200).json({
      "menuitem": [{
        "id" : "1",
        "itemName": "OBEY_ROBOTS"
      },
        {
          "id" : "2",
          "itemName": "IGNORE_ROBOTS"
        },
        {
          "id" : "3",
          "itemName": "CUSTOM_ROBOTS"
        }
      ]
  })
};
