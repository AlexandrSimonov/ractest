import { Tests } from '../../imports/collections/tests.js';

Meteor.publish("test", function(id){
	return Tests.find(id, {fields: { "asks.answers.isTrue" : 0 }});
});

