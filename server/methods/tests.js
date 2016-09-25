import { Tests } from '../../imports/collections/tests.js';

Meteor.methods({
	'addTest' : function(test){
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

	}
});