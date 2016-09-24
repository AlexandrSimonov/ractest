import { Statistics } from '../../imports/collections/statistics.js';

Meteor.publish("statistic", function(id){
	return Statistics.find(id);
});
