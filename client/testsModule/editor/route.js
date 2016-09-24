import { Tests } from '../../../imports/collections/tests.js';

FlowRouter.route('/test/editor/:_id', {
	action : function(){
		Meteor.subscribe("test", FlowRouter.getParam("_id"), function(){
			
			test = Tests.findOne(FlowRouter.getParam("_id"));

			if(test){
				if(test.type.split("-")[0] == "notLine"){
					BlazeLayout.render('app', { layout : "editorNotLinear" });
				}
				else{
					BlazeLayout.render('app', {layout : "editorLinear" });
				}
			}
			else{
				FlowRouter.go("/profile");
			}
		});

		
	}
});