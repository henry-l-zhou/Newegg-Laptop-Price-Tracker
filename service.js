const { Pool, Client } = require("pg");
const msg = require("./scrape.js");
const connectionString = "postgresql://postgres:1718@127.0.0.1:5432/test";

const pool = new Pool({
  connectionString: connectionString
});

function getLaptops() {
  msg().then(response => {
    const items = [];
    Object.keys(response).forEach(key => {
      items.push(`('${key}', ${response[key]})`);
    });
    try {
      var response = pool.query(
        `insert into test(
                name,
                price
                ) 
                values 
                ${items.join(",")}
                `
      );
      console.log("worked");
    } catch (e) {
      console.error("My ERROR", e);
    }
  });
}

getLaptops();
