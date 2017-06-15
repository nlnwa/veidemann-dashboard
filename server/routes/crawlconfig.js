/**
 * Created by kristiana on 11.05.17.
 */
exports.listCrawlConfigs = (req, res) => {
  client.listCrawlConfigs({}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.getCrawlConfig = (req, res) => {
  client.listCrawlConfigs({id: req.params.id}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.saveCrawlConfig = (req, res) => {
  client.saveCrawlConfig(req.body, function (err, response) {
    res.status(201).json(response);
    console.log('Saveentity: ', response);
  })
};

exports.updateCrawlConfig = (req, res) => {
  client.saveCrawlConfig(req.body, function (err, response) {
    console.log('Saveentity: ', response);
  })
};

exports.deleteCrawlConfig = (req, res) => {
  //client.saveBroswerScript({id: req.params.id}, function (err, response) {
  console.log('deleting: '+req.params.id);
  //})
};
