import { Query } from '../../imports/collections/query.js';

Meteor.publish("allQuery", function(){
	return Query.find();
});

