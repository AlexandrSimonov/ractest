import { Tests } from '../../../imports/collections/tests.js';

var status = new ReactiveVar("info");
var i = new ReactiveVar(0);
var isLast = new ReactiveVar(false);//Модифицировать, пока что идей не очень много в 4:09...
var idStat = "";

Template.test.onCreated(function(){
	status.set("info");
	
	Session.set("test", Tests.findOne(FlowRouter.getParam("_id")));
	
	Meteor.call("checkStat", Session.get("test")._id, function(err, res){
		idStat = res.id;
		/*
		if(!res.isNew){
			if(confirm('Вы уже начинали проходить этот тест, желаете продолжить?')){
			    i.set(res.i);
			}
			else{
				//Нужно 
			}
		}	*/
		if(!res.isNew){
			Session.set("window", true);
		}
		/*Сделать модальное окно для проверки, если тест НЕ новый то предлогать продолжить прошлое прохождение*/
	});
	
});

Template.test.helpers({
	window : function(){
		return Session.get("window");
	},
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
	}
});

Template.testing.events({
	'click #next' : function(e, t){
		i.set(i.get() + 1); 
	},
	'click #answer' : function(e, t){

		Meteor.call("addAnswer", idStat, { num : i.get(), value : Number($("input[name='isTrue']:checked")[0].value) });

		if(Session.get("test").type.split("-")[0] == "line"){
			if(i.get() + 1 == Session.get("test").asks.length){ 
				Meteor.call("finishStat", idStat);
			}
			else{
				i.set(i.get() + 1);
			}
		}
		else{
			askNumber = "Чему-то, что будет зависить от ответа на предыдущий вопрос";
			//Проверяем на наличие свойства isLast;
		}

	}
});
