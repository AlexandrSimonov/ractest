import { Tests } from '../../../../imports/collections/tests.js';
import { Images } from '../../../../imports/collections/images.js';

Template.askBlock.onCreated(function(){

	this.typeAnswer = new ReactiveVar("oneTrue");

	if(this.data._ask){
		a = Tests.findOne(FlowRouter.getParam("_id")).asks;
		for(var i = 0; i < a.length; i++){
			if(a[i]._id == this.data._ask._id){
				Session.set("answers", a[i].answers);	
			}
		}
	}
	else{
		Session.set("answers", []);	
	}
});

Template.askBlock.helpers({
	answerOneTrue : function(){
		if(Template.instance().typeAnswer.get() == "oneTrue"){
			return true;
		}
	},
	answers : function(){
		return Session.get("answers");
	}
});

Template.askBlock.events({
	'click #close' : function(e, t){
		Session.set("ask", false);
		Session.set("isShowAskBlock", false);
	},
	'click #addAnswer' : function(e, t){
		arr = Session.get("answers");
		arr.push({});
		Session.set("answers", arr);
	},
	'submit #askForm' : function(e, t){

		e.preventDefault();


		
		if($('#answers').children("div").length == 0){
			console.log("Ошибка");
			return false;
		}
		
		const radio = $("#answers input[name='trueVar']:checked");

		if(radio.length != 1){
			console.log("Ошибка");
			return false;
		}
		

		var answers = Session.get("answers");
		
		const inputs = $("#answers input:text");

		for(var i = 0; i < inputs.length; i++){

			if(inputs[i].value){
				answers[i].text = inputs[i].value;
			}
			if(inputs[i].name.split("-")[1] == radio.val().split("-")[1]){
				answers[i].isTrue = true;
			}
			var inputFile = $("#answers input[name='imageAnswer-" + inputs[i].name.split("-")[1]+"']")[0];

			if(inputFile.files.length > 0){

				answers[i].images = [];

				for(var j = 0; j < inputFile.files.length; j++){
					if(inputFile.files[j]){
						answers[i].images.push(Images.insert(inputFile.files[j])._id);
					}
				}

			}
		}
		
		img = null;

		_img = $("input[name='images']")[0].files;
		
		if(_img.length > 0){
			img = [];
		}
		
		for(i = 0; i < _img.length; i++){
			img.push(Images.insert(_img[i])._id);
		}

		if(this._ask){
			Meteor.call('updateAsk', FlowRouter.getParam("_id"), this._ask._id, { answers : answers, text : e.target.askText.value, img : img, _id : this._ask._id });
			Session.set("ask", false);
		}
		else{
			if(img){
				Meteor.call('newAsk', FlowRouter.getParam("_id"), { answers : answers, text : e.target.askText.value, img : img });
			}
			else{
				Meteor.call('newAsk', FlowRouter.getParam("_id"), { answers : answers, text : e.target.askText.value });
			}
		}

		Session.set("isShowAskBlock", false);
		
	}
});
