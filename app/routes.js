// app/routes.js

// grab the nerd model we just created
var Client = require('./models/client');
var Account = require('./models/account');
var Fund = require('./models/fund');
var Alert = require('./models/alert');
var Transaction = require('./models/transaction');
var Allocation = require('./models/allocation');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        // sample api route
        app.get('/dashboard/clients', function(req, res) {
			Client.find({}, function(err, clients) {
				// console.log(clients);
                if (err)
                    res.send(err);
                res.json(clients); // return the advisor in JSON format
			// res.sendfile('./app/models/clients.json');
			});
		});
		
		app.get('/dashboard/client/:id', function(req, res) {
			if (req.params.id) {
				Client.find({id: req.params.id }, function(err, client) {
					if (err) 
						res.send(err);
					res.json(client);
				});
			}
		});
		
		app.get('/dashboard/client/:id/accounts', function(req, res) {
			if (req.params.id) {
				Account.find({id: req.params.id}, function(err, accounts) {
					res.json(accounts);
				});
			}
		});
		
		app.get('/dashboard/alerts', function(req, res) {
			Alert.find({}, function(err, alerts) {
				// console.log(alerts);
                if (err)
                    res.send(err);
                res.json(alerts); // return the alerts in JSON format
			});
		});
		
		app.get('/dashboard/alerts/:acctNbr', function(req, res) {
			Alert.find({acctNbr: req.params.acctNbr}, function(err, alert) {
				// console.log(alerts);
                if (err)
                    res.send(err);
                res.json(alert); // return the alerts in JSON format
			});
		});
		
		app.get('/dashboard/accounts', function(req, res) {
			Account.find({}, function(err, accounts) {
				// console.log(accounts);
                if (err)
                    res.send(err);
                res.json(accounts); // return the alerts in JSON format
			});
		});
		
		app.get('/dashboard/transactions', function(req, res) {
			Transaction.find({}, function(err, transactions) {
                if (err)
                    res.send(err);
                res.json(transactions); // return the alerts in JSON format
			});
		});
		
		app.get('/dashboard/transactions/:acctNbr', function(req, res) {
			Transaction.find({acctNbr: req.params.acctNbr}, function(err, trans) {
                if (err)
                    res.send(err);
                res.json(trans); // return the alerts in JSON format
			});
		});
		
		app.get('/dashboard/allocations/:acctNbr', function(req, res) {
			Allocation.find({acctNbr: req.params.acctNbr}, function(err, allocations) {
                if (err)
                    res.send(err);
                res.json(allocations); // return the alerts in JSON format
			});
		});
        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };

