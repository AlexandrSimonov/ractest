import { Statistics } from '../collections/statistics.js';

Meteor.methods({
	//Проверка, закончены ли все прохождения теста. Создаем новое прохождение
	'checkStat' : function(idTest){
		
		var stat = Statistics.findOne({ idTest : idTest, idUser : Meteor.userId(), finish : false });
		
		if(stat){
			return { id : stat._id, isNew : false}
		}

		//finish флаг указывающий на то закончено ли прохождение
		var id = Statistics.insert({ idTest : idTest, idUser : Meteor.userId(), answers : [], finish : false });
		isNew  = true;

		return {id : id, isNew : true};
	},
	'addAnswer' : function(idStat, data){
		Statistics.update(idStat, {$push : {answers : data}});
	},
	
});