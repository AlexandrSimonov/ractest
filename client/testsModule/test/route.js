import { Tests } from '../../../imports/collections/tests.js';

FlowRouter.route('/test/:_id', {
	action : function(){
		Meteor.subscribe("test", FlowRouter.getParam("_id"), function(){
			
			test = Tests.findOne(FlowRouter.getParam("_id"));

			if(test){
				BlazeLayout.render('app', { layout : "test" });
			}
			else{
				FlowRouter.go("/profile");
			}
		});

		
	}
});