// app/models/transactions.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our Transaction model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Transaction', {
    date:{type: String},
    client:{type: String},
    acctNbr:{type: String},
    fundId:{type: String},
    category: {type: String},
    amount:{type: String},
	fundName: {type: String},
	fundQuotron: {type: String},
	});
