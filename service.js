const { Pool, Client } = require("pg");
const msg = require("./scrape.js");
const connectionString = "postgresql://postgres:1718@127.0.0.1:5432/postgres";

const pool = new Pool({
  connectionString: connectionString
});
/**
 * inserts laptop into postgresql database
 */
function getLaptops() {
  msg.then(response => {
    response.forEach(object => {
      
      try {
        var item =
        `('${object.itemId}','${object.name}', ${object.price},TIMESTAMP '${object.date}','${object.image_url}',
        '${object.modelId}','${object.type}','${object.resolution}','${object.weight}','${object.graphicsCard}','${object.item_url}')`
        console.log(item)
        pool.query(
          `insert into laptops
          (id,name,price,datecreated,image_url,model_id,type,resolution,weight,graphics_card,item_url) 
          values ${item}`
        );
        
      } catch(e){
        console.log(e)
        
        
      }
    })
  });
}

getLaptops()



