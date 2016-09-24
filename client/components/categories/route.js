FlowRouter.route('/categories', {
    action: function() {
        BlazeLayout.render('app', { layout: "categories" });
    }
});

FlowRouter.route('/categories/:name', {
    action: function(params) {
        BlazeLayout.render('app', { layout: "categories" });
    }
});