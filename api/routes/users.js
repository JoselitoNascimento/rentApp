/**
 * Arquivo: src/routes/users.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Users'.
 * Data: 29/08/2021
 * Author Joselito Nascimento
 */

const router = require('express-promise-router')();
const { check } = require('express-validator');
const usersController = require('../controllers/usersController');

// ==> Definindo as rotas do CRUD - 'User':

// ==> Rota responsável por listar todos os 'Usuarios': (GET): localhost:3000/users
router.get('/users', usersController.listAllUsers);

// ==> Rota responsável por criar um novo 'usuarios': (POST): localhost:3000/users
router.post('/users', [
  check('email').isEmail().withMessage("email inválido!"),
  check('password').isLength({ min: 8, max: 20 }).withMessage("tamanho de senha inválido!"),
  check('perfilId').isInt({ min: 1 }).withMessage("perfil de usuário inválido!"),
  check('entidadeId').isInt({ min: 1 }).withMessage("código do usuário inválido no cadastro de entidades!"),
  check('status').isIn(['A', 'I']).withMessage("situação do usuário inválida!")
], usersController.createUser);

// ==> Rota responsável por logar 'Usuario': (GET): localhost:3000/user
router.post('/user', [
  check('email').isEmail().withMessage("email inválido!"),
  check('password').isLength({ min: 8, max: 20 }).withMessage("tamanho de senha inválido!")
], usersController.loginUser);

module.exports = router;
