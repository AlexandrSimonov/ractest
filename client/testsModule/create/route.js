FlowRouter.route('/test/create', {
    action: function() {
        BlazeLayout.render('app', { layout: "createTest" });
    }
});