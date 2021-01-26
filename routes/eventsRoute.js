const router = require('express').Router();
const controllerEvent = require('../controllers/eventsContollers');

// Visualizar ocorrencias
router.get('/', function (req, res) {
    controllerEvent.listOcorrencias(req, res)
});

// Visualizar uma ocorrencia (cod_occurrence)
router.get('/:cod_occurrence', function (req, res) {
    controllerEvent.listOcorrencia(req, res)
});


// Visualizar ocorrencias consoante o seu estado (A Decorrer, Pendente, Concluida)
// Ocorrencias aprovadas -> state_cod_state: 1,2,3
// Ocorrencias rejeitadas -> state_cod_state: 4
router.get('/estado/:state_cod_state', function (req, res) {
    controllerEvent.listByEstado(req, res)
});

//Listar Ocorrencias por estados
router.get('/api/estados', function (req, res) {
    controllerEvent.listEstados(req, res)
});

// Visualizar o tipo e a dimensão de uma ocorrencia (cod_occurrence)
router.get('/:cod_occurrence/dados', function (req, res) {
    controllerEvent.listByTypeAndDimension(req, res)
});

//Alterar cod_estado
router.put('/:cod_occurrence/estado/:state_cod_state', function (req, res) {
    controllerEvent.updateState(req, res)
});

//Visualizar responsável
router.get('/:cod_occurrence/responsible', function (req, res) {
    controllerEvent.seeResponsavel(req, res)
});

//Atribuir responsável
router.put('/:cod_occurrence/responsible', function (req, res) {
    controllerEvent.assignResponsavel(req, res)
})


//Visualizar material alocado à ocorrencia
router.get('/:cod_occurrence/materials', function (req, res) {
    controllerEvent.listMateriaisOcorrencia(req, res)
});

//Rota de alocação de material
router.post('/:cod_occurrence/materials/:cod_material', function (req, res) {
    controllerEvent.alocateMaterial(req, res)
});


//Visualizar operacionais alocados à ocorrencia
router.get('/:cod_occurrence/operationals', function (req, res) {
    controllerEvent.listOperacionaisOcorrencia(req, res)
});

//Rota de alocação de operacionais
router.post('/:cod_occurrence/operationals/:cod_operational', function (req, res) {
    controllerEvent.alocateOperacional(req, res);
});

//Visualizar numero de operacionais aconcelhados à ocorrencia (de acordo com a sua dimensão)
router.get('/:cod_occurrence/numberOperationals', function (req, res) {
    controllerEvent.calcularOperacionais(req, res)
});

module.exports = router;