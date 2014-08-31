/**
 * Module dependencies.
 */

var express = require('../../lib/express');

// Path to our public directory

var pub = __dirname + '/public';

// setup middleware

var app = express();
app.use(express.static(pub));

// Optional since express defaults to CWD/views

app.set('views', __dirname + '/views');

// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('view engine', 'jade');

var posts = [];

function User(name, email) {
  this.name = name;
  this.email = email;
}

// Dummy users
var users = [
    new User('tj', 'tj@vision-media.ca')
  , new User('ciaran', 'ciaranj@gmail.com')
  , new User('aaron', 'aaron.heckmann+github@gmail.com')
];
app.all('*', function(req, res){//all()->get post delete put都會執行 ，*萬用字元
	console.log('Count: ' + count++);

	if(req.headers.host === 'localhost:3000'){
		console.log(Access "denied")
	}
});
app.get('/1/post', function(req, res){
  res.send(posts);
});

app.post('/1/post',function(req, res){
	var subject;
	var content;

	if (typeof(req.body) === 'undefined'){
		subject = req.query.subject;
		content = req.query.content;
	}
	var post = {
		"subject": subject,//key可省略""
		"content": content
	};

	posts.push(post);
	res.send({ status: 'ok'});
});

app.delete('/1/post',function(req, res){
	res.send("delete a post");
});

app.put('/1/post/:postId',function(req, res){
	var id = req.params.postId
	res.send("update a post " + id);
});

// change this to a better error handler in your code
// sending stacktrace to users in production is not good
app.use(function(err, req, res, next) {
  res.send(err.stack);
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
