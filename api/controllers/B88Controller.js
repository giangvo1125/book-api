module.exports = {
  SaveHistory: function(req, res) {
    History.create(req.body)
      .then(function(hisCreated) {
        res.ok(hisCreated);
      }, function(err) {
        res.serverError(err);
      });
  },
  ViewHistory: function(req, res) {
    History.max('id')
      .then(function(id) {
        History.findAll({
            where: {
              id: {
                $in: [id, id - 1, id - 2, id-3]
              }
            }
          })
          .then(function(his) {
            const allChan = _.filter(his, function(o) {
              return o.result == 'Chẵn'
            });
            const allLe = _.filter(his, function(o) {
              return o.result == 'Lẻ'
            });
            if (allChan.length == 4) {
              res.ok({
                StatusCode: 0,
                Data: {
                  result: 'Lẻ'
                }
              });
            } else if (allLe.length == 4) {
              res.ok({
                StatusCode: 0,
                Data: {
                  result: 'Chẵn'
                }
              });
            } else {
              res.ok({
                StatusCode: 1,
                Data: null
              });
            }
          }, function(err) {
            res.serverError(err);
          });
      }, function(err) {
        res.serverError(err);
      });
  }
}
