// app/models/account.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our Account model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Account', {
    id: {type: String},
    acctNbr: {type: String},
    acctType: {type: String},
    acctBalance: {type: String},
    asOfDate: {type: String}
	});
