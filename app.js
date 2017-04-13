var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var index = require('./routes/index');
var movies = require('./routes/movies');
var ids = require('./routes/movies');
var hbs = require('hbs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// hbs.registerHelper('grouped_each', function(every, context, options) {
// 	    var out = "", subcontext = [], i;
// 	    if (context && context.length > 0) {
// 	        for (i = 0; i < context.length; i++) {
// 	            if (i > 0 && i % every === 0) {
// 	                out += options.fn(subcontext);
// 	                subcontext = [];
// 	            }
// 	            subcontext.push(context[i]);
// 	        }
// 	        out += options.fn(subcontext);
// 	    }
// 	    return out;
// 	});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'movie.ico')));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use('/', index);
app.use('/movies', movies);
app.use('/movies/', ids);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
