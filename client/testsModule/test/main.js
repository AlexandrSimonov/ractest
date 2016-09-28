import { Tests } from '../../../imports/collections/tests.js';
import { Statistics } from '../../../imports/collections/statistics.js';

var status = new ReactiveVar("info");
var i = new ReactiveVar(0);
var test = new ReactiveVar();


function end(){
	status.set("result");
}

Template.test.onCreated(function(){
	status.set("info");
	test.set(Tests.findOne(FlowRouter.getParam("_id")));
	
});

Template.test.helpers({
	window : function(){
		return Session.get("window");
	},
	test : function(){
		return test.get();
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

var skipMode = new ReactiveVar(false); 

/*Если skipMode = true*/
/*
	Значит человек дошел до последнего теста и нужно проверять на пропущенные 
*/
Tracker.autorun(function(){
	if(test.get() && idStat.get() && skipMode.get()){

		var stat = Statistics.findOne(idStat.get());	

		if(stat){
			
			var fl = true;
			
			for(var j = 0; j < stat.answers.length; j++){
				if(!("value" in stat.answers[j])){
					console.log(j);
					i.set(j);
					fl = false;
					break;
				}
			}

			if(fl){
				end();
			}
		}
	}
});

Tracker.autorun(function(){
	if(test.get() && i.get() == test.get().asks.length){
		skipMode.set(true);
	}
});

var idStat = new ReactiveVar("");

Template.testing.onCreated(function(){
	
	Meteor.call("checkStat", test.get()._id, function(err, res){
		
		Meteor.subscribe("statistic", res.id);

		idStat.set(res.id);
		/*
		if(!res.isNew){
			Session.set("window", true);
		}*/

	});

	this.showAskList = new ReactiveVar(false);
});


Template.testing.helpers({
	currentAsk : function(){
		return test.get().asks[i.get()];
	},
	isLine : function(){
		return test.get().type.split("-")[0] == "line";
	},
	showAskList : function(){
		return Template.instance().showAskList.get();
	},
	skipMode : function(){
		return skipMode.get();
	}
});

var answers = new ReactiveVar([]);

Template.testing.events({
	'click #skip' : function(e, t){
		i.set(i.get() + 1);
	},
	'click #answer' : function(e, t){
		Meteor.call("addAnswer", idStat.get(),  i.get(), Number($("input[name='isTrue']:checked")[0].value));

		var arr = answers.get();

		arr.push(i.get());
		
		answers.set(arr);

		if(!skipMode.get()){
			i.set(i.get() + 1);
		}
	},
	'click #over' : function(){
		console.log("Закончить тест");
	},
	'click #askList' : function(e, t){
		t.showAskList.set(!t.showAskList.get());
	}
});

Template.result.events({
	'click #reset' : function(){
		/*Meteor.call("checkStat", test.get()._id, function(err, res){
		
			stat = res;
			i.set(0);
			status.set("test");
		});*/
	}
});

Template.windowContinue.events({
	'click #continue' : function(){
		
		if(test.get().type.split("-")[0] == "line"){
			//i.set(stat.get().answers.length);
		}

		Session.set("window", false);
		status.set("test");
	},
	'click #notContinue' : function(){
		
		Meteor.call("finishAndNew", test.get()._id, stat.id, function(err, res){
		
			Meteor.subscribe("statistic", res.id, function(){
				stat.set(Statistics.find(res.id));
			});
			i.set(0);

		}); 

		Session.set("window", false);
		status.set("test");
	}
});


Template.askList.helpers({
	list : function(){
		return test.get().asks;
	},
	incIndex : function(index){
		return ++index;
	},
	style : function(num){
		if(answers.get().indexOf(num) != -1){
			return {class : "answer-button"};
		}
		
		return { class : "default-button" };
	}	
});

Template.askList.events({
	'click .step' : function(e, t){
		i.set(Number(e.target.name.split("-")[1]));
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