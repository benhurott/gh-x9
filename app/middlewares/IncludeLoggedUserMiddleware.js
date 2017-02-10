module.exports = function(app) {
    return function(req, res, next) {
        res.locals.loggedUser = {
            id: 1,
            name: 'benhur.ott'
        }

        next();
    }
}