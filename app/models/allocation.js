// app/models/transactions.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our Allocation model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Allocation', {
	acctNbr: {type: String},
	fundNbr: {type: String},
	fundName: {type: String},
	fundQuotron: {type: String},
	initialInvestDate: {type: String},
	returnInvitalInvestDate: {type: String},
	returnYTD: {type: String},
	asOfDate: {type: String},
	allocation: {type: String}
	});
