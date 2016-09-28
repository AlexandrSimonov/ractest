import { Statistics } from '../../imports/collections/statistics.js';
import { Tests } from '../../imports/collections/tests.js';

/*
*/

Meteor.methods({
	'newStat' : function(idTest){
		var test = Tests.findOne(idTest);
		
		var answers = [];

		for(var i = 0; i < test.asks.length; i++){
			answers.push({});
		}

		var id = Statistics.insert({ idTest : idTest, idUser : Meteor.userId(), answers : answers, finish : {end : false} });

		return id;
	
	},
	'checkStat' : function(idTest){
		
		var stat = Statistics.findOne({ idTest : idTest, idUser : Meteor.userId(),  finish : { end : false} });
		
		if(stat){
			return { id : stat._id, isNew : false };
		}

		var id = Meteor.call("newStat", idTest);

		return { id : id, isNew : true };
		//finish флаг указывающий на то закончено ли прохождение
		
	},
	'addAnswer' : function(idStat, num, value){
		Statistics.update(idStat, {$set : { ["answers." + num + ".value"] : value }});
	},
	'finishStat' : function(idStat){
		Statistics.update(idStat, {$set : { finish : { end : true } }});
	},
	'finishAndNew' : function(idTest, idStat){
		Statistics.update(idStat, {$set : { finish : { end : true, isAll : false }}});

		var id = Meteor.call("newStat", idTest);

		return { id : id };
		 	
	}
});