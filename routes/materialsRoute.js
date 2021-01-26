const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const controllerMaterial = require('../controllers/materialsControllers');

// Visualizar Materiais
router.get('/', function (req, res) {
    controllerMaterial.listMaterial(req, res)
});

// Visualizar um  Material
router.get('/:cod_material', function (req, res) {
    controllerMaterial.listOneMaterial(req, res)
});

//Criar Materaial
router.post('/', [
    body('cod_material').isLength({ min: 1, max: 11 }).withMessage('Material ID should have between 1 and 11 characters'),
    body('description').isLength({ max: 45 }).withMessage('Only 45 characters are allowed'),
    body('stock').isLength({ min: 1, max: 11 }).withMessage('Quantity should have between 1 and 11 characters'),
    body('event_type'),
    body('material_cost').not().isEmpty().withMessage('Material cost is a required field')
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(404).json({ errors: errors.array() });
    }
    controllerMaterial.createMaterial(req, res);
});

///Altera dados de um Material
router.put('/:cod_material', [
    body('description').isLength({ max: 45 }).withMessage('Only 45 characters are allowed'),
    body('stock').isLength({ min: 1, max: 11 }).withMessage('Quantity should have between 1 and 11 characters'),
    body('event_type'),
    body('material_cost').not().isEmpty().withMessage('Material Cost is a required field')
], function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(404).json({ errors: errors.array() });
    }
    controllerMaterial.updateMaterial(req, res);
});

module.exports = router;
