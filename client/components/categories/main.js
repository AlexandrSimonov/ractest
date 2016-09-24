import { Categories } from '../../../imports/collections/categories.js';

Template.categories.helpers({
	categories : function(){
		if(FlowRouter.getParam("name")){
			if(Meteor.subscribe('subCategories', FlowRouter.getParam("name")).ready()){
				return Categories.find().fetch();
			}
		}
		else{
			if(Meteor.subscribe('categories').ready()){
				return Categories.find({ index : true }).fetch();
			}
		}
	}
});
