function getLaptops() {
  const {
    Pool,
    Client
  } = require("pg");
  const msg = require("./scrape.js");
  const connectionString = "postgresql://postgres:1718@127.0.0.1:5432/postgres";

  const pool = new Pool({
    connectionString: connectionString
  });

  msg.then(response => {
    console.log(Date())
    response.forEach(object => {
      var itemInfo =
        `('${object.itemId}','${object.name}','${object.image_url}', '${object.modelId}','${object.type}','${object.resolution}','${object.weight}','${object.graphicsCard}','${object.item_url}')`

      pool.query(
        `insert into laptops
        (id,name,image_url,model_id,type,resolution,weight,graphics_card,item_url) 
        values ${itemInfo}`
      ).catch(function (e) {
        // need this catch block to handle UnhandledPromiseRejectionWarning
        pool.query(`update laptops 
        set id = '${object.itemId}',
        image_url = '${object.image_url}',
        model_id = '${object.modelId}',
        type = '${object.type}',
        resolution = '${object.resolution}',
        weight = '${object.weight}',
        graphics_card = '${object.graphicsCard}',
        item_url = '${object.item_url}'
        where name = '${object.name}'`)
          .catch(function (e) {
            console.log(e);
          })
      })

      var item =
        `('${object.name}', ${object.price},TIMESTAMP '${object.date}')`

      pool.query(
        `insert into laptoppricehistory
        (name,price,datecreated) 
        values ${item}`
      ).catch(function (e) {
        // need this catch block to handle UnhandledPromiseRejectionWarning
      })
    })
  }).catch(function (err) {
    console.log('Caught an error!', err);
  });
}


module.exports = getLaptops;