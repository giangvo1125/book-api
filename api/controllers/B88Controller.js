var _process = require('../services/ProcessServices')
module.exports = {
    SaveHistory: function(req, res) {
        const data = req.body || {};
        sails.models.history.create({
            matchcode: data.matchcode,
            result: data.result
        })
        .then(function(hisCreated) {
            sails.models.predict.create({
                matchcode: data.matchcode,
                data: data.data
            })
            .then(function(predictCreated) {
                console.log('predictCreated');
                sails.models.history.findAll({
                    limit: 2,
                    order: [ [ 'createdAt', 'DESC' ]],
                    raw: true
                })
                .then(function(history) {
                    if(history.length >= 2) {
                        var first_match = history[1]
                        var last_match = history[0]
                        console.log('first_match.result ',first_match.result)
                        console.log('last_match.result ',last_match.result)
                        if(first_match.result != last_match.result) {
                            sails.models.predict.findOne({
                                // limit: 1,
                                order: [ [ 'createdAt', 'DESC' ]],
                                raw: true, 
                            })
                            .then(function(dataBet) {
                                sails.models.user.findAll({raw: true})
                                .then((users) => {
                                    // for(var i = 0; i < users.length; i++) {
                                    //     var config = {}
                                    //     config['_host'] = users[i].host
                                    //     config['SessionId'] = users[i].sessionId
                                    //     _process.processBet(config, dataBet.data, last_match.result)
                                    //     .then((betData) => {
                                    //         console.log('betData ',betData)
                                    //     }, (err) => {
                                    //         console.log('errrrrr bet ------------- ',err)
                                    //     })
                                    // }
                                    console.log('users ',users)
                                    if(users.length >= 2) {
                                        var config = {}
                                        config['_host'] = users[0].host
                                        config['SessionId'] = users[0].sessionId
                                        _process.processBet(config, dataBet.data, last_match.result)
                                        .then((betData) => {
                                            console.log('betData ',betData)
                                        }, (err) => {
                                            console.log('errrrrr bet ------------- ',err)
                                        })
                                    }
                                })
                            }, function(err) {
                                console.log('err predict ',err)
                            })
                        }
                    }
                }, function(err) {
                    console.log('err history ',err)
                })
            }, function(err) {
                console.log(err);
            });
        }, function(err) {
            res.serverError(err);
        });
    },
  ViewHistory: function(req, res) {
    const data = req.body || {};
    console.log('***********************start***********************', data)
    sails.models.history.max('id')
      .then(function(id) {
        sails.models.history.findAll({
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
    sails.models.history.max('id')
      .then(function(id) {
        sails.models.history.findAll({
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
        sails.models.history.max('id')
        .then(function(id) {
            sails.models.history.findAll({
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
    }, 
    getHistoryBet: function(req, res) {

    },
}
