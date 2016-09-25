import { Categories } from '../../../imports/collections/categories.js';

Template.categories.helpers({
	categories : function(){
		if(FlowRouter.getParam("name")){
			//Проверить, если есть такая категория, то ок если нет, то не ок
			/*if(Meteor.subscribe('subCategories', FlowRouter.getParam("name")).ready()){
				console.log();
				/*var cat = Categories.find().fetch()
				if(cat.length > 0){
					return cat;
				}
				else{

				}
				/
				//return Categories.find().fetch();
			}*/
			Meteor.subscribe('subCategories', FlowRouter.getParam("name"), function(err, res){
				console.log(err, res);
			});
		}
		else{
			if(Meteor.subscribe('categories').ready()){
				return Categories.find({ index : true }).fetch();
			}
		}
	}
});
