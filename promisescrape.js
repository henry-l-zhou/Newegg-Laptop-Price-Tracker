/* const rp = require("request-promise");
const cheerio = require("cheerio");
const url =
  "https://www.newegg.com/Laptops-Notebooks/SubCategory/ID-32?Tid=6740";

rp(url).then(function())
;

request(url, (error, response, html) => {
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
});
 */
