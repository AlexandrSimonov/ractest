import { Chats } from '../collections/chats.js';

Template.admin.onCreated(function(){
	Meteor.call("isAdmin", function(error, result){
		Session.set("_admin", result);
	});
});

Template.chat.helpers({
	'messages' : function(){
		if(Meteor.subscribe("chat", FlowRouter.getParam("_id")).ready()){
			if(Chats.findOne(FlowRouter.getParam("_id")) == null){
				FlowRouter.go("/categories");
			}
			else{
				return Chats.findOne(FlowRouter.getParam("_id")).messages;
			}
		}
	},
	'writer' : function(u){
		if(Session.get("_admin") && u == "admin" || !Session.get("_admin") && u == "user"){
			return true;
		}
		else{
			return false;
		}
	}
});

Template.chat.events({
	'submit #newMessage' : function(e, t){
		e.preventDefault();
		if(e.target.text.value != ""){
			if(Session.get("_admin")){
				us = "admin";
			}
			else{
				us = "user";
			}
			Meteor.call("newMessage", FlowRouter.getParam("_id"), {writer : us, message : e.target.text.value});
			e.target.text.value = "";
		}
	}
});