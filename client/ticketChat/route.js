FlowRouter.route('/chat/:_id', {
    action: function() {
        BlazeLayout.render('app', { layout: "chat" });
    }
});