const { Pool, Client } = require("pg");
const msg = require("./scrape.js");
const connectionString = "postgresql://postgres:1718@127.0.0.1:5432/postgres";

const pool = new Pool({
  connectionString: connectionString
});
//console.log(msg())
function getLaptops() {
  msg.then(response => {
    response.forEach(object => {
      try {
        var item =`('${object.itemId}','${object.name}', ${object.price},TIMESTAMP '${object.date}','${object.image_url}')`
        pool.query(
          `insert into laptops(
                  id,
                  name,
                  price,
                  datecreated,
                  image_url
                  ) 
                  values
                  ${item} 
                  `
        );
        //console.log(item)
      } catch(e){
        console.log(e)
      }
    })
  });
}

getLaptops()



