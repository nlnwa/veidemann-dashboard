/**
 * Created by kristiana on 11.05.17.
 */


exports.listBrowserConfig = (req, res) => {
  client.listBrowserConfigs({}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.getBrowserConfig = (req, res) => {
  client.listBrowserConfigs({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.saveBrowserConfig = (req, res) => {
  client.saveBrowserConfig(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.updateBrowserConfig = (req, res) => {
  client.saveBrowserConfig(req.body, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(500);
    }
    else {
      console.log(req.body);
      res.status(200).json(response);
    }
  })
};

exports.deleteBrowserConfig = (req, res) => {
  client.deleteBrowserConfig({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("error: " + err);
      res.status(405).json(err);
    }
    else {
      res.status(200).json(req.params.id);
    }
  })
};


exports.browserscript = (req, res) => {
  res.status(200).json({
      "menuitem": [{
        "value": "UNDEFINED"
      },
        {
          "value": "BEHAVIOR"
        },
        {
          "value": "EXTRACT_OUTLINKS"
        },
        {
          "value": "LOGIN"
        }
      ]
  });
};
