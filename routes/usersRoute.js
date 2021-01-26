const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const controllerUser = require('../controllers/userControllers');

// Visualizar Utilizadores
router.get('/', function (req, res) {
    controllerUser.listUtilizadores(req, res)
});

// Visualizar Utilizador
router.get('/:username', function (req, res) {
    controllerUser.readUtilizador(req, res)
});

// Criar Utilizador
router.post('/', [
    body('username').isLength({ min: 1, max: 11 }).withMessage('Username should have between 1 and 11 characters'),
    body('name').not().isEmpty().withMessage('Name is a required field'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('address').isLength({ max: 45 }).withMessage('Only 45 characters are allowed'),
    body('password').isLength({ min: 8, max: 15 }).withMessage('Password should have between 8 and 15 characters')
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(404).json({ errors: errors.array() });
    }
    controllerUser.createUtilizador(req, res);
});

// Alterar dados Utilizador
router.put('/:username', [
    body('name').not().isEmpty().withMessage('Name is a required field'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('address').isLength({ max: 45 }).withMessage('Only 45 chars are allowed'),
    body('password').isLength({ min: 8, max: 15 }).withMessage('Password should have between 8 and 15 chars')
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(404).json({ errors: errors.array() });
    }
    controllerUser.updateUtilizador(req, res);
});

// Eliminar um Utilizador
router.delete('/:username', function (req, res) {
    controllerUser.deleteUtilizador(req, res);
});


module.exports = router;