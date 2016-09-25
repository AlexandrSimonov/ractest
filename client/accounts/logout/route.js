FlowRouter.route('/exit', {
    action: function() {
    	Meteor.logout(/*
		Вызов ошибок(сделать как буду дома)
    	function(err, res){
    		if(err){
    			console.log("sadasd");
    		}
    	}*/);
    	FlowRouter.go('/auth');
    }
});