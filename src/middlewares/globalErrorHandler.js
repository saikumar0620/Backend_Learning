const globalErrorHandler = (err, req, res, _next) => {
  res.status(400).json({
    success: false,
    error: err.message,
    // message:err.message
  })
  
}
export default globalErrorHandler;