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

const headerValidation = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next({ statusCode: 401, message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || typeof (authorization) !== 'string') {
    return next({ statusCode: 401, message: 'Token inválido' });
  }
  next();
};

const nameValidation = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    return next({ statusCode: 400, message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return next({ statusCode: 400, message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const ageValidation = (req, _res, next) => {
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

const watchedValidation = (req, _res, next) => {
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

const rateValidation = (req, _res, next) => {
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

const talkValidation = (req, _res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return next({ statusCode: 400, message: 'O campo "talk" é obrigatório' });
  }
  watchedValidation(req, _res, next);
  rateValidation(req, _res, next);
};

const bodyValidation = (req, _res, next) => {
  nameValidation(req, _res, next);
  ageValidation(req, _res, next);
  talkValidation(req, _res, next);
  next();
};

const watchedQueryValidation = (req, _res, next) => {
  const { date } = req.query;
  const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
  if (date && !dateFormat.test(date)) {
    return next({ 
      statusCode: 400, 
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"', 
    });
  }
  next();
};

const rateQueryValidation = (req, _res, next) => {
  const { rate } = req.query;
  const rateN = Number(rate);
  if (rate && (!Number.isInteger(rateN) || rateN < 1 || rateN > 5)) {
    return next({ 
      statusCode: 400, 
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5', 
    });
  }
  next();
};

module.exports = {
  emailValidation,
  passwordValidation,
  headerValidation,
  bodyValidation,
  watchedQueryValidation,
  rateQueryValidation,
};
