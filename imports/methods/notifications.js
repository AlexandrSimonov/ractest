Meteor.methods({
	'addNotific' : function(id, text){
		Meteor.users.update(id, { $push : { notifications : text } });
	},
	'delNotific' : function(id){
		/*Дурацкий блок*/
		var tmp = {};
		_tmp = "notifications." + id;
		tmp[_tmp] = 1;
		/*-------------*/
		Meteor.users.update(Meteor.userId(), {$unset : tmp }) 
		Meteor.users.update(Meteor.userId(), {$pull : {"notifications" : null}})
	}
});