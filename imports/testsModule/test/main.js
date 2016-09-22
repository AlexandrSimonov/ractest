import { Tests } from '../../collections/tests.js';

var status = new ReactiveVar("info");
var i = new ReactiveVar(0);
var isLast = new ReactiveVar(false);
var idPass = ""; 

Template.test.onCreated(function(){
	status.set("info");
	
	Session.set("test", Tests.findOne(FlowRouter.getParam("_id")));
	
	/*Meteor.call("isAllFinish", FlowRouter.getParam("_id"), function(err, res){
		
		if(res.isNew){
			//Проверить, если тест не линейный, то установить номер начала
			i.set(0);
		}
		else{
			i.set(res.askNumber);
			if(i.get() + 1 == Session.get("test").asks.length){
				isLast.set(true);
			}
		}

		idPass = res.idPass;

	});*/
	
});

Template.test.helpers({
	test : function(){
		return Session.get("test");
	},
	isInfo : function(){
		return status.get() == "info";	
	},
	isTest : function(){
		return status.get() == "test";
	},
	isResult : function(){
		return status.get() == "result";
	}
});

Template.info.events({
	'click #start' : function(e, t){
		status.set("test");
	}
});

Template.testing.onCreated(function(){

});

Template.testing.helpers({
	currentAsk : function(){
		return Session.get("test").asks[i.get()];
	},
	isLast : function(){
		return isLast.get();
	}
});

Template.testing.events({
	'click #next' : function(e, t){
		i.set(i.get() + 1); 
	},
	'click #answer' : function(e, t){
		/*
		var askNumber = null;
		
		if(Session.get("test").type.split("-")[0] == "line"){
			askNumber = i.get() + 1;
		}
		else{
			askNumber = "Чему-то, что будет зависить от ответа на предыдущий вопрос";

			//Проверяем на наличие свойства isLast;
		}

		Meteor.call('insertAnswer', FlowRouter.getParam("_id"), idPass, i.get(), Number($("input[name='isTrue']:checked")[0].value), askNumber);
		
		if(isLast.get()){
			
			status.set("result");
			Meteor.call('finishTest', FlowRouter.getParam("_id"), idPass);
			i.set(0);
			isLast.set(false);
			return 0;

		}

		i.set(askNumber);

		if(i.get() + 1 == Session.get("test").asks.length){
			isLast.set(true);
		}*/

	}
});
