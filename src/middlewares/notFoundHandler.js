const notFoundHandler = (req,res,_next) => {
  res.status(404).json({
    success: false,
    message: `the requsted url ${req.method} ${req.originalUrl} is not found`
  })
}
export default notFoundHandler;