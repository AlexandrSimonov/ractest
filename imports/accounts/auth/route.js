FlowRouter.route('/auth', {
    action: function() {
    	BlazeLayout.render('app', {layout : "_auth" });
    }
});