import { Query } from '../../imports/collections/query.js';


var status = [{name : "new", title : "Новый"}, {name : "ok", title : "Готов"}, {name: "cancel", title: "Отменен"}, {name: "active", title : "В работе"}]

Template.admin.onCreated(function(){
	Meteor.call("isAdmin", function(error, result){
		Session.set("admin", result);
	});
});

Template.admin.helpers({
	admin : function(){
		return Session.get("admin");	
	}
});

Template.auth.events({
	'submit #auth' : function(e, t){
		e.preventDefault();
		Meteor.call("setAdmin", e.target.pass.value);
	}
});

Template.adminka.helpers({
	'query' : function(){
		if(Meteor.subscribe("allQuery").ready()){
			return Query.find().fetch();
		};
	}
});

Template._query.helpers({
	'type' : function(label){
		if(label == "newCategoria"){
			return "Новая категория";
		}
	},
	'isSelected' : function(value, value2){
		return value == value2;	
	},
	'status' : function(){
		return status;
	},
	'isShow' : function(value){
		return value == "new" || value == "active";
	}
});

Template._query.events({
	'change .status' : function(e, t){
		Meteor.call('setStatus', this.q._id, e.target.value);
	},
	'click .chatButton' : function(e, t){
		Meteor.call('chat', this.q._id, this.q.desc, this.q.user, function(error, result){
			console.log("as");
			console.log(result);
			FlowRouter.go("/chat/"+result);
		});
	}
});
