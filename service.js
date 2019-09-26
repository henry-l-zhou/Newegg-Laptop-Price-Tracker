const { Pool, Client } = require("pg");
const msg = require("./scrape.js");
const connectionString = "postgresql://postgres:1718@127.0.0.1:5432/postgres";
var schedule = require('node-schedule');


const pool = new Pool({
  connectionString: connectionString
});
//console.log(msg())
function getLaptops() {
  msg.then(response => {
    response.forEach(object => {
      try {
        var itemInfo =
        `('${object.itemId}','${object.name}','${object.image_url}', '${object.modelId}','${object.type}','${object.resolution}','${object.weight}','${object.graphicsCard}','${object.item_url}')`
        //console.log(itemInfo)
        pool.query(
          `insert into laptops
          (id,name,image_url,model_id,type,resolution,weight,graphics_card,item_url) 
          values ${itemInfo}`
        );
        
      } catch(e){
        
        }

      try {
        var item =
        `('${object.name}', ${object.price},TIMESTAMP '${object.date}')`

        pool.query(
          `insert into laptoppricehistory
          (name,price,datecreated) 
          values ${item}`
        );
        
      } catch(e){
        
        }
        
    })
  });
}
var j = schedule.scheduleJob('0 0 * * *', getLaptops);




