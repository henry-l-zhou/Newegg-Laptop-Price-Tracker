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
module.exports = {
    getAllLaptops: getAllLaptops,
};