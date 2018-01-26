var _process = require('../services/ProcessServices')
var _ = require('lodash');
var list_users = []
var list_stake = [3, 7, 13, 25, 51]
// var list_stake = [2, 5, 10, 20, 40]
var subAmount = 3
var length = 2
module.exports = {
    SaveTicket: function(req, res) {
        var data = req.body || {};
        sails.models.history.create({
            matchcode: data.matchcode,
            result: data.result
        })
        .then((hisCreated) => {
            res.ok(hisCreated)
        }, (err) => {
            res.serverError(err);
        })
    },
    SaveHistory: function(req, res) {
        const data = req.body || {};
        sails.models.history.create({
            matchcode: data.matchcode,
            result: data.result
        })
        .then((hisCreated) => {
            sails.models.predict.create({
                matchcode: data.matchcode,
                data: data.data, 
                resultHome681: data.resultHome681, 
                resultAway681: data.resultAway681, 
            })
            .then((predictCreated) => {
                res.ok({status: 0});
                // sails.models.history.findAll({
                //     limit: length,
                //     order: [ [ 'id', 'DESC' ]],
                //     raw: true
                // })
                // .then((histories) => {
                //     sails.models.predict.findOne({
                //         // limit: 2,
                //         order: [ [ 'createdAt', 'DESC' ]],
                //         raw: true, 
                //     })
                //     .then((predictData) => {
                //         if(predictData) {
                //             sails.models.user.findAll({
                //                 order: [ [ 'id', 'ASC' ]],
                //                 raw: true
                //             })
                //             .then((users) => {
                //                 if(users) {
                //                     users.forEach((user, index) => {
                //                         if(user.usertype == 0 || user.usertype == '0') {
                //                             var config = {}
                //                             config['_host'] = user.host
                //                             config['SessionId'] = user.sessionId
                //                             var stake = 0;
                //                             //trường họp mới vào hoặc là chưa có lưu loseticket
                //                            if(user.usertype == 0 || user.usertype == '0') {
                //                                 console.log('user.loseticket---------------',user.loseticket)
                //                                 // console.log('histories[3].result---------------',histories[3].result)
                //                                 // console.log('histories[2].result---------------',histories[2].result)
                //                                 console.log('histories[1].result---------------',histories[1].result)
                //                                 console.log('histories[0].result---------------',histories[0].result)
                //                             }
                //                             if(user.loseticket == 0 || user.loseticket == '' || user.loseticket == null) { 
                //                                 console.log('truong hop 1---------------------')
                //                                 //ktra kết quả 4 vé cuối, nếu 4 vé cùng là Tài hoặc Xỉu thì bắt đầu bet.
                //                                 if(histories && histories.length == length) {
                //                                     var condition1 = histories[0].result == histories[1].result
                //                                     // var condition2 = histories[0].result == histories[2].result
                //                                     // var condition3 = histories[0].result == histories[3].result
                //                                     var condition2 = true
                //                                     var condition3 = true
                //                                     //nếu thoả điều kiện
                //                                     if(condition1 && condition2 && condition3) {
                //                                         stake = list_stake[0]
                //                                         var ticketResult = histories[0].result == 'Xỉu' ? 'Tài' : 'Xỉu'
                //                                         //bet
                //                                         console.log('bet theo -----1------ ',ticketResult)
                //                                         if(user.usertype == 0 || user.usertype == '0') {
                //                                             console.log('user bet theo------------ ',user.username)
                //                                             _process.processBet(config, predictData.data, ticketResult, stake)
                //                                             .then((betData) => {
                //                                                 console.log('betData ',betData.placeBet)
                //                                                 //lấy balance của user sau khi bet
                //                                                 _process.returnBalance(config, user.id)
                //                                                 .then((balance)=> {
                //                                                     //cập nhật balance sau khi bet cho user
                //                                                     sails.models.user.update({
                //                                                         loseticket: 1, 
                //                                                         balance: balance.balance.BCredit,
                //                                                     }, {
                //                                                         where: {id: user.id}
                //                                                     })
                //                                                     //kết thúc
                //                                                 },(err) => {
                //                                                     console.log('err balance ',err)
                //                                                 })
                //                                             }, (err) => {
                //                                                 console.log('errrrrr bet ------------- ',err)
                //                                             })
                //                                         }
                //                                     }
                //                                 }
                //                             }
                //                             //đang trong luồng theo để bet ( tối đa theo 5 lần)
                //                             else {
                //                                 //nếu vẫn chưa thua tối đa 5 vé, tiếp tục theo
                //                                 if(user.loseticket <= 4) {
                //                                     var result1 = histories[0].result
                //                                     var result2 = histories[1].result
                //                                     //nếu 2 kết quả giống nhau, nghĩa là vẫn đang thua, tiếp tục tăng loseticket lên
                //                                     if(result1 == result2) {
                //                                         // user.loseticket++;
                //                                         stake = list_stake[user.loseticket]
                //                                         var stake_sub = subAmount// tiền bet vé dằn
                //                                         var ticketResult = histories[0].result == 'Xỉu' ? 'Tài' : 'Xỉu'
                //                                         var ticketResult2 = ticketResult == 'Xỉu' ? 'Tài' : 'Xỉu'
                //                                         //bet
                //                                         var promise_bet = []
                //                                         //vé bet 
                //                                         console.log('bet theo -----2------ ',ticketResult)
                //                                         if(user.usertype == '0' || user.usertype == 0) {
                //                                             console.log('user bet theo------------ ',user.username)
                //                                             promise_bet.push(_process.processBet(config, predictData.data, ticketResult, stake))

                //                                             //vé dằn: để giảm số tiền thua mỗi lần theo, bet thêm 1 vé ngược để dằn
                //                                             console.log('bet dan ----------- ',ticketResult2)
                //                                             var subUser = users[index + 1]
                //                                             console.log('user bet dan------------ ',subUser.username)
                //                                             var subConfig = {}
                //                                             subConfig['_host'] = subUser.host
                //                                             subConfig['SessionId'] = subUser.sessionId
                //                                             promise_bet.push(_process.processBet(subConfig, predictData.data, ticketResult2, stake_sub))
                                                        
                //                                             //bet
                //                                             Promise.all(promise_bet)
                //                                             .then((betData) => {
                //                                                 betData.forEach((a) => {
                //                                                     console.log('betData ',a.placeBet)
                //                                                 })
                //                                                 //lấy balance của user sau khi bet
                //                                                 _process.returnBalance(config, user.id)
                //                                                 .then((balance)=> {
                //                                                     //cập nhật balance sau khi bet cho user
                //                                                     sails.models.user.update({
                //                                                         loseticket: parseInt(user.loseticket) + 1, 
                //                                                         balance: balance.balance.BCredit,
                //                                                     }, {
                //                                                         where: {id: user.id}
                //                                                     })
                //                                                     //kết thúc
                //                                                 },(err) => {
                //                                                     console.log('err balance ',err)
                //                                                 })
                //                                             }, (err) => {
                //                                                 console.log('errrrrr bet ------------- ',err)
                //                                             })
                //                                         }
                //                                     }
                //                                     //nếu 2 kết quả khác nhau, nghĩa là đã win, reset loseticket = 0
                //                                     else {
                //                                         _process.returnBalance(config, user.id)
                //                                         .then((balance)=> {
                //                                             //cập nhật balance sau khi bet cho user
                //                                             sails.models.user.update({
                //                                                 loseticket: 0, 
                //                                                 balance: balance.balance.BCredit,
                //                                             }, {
                //                                                 where: {id: user.id}
                //                                             })
                //                                             //kết thúc
                //                                         },(err) => {
                //                                             console.log('err balance ',err)
                //                                         })
                //                                     }
                //                                 }
                //                                 //nếu đã thua 5 vé rồi, reset loseticket về = 0
                //                                 else {
                //                                     _process.processBet(config, predictData.data, ticketResult, list_stake[0])
                //                                     sails.models.user.update({
                //                                         loseticket: 0, 
                //                                         // balance: balance.balance.BCredit,
                //                                     }, {
                //                                         where: {id: user.id}
                //                                     })
                //                                 }
                //                             }
                //                         }
                //                     })
                //                 }
                //             }, (err) => {
                //                 console.log('err user ',err)
                //             })
                //         }
                //     }, (err) => {
                //         console.log('err predictData ',err)
                //     })
                // }, (err) => {
                //     console.log('err history ',err)
                // })
            }, (err) => {
                console.log('err predictCreated ', err);
            });
        }, (err) => {
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
