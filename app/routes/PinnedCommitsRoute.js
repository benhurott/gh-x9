module.exports = function(app) {
    var ReqAdminMiddleware = app.middlewares.ReqAdminMiddleware;
    var CommitPinModel = app.models.CommitPinModel;

    app.get('/pinned-commits', ReqAdminMiddleware, function(req, res, next) {

        CommitPinModel.find()
            .sort([
                ['repository', 'ascending'],
                ['dateCreated', 'descending']
            ])
            .exec()
            .then(function (pins) {
                res.status(200).render('pinned-commits', {
                    pins: pins
                });
            })
            .catch(function (err) {
                next(err);
            });
    });
};
