/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var func = require('./func')

var _process = require('../api/services/ProcessServices')

module.exports.bootstrap = function(cb) {
	// sails.models.history.sync();
	// sails.models.predict.sync();
	// sails.models.user.sync();

	sails.models.user.findAll({
		limit: 1, 
		raw: true
	})
	.then((users) => {
		for(var i = 0; i < users.length; i++) {
			var obj = users[i]
			obj['txtID'] = users[i].username
    		obj['pwd'] = users[i].password
    		var user_id = users[i].id
    		delete obj['id']
    		_process.processLogin(obj)
		    .then(function(res) {
		    	obj.host = res['_host']
		    	obj.sessionId = res['SessionId']
		    	sails.models.user.update(obj, {
		    		where: {
		    			id: user_id
		    		}
		    	})
		    	.then((logined) => {
		    		console.log('--------logined--------');
		    	}, (err) => {
		    		console.log('-----------update fail --------- ',err)
		    	})
		    }, function(err) {
		    	console.log('----------err login------------------------ ',err)
		    })
		}
	}, (err) => {
		console.log('err get user------------------------- ',err)
	})
	cb();
};

