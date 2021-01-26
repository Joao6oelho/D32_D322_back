//Listar ocorrencias
function getAll(req, res) {
    let sql = "SELECT * FROM Occurrences";
    global.connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        res.json(results);
    });
}

//Listar uma ocorrencia
function getOne(req, res) {
    let sql = "SELECT * FROM Occurrences WHERE cod_occurrence=?";
    global.connection.query(sql, req.params.cod_occurrence, function (err, results) {
        if (err) return res.status(500).end();
        if (results.length == 0) return res.status(404).end();
        return res.json(results[0]);
    });
}

//Listar Ocorrencias por estado
function getEstados(req, res) {
    let sql = "SELECT S.description, COUNT(O.cod_occurrence) As 'NOccurrences' FROM Occurrences O, State S WHERE O.State_cod_state = S.cod_state GROUP BY S.description";
    global.connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        res.json(results);
    });
}

//Filtrar estado ocorrencia
function getEstado(req, res) {
    const estado = req.params.state_cod_state;
    let sql = "SELECT * FROM Occurrences WHERE state_cod_state = ?"
    global.connection.query(sql, estado, function (err, results) {
        if (err) return res.status(500).end();
        if (results.length == 0) return res.status(404).end();
        return res.json(results);
    });
}

// get() dimensão e tipo da ocorrencia
function getdados(req, res) {
    const cod_occurrence = req.params.cod_occurrence;
    let sql = 'SELECT T.cod_tipo, T.descricao, O.cod_occurrence, P.dimensao FROM Tipo T, Pedido P, Occurrences O WHERE P.cod_Pedido = O.request_cod_request AND P.Tipo_cod_Tipo = T.cod_Tipo AND cod_occurrence=?';
    global.connection.query(sql, cod_occurrence, function (err, results) {
        if (err) return res.status(500).end();
        if (results.length == 0) return res.status(404).end();
        return res.json(results[0]);
    });
}


//Alterar estado da ocorrencia 
function updateEstado(req, res) {
    let sql = "UPDATE Occurrences SET state_cod_state=? WHERE cod_occurrence=?";
    global.connection.query(sql, [
        req.params.state_cod_state,
        req.params.cod_occurrence
    ], function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
        return res.json(results);
    });
}

//Operacionais
//Atribuir Responsável
function assignResponsavel(req, res) {
    let sql1 = "SELECT operational_cod_operational FROM Occurrences_Operational, Operational WHERE Operational.rankGrad_cod_rankGrad = (SELECT MIN(rankGrad_cod_rankGrad) FROM Operational WHERE cod_operational IN( SELECT operational_cod_operational FROM Occurrences_Operational WHERE occurrence_cod_occurrence = ?))";
    global.connection.query(sql1, req.params.cod_occurrence, function (err, rows, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (results.length == 0) {
            console.log("Data not Found");
            return res.status(404).end();
        } else {
            let cod_operational = rows[0].operational_cod_operational;
            console.log(cod_operational);

            let sql2 = "UPDATE Occurrences_Operational SET responsible=1 WHERE occurrence_cod_occurrence=?";
            global.connection.query(sql2, [
                req.params.cod_occurrence
            ], function (err, rows, results) {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                }
                //return console.log('Responsavel da ocorrrencia ' + req.params.cod_occurrence + ': ' + json.cod_operational);
                return res.json(results);
            });

        }
    });
}

//Visualizar Responsável de uma Ocorrência
function seeResponsavel(req, res) {
    let sql1 = "SELECT operational_cod_operational FROM Occurrences_Operational WHERE occurrence_cod_occurrence=? AND responsible=1 ";
    global.connection.query(sql1, req.params.cod_occurrence, function (err, rows, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (results.length == 0) {
            console.log("Data not Found");
            return res.status(404).end();
        }
        let cod_operational = rows[0];
        return res.send(cod_operational);
    });
}

//Alocar Operacionais Ocorrencia
function alocateOperacional(req, res) {
    let sql = "INSERT INTO Occurrences_Operational (participation_number, responsible, presence, operational_cod_operational, occurrence_cod_occurrence) VALUES (?,null,?,?,?)";
    global.connection.query(sql, [
        req.body.participation_number,
        req.body.presence,
        req.params.cod_operational,
        req.params.cod_occurrence
    ], function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        return res.json(results);
    });
}

//Calcular quantidade de operacionais a ser alocacada -> sugestão
//Falta alterar os parametros para ingles
function calculateQuantidadeOperacionais(req, res) {
    let sql = "Select dimensao FROM Pedido, Occurrences WHERE cod_pedido=request_cod_request and cod_occurrence=?";
    global.connection.query(sql, [
        req.params.cod_occurrence
    ], function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        return res.json(results);
    }
    )
}


//Operacionais alocados numa ocorrencia
function listOperacionaisOcorrencia(req, res) {
    let sql = "SELECT operational_cod_operational FROM Occurrences_Operational WHERE occurrence_cod_occurrence=?";
    global.connection.query(sql, req.params.cod_occurrence, function (err, results) {
        if (err) return res.status(500).end();
        if (results.length == 0) return res.status(404).end();
        return res.json(results);
    });
}

//Materiais
//Listar Materiais alocados a uma ocorrencia
function listMateriaisOcorrencia(req, res) {
    const cod_occurrence = req.params.cod_occurrence;
    let sql = "SELECT * FROM Occurrence_Material WHERE cod_occurrence = ?";
    global.connection.query(sql, cod_occurrence, function (err, results) {
        if (err) return res.status(500).end();
        if (results.length == 0) return res.status(404).end();
        return res.json(results);
    });
}

//Alocar Material
function alocateMaterial(req, res) {
    let sql = "INSERT INTO Occurrence_Material (description, quantity, cod_material, cod_occurrence) VALUES (?,?,?,?)";
    global.connection.query(sql, [
        req.body.description,
        req.body.quantity,
        req.params.cod_material,
        req.params.cod_occurrence
    ], function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        return res.json(results);
    });
}

module.exports = {
    listOcorrencias: getAll,
    listOcorrencia: getOne,
    listByEstado: getEstado,
    listEstados: getEstados,
    listByTypeAndDimension: getdados,
    updateState: updateEstado,
    calcularOperacionais: calculateQuantidadeOperacionais,
    listOperacionaisOcorrencia: listOperacionaisOcorrencia,
    alocateOperacional: alocateOperacional,
    listMateriaisOcorrencia: listMateriaisOcorrencia,
    alocateMaterial: alocateMaterial,
    assignResponsavel: assignResponsavel,
    seeResponsavel: seeResponsavel
};
