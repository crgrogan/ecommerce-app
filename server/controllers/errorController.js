// handle duplicates
const handleDuplicateKeyError = (err, res) => {
  const field = Object.keys(err.keyValue);
  const code = 409;
  const error = `A user with that ${field} already exists.`;
  res.status(code).send({ msg: error, fields: field });
};

// handle field formatting, empty fields, and mismatched passwords
const handleValidationError = (err, res) => {
  let errors = Object.values(err.errors).map((el) => el.message);
  let fields = Object.values(err.errors).map((el) => el.path);
  let code = 400;

  if (errors.length > 1) {
    const formattedErrors = errors.join(" ");
    res.status(code).send({ msg: formattedErrors, fields: fields });
  } else {
    res.status(code).send({ msg: errors[0], fields: fields });
  }
};

// error controller function
export default (err, req, res, next) => {
  try {
    if (err.name === "ValidationError")
      return (err = handleValidationError(err, res));
    if (err.code && err.code == 11000)
      return (err = handleDuplicateKeyError(err, res));
  } catch (err) {
    res.status(500).send("An unknown error occured.");
  }
};
