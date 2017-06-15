/**
 * Created by kristiana on 11.05.17.
 */
exports.listCrawlJobs = (req, res) => {
  client.listCrawlJobs({}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.getCrawlJob = (req, res) => {
  client.listCrawlJobs({id: req.params.id}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.saveCrawlJob = (req, res) => {
  client.saveCrawlJob(req.body, function (err, response) {
    res.status(201).json(response);
    console.log('Saveentity: ', response);
  })
};

exports.updateCrawlJob = (req, res) => {
    client.saveCrawlJob(req.body, function (err, response) {
   //   res.status(200).json(response);
      console.log('Saveentity: ', response);
  })
};

exports.deleteCrawlJob = (req, res) => {
  //client.saveBroswerScript({id: req.params.id}, function (err, response) {
  console.log('deleting: '+req.params.id);
  //})
};
