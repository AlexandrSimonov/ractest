FlowRouter.route('/exit', {
    action: function() {
    	Meteor.logout();
    	FlowRouter.go('/auth');
    }
});