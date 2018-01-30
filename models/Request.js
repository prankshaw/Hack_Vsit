var mongoose = require('mongoose');


// User Schema
var RequestSchema = mongoose.Schema({
	username: {
		type: String,
    index:  true
	},
	request: {
		type: String
	},
	priority: {
		type: String

	},
	location: {
		type: String
	},
    dept: {
		type: String
	},
    subject : {
		type: String
	}
});

var Request = module.exports = mongoose.model('Request', RequestSchema);



//method to create User
module.exports.createUser = function(newUser, callback){

	        newUser.save(callback);

}
