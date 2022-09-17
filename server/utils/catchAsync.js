//Utility for catchhing async errors in controllers
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}