module.exports = {
  SaveHistory: function(req, res) {
    History.create(req.body)
      .then(function(hisCreated) {
        res.ok(hisCreated);
      }, function(err) {
        res.serverError(err);
      });
  }
}
