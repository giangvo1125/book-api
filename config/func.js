let cheerio = require('cheerio');
const axios = require("axios");
var common = require('./common');
var fs = require('fs-extra')
var getLoginHeader = require('./header/header_login_config')
var getRedirectHeader = require('./header/header_redirect_login_config')
var getBetHeader = require('./header/header_bet_config')

var func = {
	login: (obj) =>  {
		var p = new Promise((a, b) => {
			axios.get('https://www.bong88.com/')
			.then((response) => {
				if(response.data) {
					let $ = cheerio.load(response.data);
        			let tk = $('#__tk').attr('value');
        			axios.get('https://www.bong88.com/getBeforeLoginCode.ashx')
        			.then((responseBeforeLoginCode) => {
        				if(responseBeforeLoginCode.data && !isNaN(responseBeforeLoginCode.data)) {
        					var CFSKey = common.CFS(obj.pwd);
				            var EnCryptData = CFSKey + responseBeforeLoginCode.data;
				            var pwobj = common.MD5(EnCryptData);
				            var split_read_cookie = responseBeforeLoginCode.headers['set-cookie'].toString().split(";");
				            var SessionId = '';
				            for (i = 0; i < split_read_cookie.length; i++) {
				                var value = split_read_cookie[i];
				                value = value.split("=");
				                if (value[0] == "ASP.NET_SessionId") {
				                    SessionId = value[1];
				                }
				            }
				            obj['txtPW'] = pwobj
				            obj['__tk'] = tk
				            obj['txtCode'] = responseBeforeLoginCode.data
				            var loginConfig = {
				                headers: getLoginHeader.headers(SessionId)
				            };
				            var formBody = [];
				            for (var property in obj) {
				                var encodedKey = encodeURIComponent(property);
				                var encodedValue = encodeURIComponent(obj[property]);
				                formBody.push(encodedKey + "=" + encodedValue);
				            }
				            formBody = formBody.join("&");
				            axios.post('https://www.bong88.com/ProcessLogin.aspx', formBody, loginConfig)
				            .then((responseLogined) => {
				            	if(responseLogined.status == 200) {
				            		let redirectConfig = {
                        				headers: getRedirectHeader.headers(SessionId)
                        			}
					                axios.get('https://www.bong88.com/GetLoginVerifyInfo.aspx?backcall=1&sik=ibet888.net', redirectConfig)
					                .then((responseRedirect) => {
					                	if(responseRedirect.status == 200 && responseRedirect.data) {
					                		let host = 'https://' + responseRedirect.request.socket._host;
					                		var returnData = {}
					                		returnData['_host'] = host;
					                		returnData['SessionId'] = SessionId
					                		a(returnData)
					                	}
					                	else {
					                		b('not redirect')
					                	}
					                }, (err) => {
					                	console.log('----------err request https://www.bong88.com/GetLoginVerifyInfo.aspx?backcall=1&sik=ibet888.net ----------')
					                	b(err);
					                })
				            	}
				            	else {
				            		b('not login')
				            	}
				            }, (err) => {
				            	console.log('----------err request https://www.bong88.com/ProcessLogin.aspx ----------')
								b(err);
				            })
        				}
        				else {
        					b('no code before login');
        				}
        			}, (err) => {
        				console.log('----------err request https://www.bong88.com/getBeforeLoginCode.ashx ----------')
						b(err);
        			})
				}	
				else {
					b('no data request')
				}
			}, (err) => {
				console.log('----------err request https://bong88.com/ ----------')
				b(err);
			})
		});
		return p;
	}, 

	getTicket: (obj, host, SessionId) => {
		var p = new Promise((a, b) => {
			var formBody = [];
            for (let property in obj) {
                let name = "ItemList[0][" + property + "]"
                let encodedKey = encodeURIComponent(name);
                let encodedValue = encodeURIComponent(obj[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            let getTicketConfig = {
                headers: getBetHeader.headers(SessionId)
            };
            axios.post(host + '/Betting/GetTickets', formBody, getTicketConfig)
            .then((responseGetTicket) => {
            	if(responseGetTicket.status == 200 && 
            		responseGetTicket.data.Data && 
            		responseGetTicket.data.Data.length != 0) 
            	{
            		a(responseGetTicket.data.Data[0])
            	}
            	else {
            		b('not found ticket')
            	}
            }, (err) => {
            	b(err);
            })
		});
		return p;
	}, 

	placeBet: (obj, host, SessionId) => {
		var p = new Promise((a, b) => {
			var formBody = [];
            for (let property in obj) {
                let name = "ItemList[0][" + property + "]"
                let encodedKey = encodeURIComponent(name);
                let encodedValue = encodeURIComponent(obj[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            let getTicketConfig = {
                headers: getBetHeader.headers(SessionId)
            };
            axios.post(host + '/Betting/ProcessBet', formBody, getTicketConfig)
            .then((responsePlaceBet) => {
            	if(responsePlaceBet.status == 200 && 
            		responsePlaceBet.data.Data && 
            		responsePlaceBet.data.Data.ItemList && 
            		responsePlaceBet.data.Data.ItemList.length > 0
            	) {
            		a(responsePlaceBet.data.Data.ItemList[0])
            	}
            	else {
            		b('not found ticket')
            	}
            }, (err) => {
            	b(err);
            })
		});
		return p;
	}, 

	updateOdd: (obj, SessionId) => {
		var p = new Promise((a, b) => {
			let getTicketConfig = {
                headers: getBetHeader.headers(SessionId)
            };
            var formBody = [];
            for (let property in obj) {
                let name = property
                let encodedKey = encodeURIComponent(name);
                let encodedValue = encodeURIComponent(obj[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
			axios.post('http://m.bong88.com/Odds/UpdateOdds', formBody, getTicketConfig)
			.then((res) => {
				console.log('res ',res)
			}, (err) => {
				console.log('err ',err)
			})
		});
		return p;
	}, 
	
	getDataBet: (host, SessionId) => {
		var p = new Promise((a, b) => {
			let getTicketConfig = {
                headers: getBetHeader.headers(SessionId)
            };
            
			axios.get(`${host}/Sports/161/?mode=m0&market=T`, getTicketConfig)
			.then((response) => {
				console.log('response ',response)
			}, (err) => {
				console.log('err ',err)
			})
		});
		return p;
	},

	parseNormal:(filename) => {
        var p = new Promise((a, b) => {
            var lineReader = require('readline').createInterface({
                input: fs.createReadStream(filename)
            });

            let obj = {}
            let count = 0;
            var date = ''
            lineReader.on('line', (line) => {
                count++;
                if(line.indexOf('----') != -1) {
                    date = line.substr(line.indexOf('---- ') + 5, line.indexOf(' ----') - 5)
                    obj[date] = {
                        line: [], 
                    }
                }
                else {
                    var index1 = line.indexOf('-')
                    var index2 = line.lastIndexOf('-')
                    let string = ''
                    var odds = line.split("-")
                    for(let i = 0; i < odds.length; i++) {
                        if(odds[i] >= 38) {
                            obj[date].line.push('T')
                        }
                        else {
                            obj[date].line.push('X')
                        }
                    }
                }
            });
            setTimeout(() => {
                a(obj)
            },2000)
        });
        return p;
    }, 

    writeFileNormal: (filename, data, obj) => {
    	var p = new Promise((a, b) => {
    		var stream = fs.createWriteStream(filename);
            stream.once('open', function(fd) {
                for(var date in data) {
                    var ordered = {}
                    Object.keys(data[date]).sort(function(a, b) {
                        var string1 = a.substr(0, a.indexOf('-'))
                        var string2 = b.substr(0, b.indexOf('-'))
                        var num1 = a.substr(a.indexOf('-') + 1, a.length) ? parseInt(a.substr(a.indexOf('-') + 1, a.length)) : ''
                        var num2 = b.substr(b.indexOf('-') + 1, b.length) ? parseInt(b.substr(b.indexOf('-') + 1, b.length)) : ''
                        return num1 - num2 
                    }).forEach(function(k) {
                        ordered[k] = data[date][k];
                    });
                    data[date] = ordered
                }
                for(var date in data) {
                    obj[date] = data[date]
                    var string = `${date}: \n`
                    for(var i in obj[date]) {
                        string+= `   ${i}: ${obj[date][i]}\n`
                    }
                    string+='\n\n';
                    stream.write(string);
                }
                
                stream.end();
            });
            a();
    	});
    	return p;
    }, 

    returnBalance: (host, SessionId) => {
        var p = new Promise((a, b) => {
            let getTicketConfig = {
                headers: getBetHeader.headers(SessionId)
            };
            axios.post(host + '/Customer/Balance', {}, getTicketConfig)
            .then((balance) => {
                if(balance.status == 200 && balance.data.Data) {
                    a(balance.data.Data)
                }
                else {
                    b('not found balance')
                }
            }, (err) => {
                b(err);
            })
        });
        return p;
    }, 

}

module.exports = func
