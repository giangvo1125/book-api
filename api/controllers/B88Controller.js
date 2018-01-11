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
    console.log('***********************start***********************', data)
    History.max('id')
      .then(function(id) {
        History.findAll({
            where: {
              matchcode: {
                $gte: data.matchcode - 2
              }
            },
            raw: true,
            order: [
              ['id', 'asc']
            ]
          })
          .then(function(his) {
            const allChan = _.filter(his, function(o) {
              return o.result == 'Tài'
            });
            const allLe = _.filter(his, function(o) {
              return o.result == 'Xỉu'
            });
            switch (true) {
              case (data.turn == 0): //turn 1 game
                console.log('*********************turn 0******************')
                var allTaiF = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 1);
                });
                var allTaiS = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 2);
                });
                var allXiuF = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 1);
                });
                var allXiuS = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 2);
                });
                if (allTaiF.length == 3 &&
                  allTaiS.length >= 2 &&
                  allTaiS[allTaiS.length - 2].id == allTaiS[allTaiS.length - 1].id - 1 &&
                  allTaiS[allTaiS.length - 1].id == allTaiF[allTaiF.length - 3].id - 1) {
                  console.log('*********************5 OVER********************')
                  //event 5 over
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Xỉu'
                    }
                  });
                } else if (allXiuF.length == 3 &&
                  allXiuS.length >= 2 &&
                  allXiuS[allXiuS.length - 2].id == allXiuS[allXiuS.length - 1].id - 1 &&
                  allXiuS[allXiuS.length - 1].id == allXiuF[allXiuF.length - 3].id - 1) {
                  console.log('*********************5 UNDER********************')
                  //event 5 under
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Tài'
                    }
                  });
                } else {
                  console.log('*********************WAITING********************')
                  res.ok({
                    StatusCode: 1,
                    Data: null
                  });
                }
                break;
              case (data.turn == 1): //turn 2 game
                console.log('**************************turn 1******************')
                var allTaiF = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 1);
                });
                var allTaiS = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 2);
                });
                var allXiuF = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 1);
                });
                var allXiuS = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 2);
                });

                var allXiuMe = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode);
                });
                var allTaiMe = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode);
                });
                if (allTaiMe.length >= 1 &&
                  allTaiF.length == 3 && allTaiS.length >= 1 &&
                  allTaiS[allTaiS.length - 1].id == allTaiF[0].id - 1 &&
                  allTaiF[allTaiF.length - 1].id == allTaiMe[0].id - 1) {
                  console.log('*********************5 OVER********************')
                  //event 5 over
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Xỉu'
                    }
                  });
                } else if (allXiuMe.length >= 1 &&
                  allXiuF.length == 3 && allXiuS.length >= 1 &&
                  allXiuS[allXiuS.length - 1].id == allXiuF[0].id - 1 &&
                  allXiuF[allXiuF.length - 1].id == allXiuMe[0].id - 1) {
                  console.log('*********************5 UNDER********************')
                  //event 5 under
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Tài'
                    }
                  });
                } else {
                  console.log('*********************5 WAITING********************')
                  res.ok({
                    StatusCode: 1,
                    Data: null
                  });
                }
                break;
              case (data.turn == 2): //turn 3 game
                console.log('**********************turn 2************************')
                var allTaiF = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 1);
                });
                var allTaiS = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 2);
                });
                var allXiuF = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 1);
                });
                var allXiuS = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 2);
                });

                var allXiuMe = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode);
                });
                var allTaiMe = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode);
                });
                if (allTaiMe.length >= 2 &&
                  allTaiF.length == 3 &&
                  allTaiF[allTaiF.length - 1].id == allTaiMe[0].id - 1) {
                  console.log('*********************5 OVER********************')
                  //event 5 over
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Xỉu'
                    }
                  });
                } else if (allXiuMe.length >= 2 &&
                  allXiuF.length == 3 &&
                  allXiuF[allXiuF.length - 1].id == allXiuMe[0].id - 1) {
                  console.log('*********************5 UNDER********************')
                  //event 5 under
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Tài'
                    }
                  });
                } else {
                  console.log('*********************WAITING********************')
                  res.ok({
                    StatusCode: 1,
                    Data: null
                  });
                }
                break;
              default:
                break;
            }
          }, function(err) {
            res.serverError(err);
          });
      }, function(err) {
        res.serverError(err);
      });
  },
  ViewHistory4: function(req, res) {
    const data = req.body || {};
    console.log('***********************start***********************', data)
    History.max('id')
      .then(function(id) {
        History.findAll({
            where: {
              matchcode: {
                $gte: data.matchcode - 2
              }
            },
            raw: true,
            order: [
              ['id', 'asc']
            ]
          })
          .then(function(his) {
            const allChan = _.filter(his, function(o) {
              return o.result == 'Tài'
            });
            const allLe = _.filter(his, function(o) {
              return o.result == 'Xỉu'
            });
            switch (true) {
              case (data.turn == 0): //turn 1 game
                console.log('*********************turn 0******************')
                var allTaiF = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 1);
                });
                var allTaiS = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 2);
                });
                var allXiuF = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 1);
                });
                var allXiuS = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 2);
                });
                if (allTaiF.length == 3 &&
                  allTaiS.length >= 2 &&
                  allTaiS[allTaiS.length - 2].id == allTaiS[allTaiS.length - 1].id - 1 &&
                  allTaiS[allTaiS.length - 1].id == allTaiF[allTaiF.length - 3].id - 1) {
                  console.log('*********************5 OVER********************')
                  //event 5 over
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Xỉu'
                    }
                  });
                } else if (allXiuF.length == 3 &&
                  allXiuS.length >= 2 &&
                  allXiuS[allXiuS.length - 2].id == allXiuS[allXiuS.length - 1].id - 1 &&
                  allXiuS[allXiuS.length - 1].id == allXiuF[allXiuF.length - 3].id - 1) {
                  console.log('*********************5 UNDER********************')
                  //event 5 under
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Tài'
                    }
                  });
                } else {
                  console.log('*********************WAITING********************')
                  res.ok({
                    StatusCode: 1,
                    Data: null
                  });
                }
                break;
              case (data.turn == 1): //turn 2 game
                console.log('**************************turn 1******************')
                var allTaiF = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 1);
                });
                var allTaiS = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 2);
                });
                var allXiuF = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 1);
                });
                var allXiuS = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 2);
                });

                var allXiuMe = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode);
                });
                var allTaiMe = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode);
                });
                if (allTaiMe.length >= 1 &&
                  allTaiF.length == 3 && allTaiS.length >= 1 &&
                  allTaiS[allTaiS.length - 1].id == allTaiF[0].id - 1 &&
                  allTaiF[allTaiF.length - 1].id == allTaiMe[0].id - 1) {
                  console.log('*********************5 OVER********************')
                  //event 5 over
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Xỉu'
                    }
                  });
                } else if (allXiuMe.length >= 1 &&
                  allXiuF.length == 3 && allXiuS.length >= 1 &&
                  allXiuS[allXiuS.length - 1].id == allXiuF[0].id - 1 &&
                  allXiuF[allXiuF.length - 1].id == allXiuMe[0].id - 1) {
                  console.log('*********************5 UNDER********************')
                  //event 5 under
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Tài'
                    }
                  });
                } else {
                  console.log('*********************5 WAITING********************')
                  res.ok({
                    StatusCode: 1,
                    Data: null
                  });
                }
                break;
              case (data.turn == 2): //turn 3 game
                console.log('**********************turn 2************************')
                var allTaiF = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 1);
                });
                var allTaiS = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode - 2);
                });
                var allXiuF = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 1);
                });
                var allXiuS = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode - 2);
                });

                var allXiuMe = _.filter(his, function(o) {
                  return (o.result == 'Xỉu' && o.matchcode == data.matchcode);
                });
                var allTaiMe = _.filter(his, function(o) {
                  return (o.result == 'Tài' && o.matchcode == data.matchcode);
                });
                if (allTaiMe.length >= 2 &&
                  allTaiF.length == 3 &&
                  allTaiF[allTaiF.length - 1].id == allTaiMe[0].id - 1) {
                  console.log('*********************5 OVER********************')
                  //event 5 over
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Xỉu'
                    }
                  });
                } else if (allXiuMe.length >= 2 &&
                  allXiuF.length == 3 &&
                  allXiuF[allXiuF.length - 1].id == allXiuMe[0].id - 1) {
                  console.log('*********************5 UNDER********************')
                  //event 5 under
                  res.ok({
                    StatusCode: 0,
                    Data: {
                      result: 'Tài'
                    }
                  });
                } else {
                  console.log('*********************WAITING********************')
                  res.ok({
                    StatusCode: 1,
                    Data: null
                  });
                }
                break;
              default:
                break;
            }
          }, function(err) {
            res.serverError(err);
          });
      }, function(err) {
        res.serverError(err);
      });
  },
  Bet681: function(req, res) {
    console.log('res', req.body)
    History.max('id')
      .then(function(id) {
        History.findAll({
            attributes: ['result'],
            where: {
              match: req.body.match - 1
            },
            order: [
              ['id', 'asc']
            ],
            raw: true
          })
          .then(function(his) {
            res.ok({ Data: his })
          }, function(err) {
            res.serverError(err);
          });
      }, function(err) {
        res.serverError(err);
      });
  }
}
