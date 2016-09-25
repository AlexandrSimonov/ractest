Meteor.methods({
	'addQuery' : function(label, desc, user){
		Query.insert({label : label, desc : desc, user : user, status : "new" });
	},
	'setStatus' : function(id, value){
		Query.update(id, { $set : { status : value }});
	}
});