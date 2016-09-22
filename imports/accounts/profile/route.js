FlowRouter.route('/profile', {
    action: function() {
    	BlazeLayout.render('app', { layout : "profile" });
    }
});