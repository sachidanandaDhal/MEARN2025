const errorMiddleware = (err, req, res, next) => {
 const status = err.status || 500;
 const message = err.message || "BACKEND ERROR";
 const extraDetails = err.extraDetails || "No additional details";

res.status(status).json({ message, extraDetails });
};
module.exports = errorMiddleware;