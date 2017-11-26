var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate');
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

// DB connect string
var connect = "postgres://root:password@localhost/recipebookdb";

//Assign Dust Engine to .dust files
app.engine('dust',cons.dust);

//set Default Ext .dust
app.set('view engine','dust');
app.set('views',__dirname + '/views');

// Set public Folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
	res.render('index');
});

// Server
app.listen(3000, function(){
	console.log('Server started On Port 3000');
});
