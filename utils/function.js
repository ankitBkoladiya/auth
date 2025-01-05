const responseHandler = (res, options = {}) => {
    const {
      success = true,
      messageCode = '',
      message = '',
      data = null,
      status = 200
    } = options;
  
    res.status(status).json({
      success,
      messageCode,
      message,
      data
    });
  };
  
  module.exports ={ responseHandler};
  