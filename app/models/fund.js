// app/models/fund.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our Fund model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Fund', {
    acctNbr: {type: String},
	fundNbr: {type: String},
	fundBalance: {type: String},
	fundName: {type: String},
	fundQuotron: {type: String},
	fundNAV: {type: String},
	fundShares: {type: String},
	});
