const globalErrorHandler = (err, req, res, next) => {
  res.status(400).json({
    success:false,
    message:err.message
  })
  
}
export default globalErrorHandler;