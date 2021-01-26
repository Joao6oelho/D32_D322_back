//Listar materiais
function getAll(req, res) {
    let sql = "SELECT * FROM Material";
    global.connection.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        res.json(results);
    });
}

//Listar um material
function getOne(req, res) {
    let sql = "SELECT * FROM Material WHERE cod_material=?";
    global.connection.query(sql, req.params.cod_material, function (err, results) {
        if (err) return res.status(500).end();
        if (results.length == 0) return res.status(404).end();
        return res.json(results[0]);
    });
}

//Registar material
function createOne(req, res) {
    let sql = "INSERT INTO Material (cod_material, description, stock, event_type, material_cost) VALUES (?,?,?,?,?)";
    global.connection.query(sql, [
        req.body.cod_material,
        req.body.description,
        req.body.stock,
        req.body.event_type,
        req.body.material_cost
    ], function (err, results) {
        if (err) return res.status(500).end();
        res.json(results);
    });
}

//Alterar dados do meterial
function updateOne(req, res) {
    let sql = "UPDATE Material SET description=?, stock=?, event_type=?, material_cost=? WHERE cod_material=?";
    global.connection.query(sql, [
        req.body.description,
        req.body.stock,
        req.body.event_type,
        req.body.material_cost,
        req.params.cod_material
    ], function (err, results) {
        if (err) return res.status(500).end();
        res.json(results);
    });
}

module.exports = {
    listMaterial: getAll,
    listOneMaterial: getOne,
    createMaterial: createOne,
    updateMaterial: updateOne
};
