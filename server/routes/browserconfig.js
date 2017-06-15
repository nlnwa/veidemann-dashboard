/**
 * Created by kristiana on 11.05.17.
 */
exports.listBrowserConfig = (req, res) => {
  client.listBrowserConfigs({}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.getBrowserConfig = (req, res) => {
  client.listBrowserConfigs({id: req.params.id}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.saveBrowserConfig = (req, res) => {
  console.log(req.body);
  client.saveBrowserConfig(req.body, function (err, response) {
  })
};

exports.updateBrowserConfig = (req, res) => {
  client.saveBrowserConfig(req.body, function (err, response) {
  })
};

exports.deleteBrowserConfig = (req, res) => {
  client.deleteBrowserConfig({id: req.params.id}, function (err, response) {
  console.log(err);
  console.log('deleting: '+req.params.id);
  })
};
