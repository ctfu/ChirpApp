var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);

//api for all posts
router.route('/posts')

	//create a new post
	.post(function(req, res){

		var newPost = new Post();
		console.log(req.body);
		newPost.created_by = req.body.created_by;
		newPost.text = req.body.text;
		newPost.save(function(err, post){
			if(err){
				return res.send(500, err);
			}
			res.json(post);
		});
	})

	.get(function(req, res){

		Post.find(function(err, posts){
			if(err){
				return res.send(500, err);
			}
			res.json(posts);
		});

	});

//api for a specfic post
router.route('/posts/:id')

	//create
	.put(function(req,res){

		Post.findById(req.params.id, function(err, post){
			if(err){
				res.send(err);
			}
			post.text = req.body.text;
			post.created_by = req.body.created_by;

			post.save(function(err, post){
				if(err){
					res.send(err);
				}
				res.json(post);
			});
		});
	})

	.get(function(req,res){

		Post.findById(req.params.id, function(err, post){
			if(err){
				res.send(err);
			}
			res.json(post);
		});
	})

	.delete(function(req,res){
		Post.remove({_id: req.params.id}, function(err){
			if(err){
				res.send(err);
			}
			res.json('Post deleted');
		});
	});

router.route('/users')
	.get(function(req, res){
		User.find(function(err, users){
			if(err){
				res.send(err);
			}
			res.json(users);
		});
	});

module.exports = router;
