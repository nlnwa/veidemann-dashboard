/**
 * Created by kristiana on 11.05.17.
 */

exports.listPolitenessConfigs = (req, res) => {
  client.listPolitenessConfigs({}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.getPolitenessConfig = (req, res) => {
  client.listPolitenessConfigs({id: req.params.id}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.savePolitenessConfig = (req, res) => {
  client.savePolitenessConfig(req.body, function (err, response) {
    res.status(201).json(response);
    console.log('Saveentity: ', response);
  })
};

exports.updatePolitenessConfig = (req, res) => {
  client.savePolitenessConfig(req.body, function (err, response) {

  })
};

exports.deletePolitenessConfig = (req, res) => {
  client.deletePolitenessConfig({id: req.params.id}, function (err, response) {
  console.log('deleting: '+req.params.id);
    res.status(200).json(req.params.id);
  })
};
