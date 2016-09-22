Template.addCategoria.events({
   'submit #addForm': function(e, t){
      e.preventDefault();
      if(Meteor.user()){
        var user = { id : Meteor.userId() };
      }
      else{
        if(e.target._email.value != ""){
          user = { email : e.target._email.value };
        }
      }
      if(e.target.desc.value != "" && user){
        Meteor.call("addQuery", "newCategoria", e.target.desc.value, user);
      } 
      if(e.target._email){
        e.target._email.value = "";
      } 
      e.target.desc.value = "";
   }
});