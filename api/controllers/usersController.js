const db = require('../db');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const { validationResult } = require('express-validator');

// ==> Método responsável por criar um novo 'Usuario':

exports.createUser = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.status(400).send({ message: errors })
  }
  const { userName, email, password, perfilId, status, dt_inc, us_inc, entidadeId } = req.body;
  const pass = bcrypt.hashSync(req.body.password, salt)
  const { rows } = await db.query(
    "INSERT INTO users (userName, email, password, perfilId, status, dt_inc, us_inc, entidadeId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [userName, email, pass, perfilId, status, dt_inc, us_inc, entidadeId]
  );

  res.status(201).send({
    message: "user added successfully!",
    body: {
      product: { userName, email, password, perfilId, status, dt_inc, us_inc, entidadeId }
    },
  });
};

// ==> Método responsável por listar todos os 'Usuarios':
exports.listAllUsers = async (_, res) => {
  const response = await db.query('SELECT id, userName, email, password, perfilId, status, dt_inc, us_inc, entidadeId FROM users ORDER BY userName ASC');
  res.status(200).send(response.rows);
};

// ==> Método responsável por logar o 'Usuario':
exports.loginUser = async (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    return res.status(400).send({ message: errors })
  }
  const email = req.body.email;
  /*
    const password = bcrypt.hashSync(req.body.password, salt);
    const response = await db.query('SELECT user_name, perfil_id, entidade_id FROM usuarios WHERE email = $1 AND password = $2 ',
      [email, password]
    );
  */

  //const password = bcrypt.hashSync(req.body.password, salt);
  const password = req.body.password;
  const response = await db.query('SELECT id, userName, password, perfilId, entidadeId FROM users WHERE email = $1 ',
    [email]
  );

  if (response.rows.length == 0) {
    return res.status(400).send('usuário não cadastrado!');
  }

  const passHashedDB = response.rows[0].password;
  const match = await bcrypt.compare(password, passHashedDB);

  if (match) {
    return res.status(200).send(response.rows);
  } else {
    return res.status(400).send('usuário não cadastrado!');
  }

};
