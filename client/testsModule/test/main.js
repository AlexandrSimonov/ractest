import { Tests } from '../../../imports/collections/tests.js';
import { Statistics } from '../../../imports/collections/statistics.js';

var status = new ReactiveVar("info");
var i = new ReactiveVar(0);
var test = new ReactiveVar();
var continueTest = new ReactiveVar(false);
function end(){
	status.set("result");
	Meteor.call("finishStat", idStat.get());
}

Template.test.onCreated(function(){
	status.set("info");
	test.set(Tests.findOne(FlowRouter.getParam("_id")));

	Meteor.call("checkStat", test.get()._id, function(err, res){
		
		Meteor.subscribe("statistic", res.id);

		idStat.set(res.id);
		
		if(!res.isNew){
			continueTest.set(true);
		}

	});
});

Template.test.helpers({
	
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

Template.info.helpers({
	_continueTest : function(){
		return continueTest.get();
	}
});

var skipMode = new ReactiveVar(false); 

/*
	Если skipMode = true

	Значит человек дошел до последнего теста и нужно проверять на пропущенные 
*/

Tracker.autorun(function(){
	if(test.get() && idStat.get() && skipMode.get()){

		var stat = Statistics.findOne(idStat.get());	

		if(stat){
			
			var fl = true;
			
			for(var j = 0; j < stat.answers.length; j++){
				if(!("value" in stat.answers[j])){
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

Template.continueTest.events({
	'click #continue' : function(){
		
		if(test.get().type.split("-")[0] == "line"){
			var stat = Statistics.findOne(idStat.get());	

			for(var j = 0; j < stat.answers.length; j++){
				if("value" in stat.answers[j]){
					i.set(j);
					skipMode.set(true);
					break;
				}
			}
		}
		
		status.set("test");

	},
	'click #notContinue' : function(){

		Meteor.call("finishAndNew", test.get()._id, idStat.get(), function(err, res){
		
			Meteor.subscribe("statistic", res.id);

			idStat.set(res.id);

			i.set(0);

		}); 

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
