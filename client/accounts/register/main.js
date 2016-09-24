Template._register.onCreated(function(){
      document.title = "Регистрация";
});

Template._register.events({
	'submit #registerForm' : function(e, t){
		
            e.preventDefault();
		
            Accounts.createUser({
                  email : e.target.email.value,
                  password : e.target.password.value
		});

            FlowRouter.go("/profile");
	}
});