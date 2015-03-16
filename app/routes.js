// app/routes.js

// grab the nerd model we just created
var Client = require('./models/client');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        // sample api route
        app.get('/dashboard/clients', function(req, res) {
			Client.find({}, function(err, clients) {
				console.log(clients);
                if (err)
                    res.send(err);
                res.json(clients); // return the advisor in JSON format
			// res.sendfile('./app/models/clients.json');
			});
		});
		
		app.get('/dashboard/client/:id', function(req, res) {
			if (req.params.id) {
				Client.find({id: req.params.id }, function(err, client) {
					res.json(client);
				});
			}
		});
        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };

