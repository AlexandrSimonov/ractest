import { Categories } from '../../imports/collections/categories.js';

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
