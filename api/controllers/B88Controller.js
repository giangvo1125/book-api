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
    const data = req.body || {};
    console.log('...........', data)
    History.max('id')
      .then(function(id) {
        History.findAll({
            where: {
              id: {
                $gt: (id - data.step)
              }
            }
          })
          .then(function(his) {
            const allChan = _.filter(his, function(o) {
              return o.result == 'Tài'
            });
            const allLe = _.filter(his, function(o) {
              return o.result == 'Xỉu'
            });
            if (allChan.length == data.step) {
              res.ok({
                StatusCode: 0,
                Data: {
                  result: 'Xỉu'
                }
              });
            } else if (allLe.length == data.step) {
              res.ok({
                StatusCode: 0,
                Data: {
                  result: 'Tài'
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
  },
  Bet681: function(req, res) {
    History.max('id')
      .then(function(id) {
        History.findAll({
            where: {
              id: {
                $in: [id, id - 1, id - 2, id - 3, id - 4]
              }
            }
          })
          .then(function(his) {
            const allChan = _.filter(his, function(o) {
              return o.result == 'Tài'
            });
            const allLe = _.filter(his, function(o) {
              return o.result == 'Xỉu'
            });
            if (allChan.length == 5 ||
              allLe.length == 5) {
              res.ok({
                StatusCode: 1,
                Data: null
              });
            } else {
              if (his[his.length - 1].result == 'Tài') {
                res.ok({
                  StatusCode: 0,
                  Data: {
                    result: 'Xỉu'
                  }
                });
              } else if (his[his.length - 1].result == 'Xỉu') {
                res.ok({
                  StatusCode: 0,
                  Data: {
                    result: 'Tài'
                  }
                });
              } else {
                res.ok({
                  StatusCode: 1,
                  Data: null
                });
              }
            }
          }, function(err) {
            res.serverError(err);
          });
      }, function(err) {
        res.serverError(err);
      });
  }
}
