const request = require("request");
const cheerio = require("cheerio");
const urls = [
  'https://www.newegg.com/p/pl?N=100006740%204814&Page=1&PageSize=96',
  'https://www.newegg.com/p/pl?N=100006740%204814&Page=2&PageSize=96',
  
  
  
]
var promises = []
//"https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&N=100006740%20601286795%20601286800%20600136700%20601296059%20601296066%204814&IsNodeId=1&LeftPriceRange=750%201250&bop=And&Page=";

// function getUrl(pageNum) {
//   console.log(pageNum)
//   return `${baseUrl}${pageNum}&PageSize=96`

// }
for (var url of urls){
  promises.push(new Promise((resolve, reject) => {
    request(
      url,
      (err, response, html) => {
        if (err) return reject(err)
        try {
          const $ = cheerio.load(html);
          let items = [];

          $(".item-container").each((i, el) => {
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

          });


          resolve(items);
        } catch (e) {
          reject(e);
        }
      }
    )
  }))
}

module.exports = exports = function(){
  return Promise.all(promises).then((results)=>{
    
    return [].concat(...results)
  })
}
