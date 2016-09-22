import { Query } from '../query.js';

/*
Cheme

{ label : "Добавить категорию | Есть идея для теста | Нашли ошибку | ...", user : { auth : true, id : _id | auth : false, email : email }, messages : [], status : "Новое | Сделано" | "Работаем" | "Отложено" | "Не будем делать"}
*/

Meteor.publish("allQuery", function(){
	return Query.find();
});

Meteor.methods({
	'addQuery' : function(label, desc, user){
		Query.insert({label : label, desc : desc, user : user, status : "new" });
	},
	'setStatus' : function(id, value){
		Query.update(id, { $set : { status : value }});
	}
});