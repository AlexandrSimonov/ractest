import { Tests } from '../../../imports/collections/tests.js';

var status = new ReactiveVar("info");
var i = new ReactiveVar(0);
var stat = "";
var isLast = ReactiveVar(false);
Template.test.onCreated(function(){
	status.set("info");
	
	Session.set("test", Tests.findOne(FlowRouter.getParam("_id")));
	
	Meteor.call("checkStat", Session.get("test")._id, function(err, res){
		
		stat = res;

		if(!res.isNew){
			Session.set("window", true);
		}
		
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

Template.testing.helpers({
	currentAsk : function(){
		return Session.get("test").asks[i.get()];
	},
	isLine : function(){
		return Session.get("test").type.split("-")[0] == "line";
	},
	isLast : function(){
		return isLast.get();
	}
});

Template.testing.events({
	'click #skip' : function(e, t){
		if(Session.get("test").type.split("-")[0] == "line"){
			Meteor.call("skipAnswer", stat.id, i.get());
			i.set(i.get() + 1); 
		}
	},
	'click #answer' : function(e, t){
		Meteor.call("addAnswer", stat.id, { num : i.get(), value : Number($("input[name='isTrue']:checked")[0].value) });

		if(Session.get("test").type.split("-")[0] == "line"){
			if(i.get() + 1 == Session.get("test").asks.length){ 
				status.set("result");
				Meteor.call("finishStat", stat.id);
			}
			else{
				i.set(i.get() + 1);
			}
		}
		else{
			askNumber = "Чему-то, что будет зависить от ответа на предыдущий вопрос";
		}
	},
	'click #over' : function(){
		console.log("Закончить тест");
	}
});

Template.result.events({
	'click #reset' : function(){
		Meteor.call("checkStat", Session.get("test")._id, function(err, res){
		
			stat = res;
			i.set(0);
			status.set("test");
		});
	}
});

Template.windowContinue.events({
	'click #continue' : function(){
		
		if(Session.get("test").type.split("-")[0] == "line"){
			if(stat.answers.length > 0){
				if(stat.answers.length == Session.get("test").asks.length){
					//Значит тест окончен
					console.log("Ошибка");
				}
				else{
					i.set(stat.answers.length);
				}
			}
			else{
				i.set(0);
			}
		}

		Session.set("window", false);
		status.set("test");
	},
	'click #notContinue' : function(){
		
		Meteor.call("finishAndNew", Session.get("test")._id, stat.id, function(err, res){
		
			stat = res;
			i.set(0);

		}); 

		Session.set("window", false);
		status.set("test");
	}
});


Tracker.autorun(function(){
	if(i.get() + 1 == Session.get("test").asks.length){
		isLast.set(true);

		/*Нужно спросить, желает ли человек ответить на вопросы, которые он пропустил*/
	}
});
/*
*
*
*
*
*	Описать поведение для пропусков ответов
*	Ответ в не линейном тесте нельзя пропустить +
*	Если дошли до последнего вопроса, то отметить флаг, что уже пошло всё по второму кругу
*	Добавить возможность посмотреть все вопросы(переход к вопросам)
*
*
*
*
*
*/