//Listar operacionais
function getAll(req, res) {
    let sql = "SELECT * FROM Operational";
    global.connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (results.length == 0) {
            console.log("Data not Found");
            return res.status(404).end();
        }
        return res.json(results);
    });
}

//Listar um operacional
function getOne(req, res) {
    let sql = "SELECT * FROM Operational WHERE cod_operational=?";
    global.connection.query(sql, req.params.cod_operational, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (results.length == 0) {
            console.log("Data not Found");
            return res.status(404).end();
        }
        return res.json(results);
    });
}

//Listar Operacional de acordo com o seu posto
function getOneBy(req, res) {
    let sql = "SELECT * FROM Operational WHERE rankGrad_cod_rankGrad=?";
    global.connection.query(sql, req.params.rankGrad_cod_rankGrad, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (results.length == 0) {
            console.log("Data not Found");
            return res.status(404).end();
        }
        return res.json(results);
    });
}

//Listar Profissionais (cod_posto != 101 e 102)
function getProfissionais(req, res) {
    let sql = "SELECT * FROM Operational WHERE rankGrad_cod_rankGrad<>101 AND rankGrad_cod_rankGrad<>102";
    global.connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (results.length == 0) {
            console.log("Data not Found");
            return res.status(404).end();
        }
        return res.json(results);
    });;
}


//Alterar dados de um Operacional
function updateOne(req, res) {
    let sql = "UPDATE Operational SET name=?, email=?, complement_address=?, formation=?, specialty_cod_specialty=?, rankGrad_cod_rankGrad=?, localization_cod_localization=?, citizan_card=?, birth_date=?, type_operational=? WHERE cod_operational=?";
    global.connection.query(sql, [
        req.body.name,
        req.body.email,
        req.body.complement_address,
        req.body.formation,
        req.body.specialty_cod_specialty,
        req.body.rankGrad_cod_rankGrad,
        req.body.localization_cod_localization,
        req.body.citizan_card,
        req.body.birth_date,
        req.body.type_operational,
        req.params.cod_operational
    ], function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
        return res.json(results);
    });
}


//Registar Operacional consoante o seu cod_Posto
function createOne(req, res) {
    let sql = "INSERT INTO Operational (cod_operational, name, email, complement_address, formation, specialty_cod_specialty, rankGrad_cod_rankGrad, localization_cod_localization, citizan_card, birth_date, type_operational) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    global.connection.query(sql, [
        req.body.cod_operational,
        req.body.name,
        req.body.email,
        req.body.complement_address,
        req.body.formation,
        req.body.specialty_cod_specialty,
        req.params.rankGrad_cod_rankGrad,
        req.body.localization_cod_localization,
        req.body.citizan_card,
        req.body.birth_date,
        req.body.type_operational,
    ], function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        return res.json(results);
    });
}

//Alterar Posto Operacional => Aprovar Candidato (Postos diferentes para candidatos, voluntários e profissionais)
function updatePosition(req, res) {
    let sql = "UPDATE Operational SET rankGrad_cod_rankGrad=? WHERE cod_operational=?";
    global.connection.query(sql, [
        req.params.rankGrad_cod_rankGrad,
        req.params.cod_operational
    ], function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
        return res.json(results);
    });
}

//Rejeitar Candidato
function candidatoRejeitar(req, res) {
    const cod_operational = req.params.cod_operational;
    let sql = "DELETE FROM Operational WHERE cod_operational=? AND rankGrad_cod_rankGrad=102";
    global.connection.query(sql, cod_operational, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
        res.status(204).end();
    });
}

//Filtrar operacionais por Estado "Ocupado"
function operacionalOcupado(req, res) {
    let sql = "SELECT operational_cod_operational, occurrence_cod_occurrence FROM Occurrences_Operational WHERE occurrence_cod_occurrence IN(SELECT cod_occurrence FROM Occurrences WHERE state_cod_state = 1 OR state_cod_state = 2) AND operational_cod_operational IN(SELECT cod_operational FROM Operational);";
    global.connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (results.length == 0) {
            console.log("Data not Found");
            return res.status(404).end();
        }
        return res.json(results);
    })
}

//Filtrar operacionais por Estado "Livre"
function operacionalLivre(req, res) {
    let sql = "SELECT * FROM Operational WHERE cod_operational NOT IN (SELECT operational_cod_operational FROM Occurrences_Operational WHERE occurrence_cod_occurrence IN(SELECT cod_occurrence FROM Occurrences WHERE state_cod_state = 1 OR state_cod_state = 2) AND operational_cod_operational IN(SELECT cod_operational FROM Operational)) AND rankGrad_cod_rankGrad!=102";
    global.connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (results.length == 0) {
            console.log("Data not Found");
            return res.status(404).end();
        }
        return res.json(results);
    });
}

module.exports = {
    readOperacionalByPosto: getOneBy,
    listOperacionais: getAll,
    listProfissionais: getProfissionais,
    listOperacionaisLivres: operacionalLivre,
    listOperacionaisOcupados: operacionalOcupado,
    readOperacional: getOne,
    updateOperacional: updateOne,
    updatePosition: updatePosition,
    createProfissional: createOne,
    deleteCandidato: candidatoRejeitar,
}


