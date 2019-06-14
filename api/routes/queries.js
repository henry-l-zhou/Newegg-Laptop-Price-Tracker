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
        const id = `%${req.params.id}%`;
        console.log(id);
        pool.query('select * from laptops where upper(id) LIKE upper($1) ORDER BY id DESC, datecreated asc LIMIT 30', [id], (error, results) => {
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
        const id = `%${req.params.id}%`;
        console.log(id);
        pool.query('SELECT DISTINCT ON (id) * FROM laptops where upper(id) LIKE upper($1) LIMIT 30', [id], (error, results) => {
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
function getLaptopByDistinctName(req, res, next) {
    try {
        const name = `%${req.params.name}%`;
        console.log(name)
        pool.query(`
        SELECT id, name,price, datecreated,serial_id,image_url FROM (
            SELECT *, ROW_NUMBER() OVER (PARTITION BY id ORDER BY datecreated desc) AS ROWNUM 
            FROM laptops
        ) x WHERE ROWNUM = 1 and upper(name) like upper($1)
        LIMIT 30`
            , [name], (error, results) => {
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
    getLaptopByDistinctId,
    getLaptopByDistinctName
};