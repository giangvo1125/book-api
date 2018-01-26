var config = function(SessionId) {
	return {
		'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    	'Accept-Encoding': 'gzip, deflate, br',
	    'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
	    'Cache-Control': 'no-cache',
	    'Connection': 'keep-alive',
	    'Content-Length': '2802',
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Cookie': "ASP.NET_SessionId=" + SessionId + ";",
	    'Host': 'www.bong88.com',
	    'Origin': 'https://www.bong88.com',
	    'Pragma': 'no-cache',
	    'Referer': 'https://www.bong88.com/login888.aspx?IsSSL=1',
	    'Upgrade-Insecure-Requests': '1',
	    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
	}
}

module.exports.headers = config