const router = require('express').Router();

// Visualizar especialidades
router.get('/especialidade', function (req, res) {
    let sql = "SELECT * FROM Specialty";
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
})

// Visualizar especialidades
router.get('/posto', function (req, res) {
    let sql = "SELECT * FROM Rank_Grad";
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
})

module.exports = router;