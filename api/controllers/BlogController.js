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

		sails.models.blog.findAll({
			// raw: true, 
			include: [
				{
					model: sails.models.fileupload, 
					// raw: true
				}
			], 
			order: [ [ 'id', 'DESC' ]],
		})
		.then((blogs) => {
			var returnData = []
			if(blogs.length > 0) {
				for(var i = 0; i < blogs.length; i++) {
					var obj = {
						blog: {},
						files: {}, 
					}
					obj.blog.content = blogs[i].dataValues.content
					obj.blog.link = blogs[i].dataValues.link
					obj.blog.type = blogs[i].dataValues.type
					obj.blog.createdAt = blogs[i].dataValues.createdAt
					obj.blog.updatedAt = blogs[i].dataValues.updatedAt
					if(blogs[i].FileUploads &&  blogs[i].FileUploads.length > 0) {
						obj.files = blogs[i].FileUploads
					}
					returnData.push(obj)
				}
				res.ok(returnData)
			}
			else {
				res.ok(returnData)
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