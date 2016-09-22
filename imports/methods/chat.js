import { Chats } from '../collections/chats.js';

function EmailNotification(email, text, chatId){
	console.log("to: " + email);
	console.log("Привет, ты оставлял заявку с текстом '" + text + "' на сайте RacTest.com. Если можно, то мы зададим тебе несколько вопросов <a href=localhost:3000/chat/"+chatId+">Welcome to chat</a>");
	//Meteor.call("addNotific", );
}

function notification(id, _idTicket){
	Meteor.call("addNotific", id, "Можете ответить на несколько вопросов? Перейдите в чат  <a href=/chat/"+_idTicket+">по ссылке</a> ");
}

Meteor.methods({
	'chat' : function(id, desc, user){
		if(Meteor.user().isAdmin){
			var chat = Chats.findOne({ idTicket : id });
			if(chat == null){
				_id = Chats.insert({ idTicket : id, messages : [{ writer : "user", message : desc}]});
				
				if(user.email){
					EmailNotification(user.email, desc, _id);
				}
				else{
					notification(user.id, _id);
				}
				return _id;
			}
			else{
				return chat._id;
			}
		}
	},
	'newMessage' : function(id, message){
		Chats.update(id, { $push : { messages : message } });
	}
});