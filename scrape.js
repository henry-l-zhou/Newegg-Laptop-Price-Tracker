const request = require("request");
const cheerio = require("cheerio");
const baseUrl = "https://www.newegg.com/Product/ProductList.aspx?Submit=ENE&N=100006740%20601286795%20601286800%20600136700%20601296059%20601296066%204814&IsNodeId=1&LeftPriceRange=750%201250&bop=And&Page=";

function getUrl(pageNum) {

  return `${baseUrl}${pageNum}&PageSize=96&order=BESTMATCH`
}
const myRequest = () => {

  return new Promise((resolve, reject) => {
    request(
      getUrl(1),
      (err, response, html) => {
        if (err) return reject(err);
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
            laptop = {
              "itemId": itemId || modelId,
              "name": item,
              "price": price || -1,
              "date": datetime.toJSON(),
            }
            items.push(laptop);

          });

          console.log(items)
          resolve(items);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};

myRequest();
module.exports = myRequest;