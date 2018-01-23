SaveHistory: function(req, res) {
        
        const data = req.body || {};
        sails.models.history.create({
            matchcode: data.matchcode,
            result: data.result
        })
        .then(function(hisCreated) {
            sails.models.predict.create({
                matchcode: data.matchcode,
                data: data.data, 
                resultHome681: data.resultHome681, 
                resultAway681: data.resultAway681, 
            })
            .then(function(predictCreated) {
                console.log('predictCreated');
                sails.models.history.findAll({
                    limit: 2,
                    order: [ [ 'createdAt', 'DESC' ]],
                    raw: true
                })
                .then(function(history) {
                    // bet kieu 1
                    // if(history.length >= 2) {
                    //     var first_match = history[1]
                    //     var last_match = history[0]
                    //     sails.models.predict.findOne({
                    //         // limit: 2,
                    //         order: [ [ 'createdAt', 'DESC' ]],
                    //         raw: true, 
                    //     })
                    //     .then((aaa) => {
                    //         console.log('aaa ',aaa)
                    //     }, (err) => {
                    //         console.log('err ',err)
                    //     })
                    //     // if(first_match.result != last_match.result) {
                    //     //     sails.models.predict.findOne({
                    //     //         // limit: 1,
                    //     //         order: [ [ 'createdAt', 'DESC' ]],
                    //     //         raw: true, 
                    //     //     })
                    //     //     .then(function(dataBet) {
                    //     //         sails.models.user.findAll({raw: true})
                    //     //         .then((users) => {
                    //     //            let promise = []
                    //     //             for(var i = 0; i <= users.length; i++) {
                    //     //                 if(users[i]) {
                    //     //                     var config = {}
                    //     //                     config['_host'] = users[i].host
                    //     //                     config['SessionId'] = users[i].sessionId
                    //     //                     promise.push(_process.processBet(config, dataBet.data, last_match.result, 2))
                    //     //                 }
                    //     //             }
                    //     //             Promise.all(promise)
                    //     //             .then((res) => {
                    //     //                 console.log('res ',res)
                    //     //             }, (err) => {
                    //     //                 console.log('errr bet ',err)
                    //     //             })
                    //     //             // console.log('users ',users)
                    //     //             // if(users.length != 0) {
                    //     //             //     var config = {}
                    //     //             //     config['_host'] = users[0].host
                    //     //             //     config['SessionId'] = users[0].sessionId
                    //     //             //     _process.processBet(config, dataBet.data, last_match.result, 2)
                    //     //             //     .then((betData) => {
                    //     //             //         console.log('betData ',betData)
                    //     //             //     }, (err) => {
                    //     //             //         console.log('errrrrr bet ------------- ',err)
                    //     //             //     })
                    //     //             // }
                    //     //         })
                    //     //     }, function(err) {
                    //     //         console.log('err predict ',err)
                    //     //     })
                    //     // }
                    // }

                    //bet theo kieu 2
                    sails.models.predict.findOne({
                        // limit: 2,
                        order: [ [ 'createdAt', 'DESC' ]],
                        raw: true, 
                    })
                    .then((predictData) => {
                        if(predictData) {
                            if(predictData.resultHome681 != '0' && predictData.resultAway681 != '0') {
                                console.log('hereeeeee')
                                sails.models.user.findAll({raw: true})
                                .then((users) => {
                                    let promise = []
                                    for(var i = 0; i <= users.length; i++) {
                                        if(users[i]) {
                                            var config = {}
                                            config['_host'] = users[i].host
                                            config['SessionId'] = users[i].sessionId
                                            promise.push(_process.returnBalance(config, users[i].id))
                                        }
                                    }
                                    Promise.all(promise)
                                    .then((balances) => {
                                      var resultHome681 = predictData.resultHome681 >= 38  ? 'Tài' : 'Xỉu'
                                      var resultAway681 = predictData.resultAway681 >= 38  ? 'Tài' : 'Xỉu'
                                      for(var i = 0; i < balances.length; i++) {
                                        var balance = balances[i]
                                        var user = _.find(users, (u) => {
                                          return u.id == balance.id;
                                        })
                                        if(user) {
                                          if(resultHome681 == resultAway681) {
                                            console.log('user.balance ',user.balance)
                                            console.log('balance.balance.BCredit ',balance.balance.BCredit)
                                            if(user.balance == null || user.balance == '') {//khi user chưa đc set balance
                                              user.loseticket = 0;
                                              stake = list_stake[user.loseticket]
                                              sails.models.user.update({
                                                loseticket: user.loseticket, 
                                                balance: balance.balance.BCredit,
                                              },{where: {id: user.id}})
                                            }
                                            else if (user.balance < balance.balance.BCredit) {//khi vé bet win
                                              user.loseticket = 0;
                                              stake = list_stake[user.loseticket]
                                              sails.models.user.update({
                                                loseticket: user.loseticket, 
                                                balance: balance.balance.BCredit,
                                              },{where: {id: user.id}})
                                            }
                                            else if (user.balance > balance.balance.BCredit) {//khi vé bet thua
                                              if(user.loseticket < 7) {
                                                user.loseticket++;
                                              }
                                              else {
                                                user.loseticket = 0;
                                              }
                                              stake = list_stake[user.loseticket]
                                              sails.models.user.update({
                                                loseticket: user.loseticket, 
                                                balance: balance.balance.BCredit,
                                              },{where: {id: user.id}})
                                            }
                                            else {
                                              user.loseticket = 0;
                                              stake = list_stake[user.loseticket]
                                              sails.models.user.update({
                                                loseticket: user.loseticket, 
                                                balance: balance.balance.BCredit,
                                              },{where: {id: user.id}})
                                            }
                                            var ticketResult = resultHome681 == 'Tài' ? 'Xỉu' : 'Tài'
                                            _process.processBet(config, predictData.data, ticketResult, stake)
                                            .then((betData) => {
                                                console.log('betData ',betData.placeBet)
                                                sails.models.ticket.create({
                                                  ChoiceValue: ticketResult, 
                                                  odds: betData.i.odds,
                                                  oddsid: betData.i.oddsid,
                                                  Matchid: betData.i.Matchid,
                                                  betteam: betData.i.betteam,
                                                  kickofftime: betData.i.kickofftime,
                                                })
                                            }, (err) => {
                                                console.log('errrrrr bet ------------- ',err)
                                            })
                                          }
                                        }
                                      }
                                    })
                                }, (err) => {
                                    console.log('ef ', err)
                                })
                            }
                        }
                    }, (err) => {
                        console.log('err ',err)
                    })



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