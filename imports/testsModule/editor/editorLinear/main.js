import { Tests } from '../../../collections/tests.js';

Session.set("isShowAskBlock", false);

Session.set("ask", false);

Template.editorLinear.helpers({
	asks : function(){
		if(Meteor.subscribe("test", FlowRouter.getParam('_id')).ready()){
			return Tests.findOne(FlowRouter.getParam('_id')).asks;
		}
	},
	addOption : function(){
		return Session.get("isShowAskBlock");
	},
	_ask : function(){
		return Session.get("ask");
	}
});

Template.editorLinear.events({
	'click #addAsk' : function(e, t){
		Session.set("isShowAskBlock", true);
	},
	'click .ask-linear' : function(e, t){

		a = Tests.findOne(FlowRouter.getParam('_id')).asks;
		
		for(var i = 0; i < a.length; i++){
			if(a[i]._id == Number(e.target.id.split("-")[1])){
				Session.set("ask", a[i]);
			}
		}

		Session.set("isShowAskBlock", true);	
	}
});

Template.ask.helpers({
	textMod : function(text){
		if(text.length > 100){
		  	return text.substr(0, 60) + "...";
		}
		return text;	
	}
});


var dragObj = null;

$("body").on('dragstart', ".ask-linear", function(e){
	dragObj = this;
});

$("body").on('dragover', ".ask-linear", function(e){
	e.preventDefault();
});

$("body").on('drop', ".ask-linear", function(e){
	e.preventDefault();
	if(dragObj != this){
		Meteor.call("swapAsk", FlowRouter.getParam("_id"), dragObj.id.split("-")[1], this.id.split("-")[1]);
	}
});