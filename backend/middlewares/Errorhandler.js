//not found
const notfound = (req,resp,next)=>{
    const error = new Error(`page not found ${req.originalUrl}`)
    resp.status(404)
    next(error)
}
//error handle  
const errorHandle = (err,req,resp,next)=>{
     const statusCode = req.statusCode == 200 ? 500 : resp.statusCode;
     resp.status(statusCode)
     resp.json({
        message:err?.message,
        stack:err?.stack
     })
}

module.exports =  {notfound,errorHandle}