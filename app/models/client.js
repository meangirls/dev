// app/models/client.js
// grab the mongoose module
var mongoose = require('mongoose');

	
// define our Client model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Client', {
    id : {type : String, default: ''},
    name: {
		first: String,
		last: String,
		middle: String},
    address: {type: String},
	latitude: {type: String},
	longtitude: {type: String},
	totalAssets: {type: Number},
	taxId: {type: Number},
	alert: {type: Boolean},
	financialTransaction: {type: Boolean},
	markerImage: {type: String}
	});
