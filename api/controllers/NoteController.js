module.exports = {
	createNote: (req, res) => {
		var body = req.body || {}
		var {name, content} = body;
		if(content) {
			sails.models.note.create({
				name: name || '', 
				content: content || '', 
				enable: 1,// 1: true, 0: false 
			},{raw: true})
			.then((noteCreated) => {
				res.ok({status: 0})
			},(err) => {
				res.serverError(err)
			})
		}
		else {
			res.serverError('must have content')
		}
	}, 
	getListNote: (req, res) => {
		var req = req.body || {}
		var {limit, offset, name} = req;
		var option = {
			where: {
				enable: '1'
			}
		}
		if(!isNaN(limit) && !isNaN(offset)) {
			option.limit = limit
			option.offset = offset
		}
		if(name) {
			option.where.name = name
		}
		sails.models.note.findAndCountAll(option)
		.then((notes) => {
			res.ok({status: 0, data: notes})
		}, (err) => {
			res.serverError(err);
		})
	}, 
	getNote: (req, res) => {
		var req = req.params || {}
		var {id} = req;
		sails.models.note.findOne({
			where: { id: id }, 
			raw: true,
		})
		.then((note) => {
			res.ok({status: 0, data: note})
		}, (err) => {
			res.serverError(err)
		})
	}, 
	editNote: (req, res) => {
		var req = req.body || {}
		var {content, name, id} = req;
		sails.models.note.find({
			where: { id: id }
		})
		.then((note) => {
			if(note) {
				var update = {}
				if(content) update.content = content
				if(name) update.name = name
				return note.updateAttributes(update)
			}
			else {
				return;
			}
		}, (err) => {
			throw err;
		})
		.then((updated) => {
			res.ok({status: 0})
		}, (err) => {
			res.serverError(err)
		})

	} , 
	removeNote: (req, res) => {
		var req = req.params || {}
		var {id} = req;
		sails.models.note.find({
			where: { id: id }, 
		})
		.then((note) => {
			if(note) {
				return note.updateAttributes({enable: '0'})
			}
			else {
				return;
			}
		}, (err) => {
			throw err;
		})
		.then((removed) => {
			res.ok({status: 0})
		}, (err) => {
			res.serverError(err)
		})
	}
}