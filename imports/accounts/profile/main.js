Template.profile.helpers({
	userReady : function(){
		if(Meteor.user() === undefined){
			return false
		}
		else{
			return true;
		}
	},
	user : function(){
		if(Meteor.user()){
			return true;
		}
		else{
			FlowRouter.go("/auth");
		}
	},
	notifications : function(){
		if(Meteor.subscribe("notifications").ready()){
			if(Meteor.user().notifications){
				return Meteor.user().notifications;
			}
		}
	},
	email : function(){
		if(Meteor.user() && Meteor.user().emails[0].verified == false){
			return Meteor.user().emails[0].address
		}
	}
});

Template.profile.events({
	'click #del': function(e, t){
		Meteor.call("delNotific", e.currentTarget.name);
	},
	'click #emailVer' : function(e, t){
		Meteor.call("verEmail", e.currentTarget.name);
	}
});