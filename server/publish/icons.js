import { Icons } from '../../imports/collections/icons.js';

Meteor.publish("icons", function(){
	return Icons.find(); 
});

Icons.allow({
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