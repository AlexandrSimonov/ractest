import { Chats } from '../chats.js';

Meteor.publish("chat", function(id){
	return Chats.find(id);
});
