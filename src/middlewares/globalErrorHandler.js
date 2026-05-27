// a class have properties and methods or functions 
// class can extends another class
export  class AppError extends Error{
  constructor(errorMessage, statusCode) { 
    super(errorMessage);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}


const globalErrorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: message,
    // message:err.message
  })
  
}
export default globalErrorHandler;