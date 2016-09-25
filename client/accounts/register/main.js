Template._register.onCreated(function(){
      document.title = "Регистрация";
});

Template._register.events({
	'submit #registerForm' : function(e, t){
		
            e.preventDefault();

		if(e.target.password.value != e.target.repeatPassword.value){
                  FlashMessages.sendError("Не удалось создать аккаунт. Вы не верно повторили пароль");
                  return false;
            }
            // Добавить другие проверки
            Accounts.createUser({
                  email : e.target.email.value,
                  password : e.target.password.value
		}, function(err){
                  if(err){
                        //Посмотреть какие ошибки есть, обработать)
                        console.log(err);
                        FlashMessages.sendError("Не удалось создать аккаунт");
                  } 
                  else{
                        FlowRouter.go("/profile");
                  }
            });


            
	}
});
