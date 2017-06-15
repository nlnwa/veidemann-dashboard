exports.listBrowserScripts = (req, res) => {
  client.listBrowserScripts({}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.getBrowserScript = (req, res) => {
  client.listBrowserScripts({id: req.params.id}, function (err, response) {
    res.status(200).json(response);
  })
};

exports.saveBrowserScript = (req, res) => {
  client.saveBrowserScript(req.body, function (err, response) {
    res.status(201).json(response);
    console.log('Saveentity: ', response);
  })
};

exports.updateBrowserScript = (req, res) => {
  client.saveBrowserScript(req.body, function (err, response) {
    console.log('Saveentity: ', response);
  })
};

exports.deleteBrowserScript = (req, res) => {
  //client.saveBroswerScript({id: req.params.id}, function (err, response) {
  console.log('deleting: '+req.params.id);
  //})
};
