/**
 * Created by kristiana on 13.07.17.
 */
exports.listLogConfig = (req, res) => {
  client.getLogConfig({}, function (err, response) {
    if (err) {
      console.log("Logconfig " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.getLogConfig = (req, res) => {
  client.getLogConfig({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("Logconfig " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.saveLogConfig = (req, res) => {
  console.log(req.body);
  client.saveLogConfig(req.body, function (err, response) {
    if (err) {
      console.log("Logconfig " + err);
      res.status(500);
    }
    else {
      res.status(201).json(response);
    }
  });
};

exports.updateLogConfig = (req, res) => {
  client.saveLogConfig(req.body, function (err, response) {
    if (err) {
      console.log("Logconfig " + err);
      res.status(500);
    }
    else {
      res.status(200).json(response);
    }
  })
};

exports.deleteLogConfig = (req, res) => {
  client.deleteLogConfig({id: req.params.id}, function (err, response) {
    if (err) {
      console.log("Logconfig " + err);
      res.status(405).json(err);
    }
    else {
      res.status(200).json(req.params.id);
    }
  })
};
