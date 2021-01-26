//Listar todos os utilizadores
function getAll(req, res) {
    let sql = "SELECT username, name, email, address FROM User";
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

//Listar utilizador
function getOne(req, res) {
    let sql = "SELECT username, name, email, address FROM User WHERE username=?";
    global.connection.query(sql, req.params.username, function (err, results) {
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

//Adicionar um utilizador
function createOne(req, res) {
    let sql = "INSERT INTO User (username, name, email, address, password) VALUES (?,?,?,?,?)";
    global.connection.query(sql, [
        req.body.username,
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.password,
    ], function (err, results) {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        return res.json(results);
    });
}

//Alterar dados dos utilizadores
function updateOne(req, res) {
    let sql = "UPDATE User SET name=?, email=?, address=?, password=? WHERE username=?";
    global.connection.query(sql, [
        req.body.name,
        req.body.email,
        req.body.address,
        req.body.password,
        req.params.username
    ], function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
        return res.json(results);
    });
}

//Apagar Utilizador
function deleteOne(req, res) {
    const username = req.params.username;
    let sql = "DELETE FROM User WHERE username=?";
    global.connection.query(sql, username, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).end();
        }
        res.status(204).end();
    });
}

module.exports = {
    listUtilizadores: getAll,
    readUtilizador: getOne,
    createUtilizador: createOne,
    updateUtilizador: updateOne,
    deleteUtilizador: deleteOne
}