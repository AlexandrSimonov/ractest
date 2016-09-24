import { Chats } from '../../imports/collections/chats.js';

Meteor.publish("chat", function(id){
	return Chats.find(id);
});
