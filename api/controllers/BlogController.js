module.exports = {
	createBlog: (req, res) => {
		var req = req.body || {}
		var {blog, files} = req;
		if(blog) {
			sails.models.blog.create({
				link: blog.link, 
				content: blog.content, 
				type: blog.type, 
			},{raw: true})
			.then((blogCreated) => {
				if(files && files.length > 0) {
					var arr_files = []
					for(let i = 0; i < files.length; i++) {
						arr_files.push({blog_id: blogCreated.dataValues.id,path: files[i].path})
					}
					sails.models.fileupload.bulkCreate(arr_files)
					.then((fileCreated) => {
						res.ok({status: 0})
					}, (err) => {
						res.serverError(err)
					})
				}
				else {
					res.ok({status: 0})
				}
			},(err) => {
				res.serverError(err)
			})
		}
	}, 
	getBlog: (req, res) => {
		sails.models.blog.hasMany(sails.models.fileupload, { foreignKey: 'blog_id' })
		sails.models.fileupload.belongsTo(sails.models.blog, { foreignKey: 'blog_id' })
		let option = {
			include: [
				{
					model: sails.models.fileupload, 
					// raw: true
				}
			], 
			order: [ [ 'id', 'DESC' ]],
		}
		var req = req.body || {}
		var {limit, offset} = req;
		if(!isNaN(limit) && !isNaN(offset)) {
			option.limit = limit
			option.offset = offset
		}
		sails.models.blog.findAndCountAll(option)
		.then((blogs) => {
			var returnData = []
			if(blogs.rows.length > 0) {
				for(var i = 0; i < blogs.rows.length; i++) {
					var obj = {
						blog: {},
						files: {}, 
					}
					obj.blog.id = blogs.rows[i].dataValues.id
					obj.blog.content = blogs.rows[i].dataValues.content
					obj.blog.link = blogs.rows[i].dataValues.link
					obj.blog.type = blogs.rows[i].dataValues.type
					obj.blog.createdAt = blogs.rows[i].dataValues.createdAt
					obj.blog.updatedAt = blogs.rows[i].dataValues.updatedAt
					if(blogs.rows[i].FileUploads &&  blogs.rows[i].FileUploads.length > 0) {
						obj.files = blogs.rows[i].FileUploads
					}
					returnData.push(obj)
				}
				res.ok({data: returnData, count: blogs.count})
			}
			else {
				res.ok({data: returnData, count: 0})
			}
		}, (err) => {
			res.serverError(err);
		})
	}, 
	deleteTableData: (req, res) => {
		var req = req.body || {}
		var {model, ids} = req;
		if(ids && ids.length > 0) {
			sails.models.blog.destroy({
				where: {
					id: ids
				}
			})
			.then((deleted) => {
				sails.models.fileupload.destroy({
					where: {
						blog_id: ids
					}
				})
				.then((fileDeteled) => {
					res.ok({status: 0, blog: deleted, file: fileDeteled})
				}, (err) => {
					res.serverError(err);
				})
			},(err) => {
				res.serverError(err)
			})
		}
		else {
			sails.models.blog.destroy({
				where: {},
					// truncate: true
			})
			.then((deleted) => {
				sails.models.fileupload.destroy({
					where: {}
				})
				.then((fileDeteled) => {
					res.ok({status: 0, blog: deleted, file: fileDeteled})
				}, (err) => {
					res.serverError(err);
				})
			},(err) => {
				res.serverError(err)
			})
		}
	}
}