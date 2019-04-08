const request = require("request");
const cheerio = require("cheerio");

const myRequest = function blah() {
  return new Promise((resolve, reject) => {
    request(
      "https://www.newegg.com/Laptops-Notebooks/SubCategory/ID-32?Tid=6740",
      (err, response, html) => {
        if (err) return reject(err);
        try {
          const $ = cheerio.load(html);

          let items = {};
          $(".item-info").each((i, el) => {
            const id = $(el).find(".item-img");
            const item = $(el)
              .find(".item-title")
              .text();
            const price = $(el)
              .find(".price-current")
              .find("strong")
              .text()
              .replace(/[^a-zA-Z0-9$. ]/g, "");
            items[item] = price || -1;
          });
          console.log(id);
          resolve(items);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
};

module.exports = myRequest;
