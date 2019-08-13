# Newegg-Laptop-Price-Tracker
Newegg Laptop Searcher

This is a project that tracks the prices of nearly all laptops from the website newegg.com. The idea of the project stemmed from the lack
of ability to find when laptops are at its cheapest prices. 

Because Newegg has no dedicated API, the tracker utilizes node.js's cheerio library, an html webscraping tool that helped find information
on laptops. After scraping data from the newegg website, the data was then stored and filtered in a Postgresql database. The sorted data was
then accessed by nodejs's express api and sent to a react application. There are multiple dependencies used in the react application including:

"dependencies": {  
    "@fortawesome/fontawesome-svg-core": "^1.2.19",  
    "@fortawesome/free-solid-svg-icons": "^5.9.0",  
    "@fortawesome/react-fontawesome": "^0.1.4",  
    "bootstrap": "^4.3.1",  
    "dom": "0.0.3",  
    "jquery": "^3.4.1",  
    "popper.js": "^1.15.0",  
    "prop-types": "^15.7.2",  
    "react": "^16.8.6",  
    "react-bootstrap": "^1.0.0-beta.8",  
    "react-dom": "^16.8.6",  
    "react-router-dom": "^5.0.0",  
    "react-scripts": "2.1.8",  
    "react-slick": "^0.24.0",  
    "resolve-url-loader": "^3.1.0",  
    "router": "^1.3.3",  
    "slick-carousel": "^1.8.1"  
  }  
    
 Thanks for reading this project!  
 -Henry Zhou
  
