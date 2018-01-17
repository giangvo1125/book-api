var func = require('../../config/func')
var obj = {
    processLogin: (user) => {
        var p = new Promise((a, b) => {
            func.login(user)
            .then((response) => {
                if(response['_host'] && response['SessionId']) {
                    a(response);
                }
                else {
                    a({})
                }
            }, (err) => {
                b(err);
            })
        });
        return p;
    }, 

    processBet: (config, data, bet7759) => {
        var p = new Promise((a, b) => {
        	var s = 'h';
        	if(bet7759 == 'Xỉu') {
        		s = 'a';
        	}
        	var home = "Number Game No. " + data.league.MatchCode;
        	var i = {
              "sportname": "Number Game",
              "bettypename": "Trên/Dưới kế tiếp",
              "ChoiceValue": bet7759,
              "Line": "",
              "displayHDP": "",
              "odds": data.product.sels[s].Price,
              "home": home,
              "away": null,
              "league": "Turbo Number Game",
              "IsLive": true,
              "ProgramID": "",
              "RaceNum": 0,
              "Runner": 0,
              "PoolType": 1,
              "imgurl": "",
              "BetID": "0",
              "type": "OU",
              "bettype": "85",
              "oddsid": parseInt(data.product.pid),
              "Hscore": 0,
              "Ascore": 0,
              "Matchid": parseInt(data.product.MatchId),
              "betteam": s,
              "stake": "2",
              "gameid": 161,
              "MRPercentage": "",
              "OddsInfo": "",
              "AcceptBetterOdds": true,
              "AutoAcceptSec": "",
              "showLiveScore": false,
              "colorHomeTeam": "",
              "colorAwayTeam": "",
              "matchcode": null,
              "isQuickBet": false,
              "kickofftime": data.match.kickofftime,
              "oddsStatus": "",
              "min": "2",
              "max": "1,350",
              "isQuickBet": false
            };
            console.log('bet----------- ',bet7759)
            func.getTicket(i, config['_host'], config['SessionId'])
            .then((ticket) => {
                // console.log('ticket ',ticket)
                switch(ticket.Code) {
                    case 6:
                        b('ticket closed.');
                    break;
                    case 0:
                        func.placeBet(i, config['_host'], config['SessionId'])
                        .then((placeBet) => {
                            a(placeBet)
                        }, (err) => {
                            b(err);
                        })
                    break;
                    default:
                        b('err with ticket.')
                    break;
                }
            }, (err) => {
                b(err);
            })
        });
        return p;
    }, 

    processUpdateOdds: (config) => {
        var p = new Promise((a, b) => {
            func.updateOdd({GameId:161, DateType:'l', BetTypeClass:'OU'}, config['SessionId'])
            .then((ticket) => {
                console.log('ticket ',ticket)
            }, (err) => {
                b(err);
            })
        });
        return p;
    }, 

    processGetDataBet: (config) => {
        var p = new Promise((a, b) => {
            func.getDataBet(config['_host'], config['SessionId'])
        });
        return p;
    },

    processParseNormal: (filename, output, byWeek = true) => {
        var p = new Promise((a, b) => {
            func.parseNormal(filename)
            .then((obj) => {
                for(let key in obj) {
                    let item = obj[key].line
                    var first = item[0]
                    var count = 1;
                    for(let i = 1; i <= item.length; i++) {
                        if(first == '') {
                            first = item[i]
                            count++;
                        }
                        else if(first == item[i]) {
                            count++;
                        }
                        else {
                            if(obj[key][`${first}-${count}`]) {
                                obj[key][`${first}-${count}`]++;
                            }
                            else {
                                obj[key][`${first}-${count}`] = 1
                            }
                            first = item[i];
                            count = 1;
                        }
                    }
                    delete obj[key]['line']
                }
                setTimeout(()=> {
                    var final = {}
                    var countWeek = 0;
                    var index = 1;
                    if(byWeek == true) {
                        for(let key in obj) { //thong ke theo tuan
                            countWeek++;
                            if(countWeek <= 7) {
                                if(final[`week-${index}`]) {
                                    let item = obj[key];
                                    for(let i in item) {
                                        if(final[`week-${index}`][i]) {
                                            final[`week-${index}`][i] += !isNaN(item[i]) && item[i] != '' ? parseInt(item[i]) : 0
                                        }
                                        else {
                                            final[`week-${index}`][i] = !isNaN(item[i]) && item[i] != '' ? parseInt(item[i]) : 0
                                        }
                                    }
                                }
                                else {
                                    final[`week-${index}`] = obj[key]
                                }
                            }
                            else {
                                countWeek = 0;
                                index++;
                            }
                        }
                    }
                    else {
                        final = obj // thong ke theo ngay
                    }
                    func.writeFileNormal(output, final, obj)
                    .then((success) => {
                        a('ok')
                    }, (err) => {
                        console.log('err ',err)
                    })
                }, 500)
            })
        });
        return p;
    }, 

    processParseByCondition1: (filename, output, byWeek = true) => {
        var p = new Promise((a, b) => {
            func.parseNormal(filename)
            .then((obj) => {
                for(let key in obj) {
                    let item = obj[key].line
                    obj[key] = {
                        'T-X-T-X': 0, 
                        'X-T-X-T': 0, 
                        'T-X-X-T': 0, 
                        'X-T-T-X': 0, 
                    }
                    var first = ''
                    var next = ''
                    var is1 = true;
                    for(let i = 0; i <= item.length; i++) {
                        if(item[i] == 'T' && item[i + 1] == 'X' && item[i + 2] == 'T' && item[i + 3] == 'X') {
                            obj[key]['T-X-T-X']++;
                        }
                        else if(item[i] == 'X' && item[i + 1] == 'T' && item[i + 2] == 'X' && item[i + 3] == 'T') {
                            obj[key]['X-T-X-T']++;
                        }
                        else if(item[i] == 'T' && item[i + 1] == 'X' && item[i + 2] == 'X' && item[i + 3] == 'T') {
                            obj[key]['T-X-X-T']++;
                        }
                        else if(item[i] == 'X' && item[i + 1] == 'T' && item[i + 2] == 'T' && item[i + 3] == 'X') {
                            obj[key]['X-T-T-X']++;
                        }
                    }
                    delete obj[key]['line']
                }
                setTimeout(()=> {
                    var final = {}
                    var countWeek = 0;
                    var index = 1;
                    if(byWeek == true) {
                        for(let key in obj) { //thong ke theo tuan
                            countWeek++;
                            if(countWeek <= 7) {
                                if(final[`week-${index}`]) {
                                    let item = obj[key];
                                    for(let i in item) {
                                        if(final[`week-${index}`][i]) {
                                            final[`week-${index}`][i] += !isNaN(item[i]) && item[i] != '' ? parseInt(item[i]) : 0
                                        }
                                        else {
                                            final[`week-${index}`][i] = !isNaN(item[i]) && item[i] != '' ? parseInt(item[i]) : 0
                                        }
                                    }
                                }
                                else {
                                    final[`week-${index}`] = obj[key]
                                }
                            }
                            else {
                                countWeek = 0;
                                index++;
                            }
                        }
                    }
                    else {
                        final = obj // thong ke theo ngay
                    }
                    func.writeFileNormal(output, final, obj)
                    .then((success) => {
                        a('ok')
                    }, (err) => {
                        console.log('err ',err)
                    })
                }, 500)
            })
        });
        return p;
    }, 
}

module.exports = obj
