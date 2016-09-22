Meteor.publish('notifications', function(){
	return Meteor.users.find(this.userId, {fields: {notifications : 1}});
});