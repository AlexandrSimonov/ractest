import { Statistics } from '../statistics.js';

Meteor.publish("statistic", function(id){
	return Chats.find(id);
});
