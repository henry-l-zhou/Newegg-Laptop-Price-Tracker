const request = require("request");
const cheerio = require("cheerio");

request(
  "https://www.newegg.com/Laptops-Notebooks/SubCategory/ID-32?Tid=6740",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      const itemHeading = $(".item-title");
      //console.log(itemHeading.html());

      $(".item-info").each((i, el) => {
        const item = $(el)
          .find(".item-title")
          .text();
        const price = $(el)
          .find(".price-current")
          .find("strong")
          .text()
          .replace(/[^a-zA-Z0-9$. ]/g, "");
        console.log(item);
        console.log("$" + price);
      });
    }
  }
);
