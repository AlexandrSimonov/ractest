import { Categories } from '../../collections/categories.js';
import { Images } from '../../collections/images.js';

Template.createTest.onCreated(function(){
	this.limited = new ReactiveVar(false);
	this.access = new ReactiveVar(true);

});

Template.createTest.helpers({
	isLimited : function(){
		return Template.instance().limited.get();
	},
	access : function(){
		return Template.instance().access.get();
	},
	categories : function(){
		if(Meteor.subscribe("allCategories").ready()){
			return Categories.find().fetch();
		}
	}
});

Template.createTest.events({
	'change .time' : function(e, t){
		if(e.currentTarget.value == "limited"){
			t.limited.set(true);
		}
		else{
			t.limited.set(false);
		}
	},
	'change .access' : function(e, t){
		if(e.currentTarget.value == "all"){
			t.access.set(true);
		}
		else{
			t.access.set(false);
		}
	},
	'submit #test' : function(e, t){
		
		e.preventDefault();
		var test = {}
		
		if(e.target.title.value != "" && e.target.desc.value != ""){
			test.title = e.target.title.value;
			test.description = e.target.desc.value;
		}
		else{
			return false;
		}

		if(e.target.img.files[0]){
			test.img = Images.insert(e.target.img.files[0])._id;
		}
		

		if(e.target.time.value == "limited"){
			var time = Number(e.target.hours.value) * 3600 + Number(e.target.minutes.value) * 60 + Number(e.target.seconds.value);
			if(time > 0){
				test.limited = time;
			}
			else{
				return false;
			}
			
		}
		else{
			test.limited = false;
		}

		if(e.target.access.value == "all"){
			test.access = true;

			test.categoria = e.target.categoria.value;
		}
		else{
			test.access = false;
		}
		
		test.type = e.target.type.value;

		test.user = Meteor.userId();

		Meteor.call("addTest", test, function(err, res){
			FlowRouter.go("/test/editor/"+res);
		});
	}
});