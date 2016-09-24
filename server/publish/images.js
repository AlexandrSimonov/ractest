import { Images } from '../../imports/collections/images.js';

Meteor.publish("images", function(id){
	return Images.find(id); 
});

Images.allow({
  'insert' : function(){
    return true;
  },
  'update' : function(){
  	return true;
  },
  'remove' : function(){
  	return true;
  },
  'download' : function(){
	  return true;
  }
});