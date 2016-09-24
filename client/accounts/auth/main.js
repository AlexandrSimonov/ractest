Template._auth.onCreated(function(){
	document.title = "Авторизация";
});

Template._auth.events({
	'submit #authForm' : function(e, t){
	    e.preventDefault();
	    Meteor.loginWithPassword(e.target.email.value, e.target.password.value, function(err){
	    	if(err){
	    		FlashMessages.sendError("Вход не удался. Проверьте e-mail и пароль");
	    	}
	    	else{
	    		FlowRouter.go("/profile");
	    	}
	    });
	}
});