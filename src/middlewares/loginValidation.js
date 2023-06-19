const emailValidation = (req, _res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!email) {
    return next({ statusCode: 400, message: 'O campo "email" é obrigatório' });
  }
  if (email && !(regex.test(email))) {
    return next({ statusCode: 400, message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

const passwordValidation = (req, _res, next) => {
  const { password } = req.body;
  if (!password) {
    return next({ statusCode: 400, message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
     return next({ statusCode: 400, message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};
module.exports = {
  emailValidation,
  passwordValidation,
};