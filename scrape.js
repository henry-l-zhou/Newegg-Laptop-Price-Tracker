const request = require("request");
const cheerio = require("cheerio");

const urls = [
  'https://www.newegg.com/p/pl?N=100006740%204814&Page=1&PageSize=96&order=BESTSELLING',
  'https://www.newegg.com/p/pl?N=100006740%204814&Page=2&PageSize=96&order=BESTSELLING',
  'https://www.newegg.com/p/pl?N=100006740%204814&Page=3&PageSize=96&order=BESTSELLING',
  'https://www.newegg.com/p/pl?N=100006740%204814&Page=4&PageSize=96&order=BESTSELLING',
  'https://www.newegg.com/p/pl?N=100006740%204814&Page=5&PageSize=96&order=BESTSELLING',
  'https://www.newegg.com/p/pl?N=100006740%204814&Page=6&PageSize=96&order=BESTSELLING'
]
var promises = []
//"https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&N=100006740%20601286795%20601286800%20600136700%20601296059%20601296066%204814&IsNodeId=1&LeftPriceRange=750%201250&bop=And&Page=";

// function getUrl(pageNum) {
//   console.log(pageNum)
//   return `${baseUrl}${pageNum}&PageSize=96`

// }
function makeRequest(url){
  promises.push(new Promise((resolve, reject) => {
    request(
      url,
      (err, response, html) => {
        if (err) return reject(err)
        try {
          const $ = cheerio.load(html);
          let items = [];

          $(".item-container").each((i, el) => {
            try{
              const features = $(el)
                .find(".item-features")
                .text();
              if (features.match("Item #:")) {
                var itemId = features.match((" Item #:" + "\\s(\\w.+)"))[1];
              } else if (features.match("Model #:")) {
                var modelId = features.match((" Model #:" + "\\s(\\w.+)"))[1];
              }
              let item = $(el)
                .find(".item-title")
                .text();

              let price = $(el)
                .find(".price-current")
                .find("strong")
                .text()
                .replace(/[^a-zA-Z0-9$.]/g, "");
              let datetime = new Date();
              let image_url = $(el)
                .find("img")
                .attr("src")
                .replace(/300/g, "1280");
              laptop = {
                "itemId": itemId || modelId,
                "name": item,
                "price": price || -1,
                "date": datetime.toJSON(),
                "image_url": image_url || null
              }
              items.push(laptop);
              
            } catch(e){
              console.log(e)
            }
          });

            resolve(items);
        } catch (e) {
          console.log('look HERE' + e)
          
        }
      }
    )
  }))
}

function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
 }
async function load(){
  for (var url of urls){
    makeRequest(url)
    console.log(Date())
    await timer(2000)
    
  }
}


module.exports = exports = load().then(()=>{
  
  return Promise.all(promises)
  .then((results)=>{return [].concat(...results)})
  .catch((e)=> {console.log(e)})
})

