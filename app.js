var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate');
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

const {Pool} = require('pg')


// DB connect string
var connectionString = "postgres://root:PriyaPostgres91@localhost/recipebookdb";

const pool = new Pool({
  connectionString: connectionString,
})

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
	//PG connect
	pool.connect((err, client, release) => {
  		if (err) {
    		return console.error('Error acquiring client', err.stack)
  		}
  		client.query('SELECT * FROM recipes', (err, result) => {
    		if (err) {
      			return console.error('Error executing query', err.stack)
    		}
    		res.render('index',{recipes: result.rows});
    		console.log(result.rows)
    		release()
  		})
	})
	/*pool.connect(connect, function(err, client, done){
		
		if (err) {
			return console.error('Error fetching client from pool', err);
		}
		console.log("before callback#########")
		//client.query('SELECT * FROM recipes', function(err, result){
			//console.log("in callback#########")
			//if (err) {
				//return console.error('Error running query', err);
		// 	}
		// 	console.log("result"+result)
		// 	//res.render(false,'index',{recipes: result.rows});
		// 	done();
		// });
		
	});*/
});

// Server
app.listen(3000, function(){
	console.log('Server started On Port 3000');
});
