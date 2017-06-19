exports.listBrowserScripts = (req, res) => {
  client.listBrowserScripts({}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.getBrowserScript = (req, res) => {
  client.listBrowserScripts({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.saveBrowserScript = (req, res) => {
  client.saveBrowserScript(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(201).json(response);
    }
  })
};

exports.updateBrowserScript = (req, res) => {
  client.saveBrowserScript(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {

    }
  })
};

exports.deleteBrowserScript = (req, res) => {
  client.saveBroswerScript({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {

    }
  })
};
