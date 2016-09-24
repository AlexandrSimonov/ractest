import { Categories } from '../../imports/collections/categories.js';

Meteor.startup(function(){
	/*Categories.insert({ name : "zdorov", title : "Здоровье", subscribers : [], subCategories : [], countTest : 0, description : "Категория с тестами об здоровье", icon : "1.svg", isPublic : true, index : true});
	var _id = Categories.insert({ name : "fizra", title : "Физра", subscribers : [], subCategories : [], countTest : 0, description : "Категория с тестами об физре", icon : "8.svg", isPublic : true});
	var _id2 =  Categories.insert({ name : "angl", title : "Англ", subscribers : [], subCategories : [], countTest : 0, description : "Категория об англ языке", icon : "8.svg", isPublic : true});
	var _id1 = Categories.insert({ name : "inLang", title : "Иностранные языки", subscribers : [], subCategories : [_id2], countTest : 0, description : "Категория с тестами об физре", icon : "8.svg", isPublic : true});
	Categories.insert({ name : "ycheba", title : "Учеба", subscribers : [], subCategories : [_id, _id1], countTest : 0, description : "Категория с тестами об учебе", icon : "5.svg", isPublic : true, index : true});
	*/
});

Meteor.publish("allCategories", function(){
	return Categories.find({ isPublic : true }, { fields: {
 		title : 1
	  }});
});

Meteor.publish("categories", function () {
  return Categories.find({ index : true, isPublic : true }, { fields: {
    subscribers : 0
  }});
});


Meteor.publish("subCategories", function(name){
	var temp = Categories.findOne({ isPublic : true, name : name }, { fields : {
		subCategories : 1
	}});
	if(temp.subCategories.length > 0){
		return Categories.find({ isPublic : true, _id : { $in : temp.subCategories } }, { fields: {
			subscribers : 0
		}});
	}
});
/*
Meteor.methods({
	addCategoria : function(title, desc, path, picture){

	}
});*/