/*
	Подправить вход в админку
	Сделать на основе совпадения с другой таблицей

*/

const _pass = "monibuvycextredfvhgtynbjhg823ienvytlqcrkemvjsjryqkfbsyr";

Meteor.methods({
	isAdmin : function(){
		return Meteor.user().isAdmin;
	},
	setAdmin : function(pass){
		if(pass === _pass){
			Meteor.users.update(Meteor.userId(), {$set : { isAdmin : true }})
		}
	}
});