import { Tests } from '../collections/tests.js';

Meteor.methods({
	'addTest' : function(test){
		test.statistic = [];
		return Tests.insert(test);
	},
	'newAsk' : function(idTest, ask){
		a = Tests.findOne(idTest).asks;
		if(a){
			id = a.length;
		}
		else{
			id = 0;
		}
		
		
		ask._id = id;
		
		Tests.update(idTest, {$push : {asks : ask}});	
	},
	'updateAsk' : function(idTest, idAsk, ask){
		/*ОЧЕНЬ Дурацкий блок*/
		
		a = Tests.findOne(idTest).asks;

		for(var i = 0; i < a.length; i++){
			if(a[i]._id == idAsk){
				var tmp = {};
				_tmp = "asks." + i;
				tmp[_tmp] = ask;
			}
		}

		Tests.update(idTest, { $set : tmp })
	},
	'swapAsk' : function(idTest, id1, id2){
		
		var asks = Tests.findOne(idTest).asks;
		
		var id_1, id_2;
		
		for(var i = 0; i < asks.length; i++){
			if(asks[i]._id == id1){
				id_1 = i;
			}
			if(asks[i]._id == id2){
				id_2 = i;
			}
		}
		
		if(asks[id_1] && asks[id_2]){
			var c = asks[id_1];
			asks[id_1] = asks[id_2];
			asks[id_2] = c;
		}

		Tests.update(idTest, { $set : {asks : asks}});

	},
	/*
	'insertAnswer' : function(idTest, idPass, idAsk, answer, askNumber){
		var testStatistic = Tests.findOne(idTest).statistic;
		
		for(var i = 0; i < testStatistic.length; i++){
			if(idPass == testStatistic[i].idPass){
				
				tmp = {};
				str = "statistic." + i + ".answers";
				tmp[str] = { idAsk : idAsk, answer : answer };

				tmp_1 = {};
				str = "statistic." + i + ".askNumber";
				tmp_1[str] = askNumber;

				Tests.update(idTest, { $push :  tmp });
				Tests.update(idTest, { $set : tmp_1 });
			}
		}

	},
	'isAllFinish' : function(idTest){
		var testStatistic = Tests.findOne(idTest).statistic;
		var userStatistic = Meteor.user().statistic;

		if(userStatistic){
			for(var i = 0; i < userStatistic.length; i++){
				if(userStatistic[i].idTest == idTest){
					for(var j = 0; j < testStatistic.length; j++){
						if(userStatistic[i].idPass == testStatistic[j].idPass && testStatistic[j].notFinish){
							return {idPass : testStatistic[j].idPass, isNew : false, askNumber : testStatistic[j].askNumber };
						}
					}
				}
			}
		}

		var id = CryptoJS.SHA256(new Date().getTime().toString() + Meteor.userId()).toString();
		
		Tests.update(idTest, { $push : { statistic : { idPass : id, userId : Meteor.userId(), answers : [], notFinish : true }}});
		Meteor.users.update(Meteor.userId(), { $push : { statistic : { idTest : idTest, idPass : id }}});

		return { idPass : id, isNew : true };

	},
	'finishTest' : function(idTest, idPass){
		var testStatistic = Tests.findOne(idTest).statistic;
		
		for(var i = 0; i < testStatistic.length; i++){
			if(idPass == testStatistic[i].idPass){
				
				var tmp = {};
 				var tmp_1 = {};

				_tmp = "statistic." + i + ".notFinish";
				tmp[_tmp] = 1;

				_tmp = "statistic." + i + ".askNumber";
				tmp_1[_tmp] = 1;

				Tests.update(idTest, {$unset : tmp })
				Tests.update(idTest, {$unset : tmp_1})
			}
		}
	}*/
});