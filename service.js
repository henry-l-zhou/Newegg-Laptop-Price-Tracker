const { Pool, Client } = require("pg");
const msg = require("./scrape.js");
const connectionString = "postgresql://postgres:1718@127.0.0.1:5432/postgres";

const pool = new Pool({
  connectionString: connectionString
});
//console.log(msg())
function getLaptops() {
  msg().then(response => {
    
    const items = [];
    response.forEach(object => {
      items.push(`('${object.itemId}','${object.name}', ${object.price},TIMESTAMP '${object.date}','${object.image_url}')`);
    })
    console.log(items.join());
    ;
    try {
      var response = pool.query(
        `insert into laptops(
                id,
                name,
                price,
                datecreated,
                image_url
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

getLaptops()



