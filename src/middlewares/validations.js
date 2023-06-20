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

const postHeaderValidation = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({ statusCode: 401, message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || typeof (authorization) !== 'string') {
    return next({ statusCode: 401, message: 'Token inválido' });
  }
  next();
};

const postNameValidation = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    return next({ statusCode: 400, message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return next({ statusCode: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const postAgeValidation = (req, _res, next) => {
  const { age } = req.body;
  if (!age) {
    return next({ statusCode: 400, message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || age < 18) {
    return next({ 
      statusCode: 400, 
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18', 
    });
  }
  next();
};

const postTalkValidation = (req, _res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return next({ statusCode: 400, message: 'O campo "talk" é obrigatório' });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  postHeaderValidation,
  postNameValidation,
  postAgeValidation,
};
