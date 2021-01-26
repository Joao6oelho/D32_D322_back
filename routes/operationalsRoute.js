const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const controllerProfessional = require('../controllers/operationalsControllers');

// Visualizar Operacionais
router.get('/', function (req, res) {
    controllerProfessional.listOperacionais(req, res)
});

// Visualizar Operacionais Livres
router.get('/livres', function (req, res) {
    controllerProfessional.listOperacionaisLivres(req, res)
});

// Visualizar Operacionais Ocupados
router.get('/ocupados', function (req, res) {
    controllerProfessional.listOperacionaisOcupados(req, res)
});

// Visualizar Operacional
router.get('/:cod_operational', function (req, res) {
    controllerProfessional.readOperacional(req, res)
});

//Visualizar Operacional consoante o seu cod_Posto
router.get('/posto/:rankGrad_cod_rankGrad', function (req, res) {
    controllerProfessional.readOperacionalByPosto(req, res);
});

//Visualizar Profissionais (cod_Posto != 101 e 102)
router.get('/api/profissionais', function (req, res) {
    controllerProfessional.listProfissionais(req, res);
});

// Criar Operacional
router.post('/posto/:rankGrad_cod_rankGrad', [
    body('cod_operational').isLength({ min: 1, max: 11 }).withMessage('Username should have between 1 and 11 characters'),
    body('name').not().isEmpty().isLength({ min: 1, max: 45 }).withMessage('Name should have between 1 and 45 characters'),
    body('email').isEmail().isLength({ min: 1, max: 45 }).withMessage('Email should be valid and contain up to 45 characters'),
    body('complement_address').isLength({ min: 1, max: 45 }).withMessage('Field should have between 1 and 45 characters'),
    body('formation').isLength({ min: 1, max: 45 }).withMessage('Field should have between 1 and 45 characters'),
    body('specialty_cod_specialty').not().isEmpty().withMessage('Specialty code must be filled'),
    body('localization_cod_localization').not().isEmpty().withMessage('Location code must be filled'),
    body('citizan_card').isLength({ min: 8, max: 8 }).withMessage('A valid ID is required'),
    body('birth_date').not().isEmpty().isDate().withMessage('A valid date is required'),
    body('type_operational').isLength({ min: 1, max: 45 }).withMessage('Field should have between 1 and 45 characters')
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(404).json({ errors: errors.array() });
    }
    controllerProfessional.createProfissional(req, res);
});

// Alterar dados Operacional
router.put('/:cod_operational', [
    body('name').not().isEmpty().withMessage('Name is a required field'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('complement_address').isLength({ min: 1, max: 45 }).withMessage('Field should have between 1 and 45 characters'),
    body('specialty_cod_specialty').not().isEmpty().withMessage('Specialty code must be filled'),
    body('rankGrad_cod_rankGrad').not().isEmpty().withMessage('Position code must be filled'),
    body('localization_cod_localization').not().isEmpty().withMessage('Location code must be filled'),
    body('citizan_card').isLength({ min: 8, max: 8 }).withMessage('A valid ID is required'),
    body('birth_date').not().isDate().withMessage('A valid date is required'),
    body('type_operational').isLength({ min: 1, max: 45 }).withMessage('Field should have between 1 and 45 characters')
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(404).json({ errors: errors.array() });
    }
    controllerProfessional.updateOperacional(req, res);
});

// Alterar o cod_Posto de um operacional
router.put('/:cod_operational/posto/:rankGrad_cod_rankGrad', function (req, res) {
    controllerProfessional.updatePosition(req, res)
});

// Eliminar Candidato
router.delete('/:cod_operational', function (req, res) {
    controllerProfessional.deleteCandidato(req, res);
})

module.exports = router;