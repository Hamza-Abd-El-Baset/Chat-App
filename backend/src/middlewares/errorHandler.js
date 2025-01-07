export default (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({message})
}

export class CustomError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}