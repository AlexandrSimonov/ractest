Meteor.methods({
	verEmail : function(email){
		Accounts.sendVerificationEmail(Meteor.userId(), email)
	}
});