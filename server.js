var capture = require("node-server-screenshot");
//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
    
Object.assign=require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
    


app.get('/', function (req, res) { 
    res.render('index.html', { pageCountMessage : null});
  
});

app.get('/test', function (req, res) { 
    res.render('test.html', { pageCountMessage : null});
  
});
app.get('/view', function (req, res) {
	if (req.query.url == null){
		res.status(406).send('Not Acceptable');
		return;
	}
	capture.fromURL(req.query.url,  __dirname+"/views/test.png",
 {
	 waitMilliseconds:5000,
	 waitAfterSelector:"html",
	 clip:{
		 x:92,
		 y:0,
		 width:1076,
		 height:623
    }
	
 }, function(){
   res.set('Content-Type', 'image/png');
   res.download(__dirname+"/views/test.png");
});
    
    
});

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});


app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
