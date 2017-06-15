/**
 * Created by kristiana on 11.05.17.
 */
exports.listSchedule = (req, res) => {
  client.listCrawlScheduleConfigs({}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.getSchedule = (req, res) => {
  client.listCrawlScheduleConfigs({id: req.params.id}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.saveSchedule = (req, res) => {
  console.log(req.body);
  client.saveCrawlScheduleConfig(req.body, function (err, response) {
    res.status(201).json(response);
  });
};

exports.updateSchedule = (req, res) => {
  console.log(req.body);
 client.saveCrawlScheduleConfig(req.body, function (err, response) {
   res.status(200).json(response);
 })
};

exports.deleteSchedule = (req, res) => {
  client.deleteCrawlScheduleConfig({id: req.params.id}, function (err, response) {
    res.status(200).json(req.params.id);

  })
};
