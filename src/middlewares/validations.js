const emailValidation = (req, _res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!email) {
    return next({ statusCode: 400, message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
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
};

const postWatchedValidation = (req, _res, next) => {
  const { watchedAt } = req.body.talk;
  const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt) {
    return next({ statusCode: 400, message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateFormat.test(watchedAt)) {
    return next({ 
      statusCode: 400, 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"', 
    });
  }
};

const postRateValidation = (req, _res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return next({ statusCode: 400, message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return next({ 
      statusCode: 400, 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }
};

const postTalkValidation = (req, _res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return next({ statusCode: 400, message: 'O campo "talk" é obrigatório' });
  }
  postWatchedValidation(req, _res, next);
  postRateValidation(req, _res, next);
};

const postBodyValidation = (req, _res, next) => {
  postNameValidation(req, _res, next);
  postAgeValidation(req, _res, next);
  postTalkValidation(req, _res, next);
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  postHeaderValidation,
  postBodyValidation,
  
};
