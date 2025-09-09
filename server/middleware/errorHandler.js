const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "File is too large (3MB Maximum)"});
  }

  if (err.message === "Invalid file type") {
    return res.status(400).json({ message: "Only .jpg, .jpeg, .png files are allowed!"});
  }
}

module.exports = errorHandler;
