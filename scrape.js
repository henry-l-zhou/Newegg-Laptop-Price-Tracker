const request = require("request")
const cheerio = require("cheerio")
/**
 * 
 * Scrapes a given Newegg's webpage finding a laptop's item features 
 * 
 * param - the url of the site
 * return - a promise containing an array of laptop objects 
 */
function makeRequest(url){
  promises.push(new Promise((resolve, reject) => {
    request(url,(err, response, html) => {
        if (err) return reject(err)
        try {
          const $ = cheerio.load(html)
          let items = []

          $(".item-container").each((i, el) => {
            try{
              const features = $(el)
                .find(".item-features")
                .find("li")
                .each(function (index, element) {
                  switch(true){
                    case $(element).text().includes("Item"):
                      itemId = $(element).text().substring(8)
                      break
                    case $(element).text().includes("Model"):
                      modelId = $(element).text().substring(9)
                      break
                    case $(element).text().includes("Resolution"):
                      resolution = $(element).text().substring(12)
                      break
                    case $(element).text().includes("Graphics Card"):
                      graphicsCard = $(element).text().substring(15)
                      break
                    case $(element).text().includes("Weight"):
                      weight = $(element).text().substring(8)
                      break
                    case $(element).text().substring(0,4) === "Type":
                      type = $(element).text().substring(5)
                      break
                  } 
                })
              let item = $(el)
                .find(".item-title")
                .text()
              let item_url = $(el)
                .find("a")
                .attr("href")
              let price = $(el)
                .find(".price-current")
                .find("strong")
                .text()
                .replace(/[^a-zA-Z0-9$.]/g, "")
              let datetime = new Date()
              let image_url = $(el)
                .find("img")
                .attr("src")
                .replace(/300/g, "1280")

              laptop = {
                "itemId": itemId,
                "modelId" : modelId,
                "name": item,
                "price": price,
                "date": datetime.toJSON(),
                "image_url": image_url,
                "type" : type,
                "resolution" : resolution,
                "weight" : weight,
                "graphicsCard" : graphicsCard,
                "item_url" : item_url
              }
              
              items.push(laptop)
              //console.log(laptop)
            } catch(e){
              console.log(e)
            }
          })
            
            resolve(items)
        } catch (e) {
          console.log('look HERE' + e)
          
        }
      }
    )
  }))
}

function timer(ms) {
  return new Promise(res => setTimeout(res, ms))
 }
/**
 * Takes the first 80 urls of the bestselling laptops and waits 10 seconds to scrape it
 */
async function load(){
  for (var page = 0; page < 80; page++){
    let url = `https://www.newegg.com/p/pl?N=100006740%204814&Page=${page}&PageSize=96&order=BESTSELLING`
    makeRequest(url)
    console.log(Date())
    await timer(10000)
    
  }
}
/**
 * exports the promises from scraping 
 */
module.exports = exports = load().then(()=>{
  
  return Promise.all(promises)
  .then((results)=>{return [].concat(...results)})
  .catch((e)=> {console.log(e)})
})

