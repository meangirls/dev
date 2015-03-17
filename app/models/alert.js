// app/models/alert.js
// grab the mongoose module
var mongoose = require('mongoose');

// define our Alert model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Alert', {
    id : {type : String, default: ''},
    type: {type: String},
	date: {type: String},
    message: {type: String},
	client: {type: String},
	actionable: {type: Boolean},
	acctNbr: {type: String}
	});
