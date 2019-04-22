const { Pool } = require("pg");
const connectionString = "postgresql://postgres:1718@127.0.0.1:5432/test";

const pool = new Pool({
    connectionString: connectionString
});
function getAllLaptops(req, res, next) {
    try {
        pool.query('select * from laptops ORDER BY id DESC, datecreated asc', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
        console.log("worked");
    }
    catch (e) {
        console.log("My Error", e)
    }
}
function getAllLaptopsDistinct(req, res, next) {
    try {
        pool.query('SELECT DISTINCT ON (id) * FROM laptops ORDER BY id DESC, datecreated asc', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
        console.log("worked");
    }
    catch (e) {
        console.log("My Error", e)
    }
}
function getLaptopById(req, res, next) {
    try {
        const id = `%${req.params.id.toUpperCase()}%`;
        console.log(id);
        pool.query('select * from laptops where id LIKE $1 ORDER BY id DESC, datecreated asc', [id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
        console.log("worked");
    }
    catch (e) {
        console.log("My Error", e)
    }
}
function getLaptopByDistinctId(req, res, next) {
    try {
        const id = `%${req.params.id.toUpperCase()}%`;
        console.log(id);
        pool.query('SELECT DISTINCT ON (id) * FROM laptops where id LIKE $1', [id], (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
        console.log("worked");
    }
    catch (e) {
        console.log("My Error", e)
    }
}
module.exports = {
    getAllLaptops,
    getLaptopById,
    getAllLaptopsDistinct,
    getLaptopByDistinctId
};