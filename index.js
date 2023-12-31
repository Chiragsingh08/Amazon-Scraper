const express = require('express');
const request = require('request-promise');

const app = express();
const PORT =process.env.PORT || 5000;

const apiKey = '3b45342584c90eded0abfe0302647a07';
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/',(req,res) => {
    res.send('Welcome to Amazon Scraper API.');
});

// Get product details
app.get('/products/:productId',async(req,res)=> {
    const { productId } = req.params;
    const { apiKey } = req.query;
    
    try{
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);
        
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
        
    }
});
// Get product reviews
app.get('/products/:productId/reviews',async(req,res)=> {
    const { productId } = req.params;
    const { apiKey } = req.query;
    
    try{
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);
        
    }
});
// Get product offers
app.get('/products/:productId/',async(req,res)=> {
    const { productId } = req.params;
    const { apiKey } = req.query;
    
    try{
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);

    }
});
// Get search results
app.get('/search/:searchQuery',async(req,res)=> {
    const { searchQuery } = req.params;

    try{
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    }catch(error){
        res.json(error);

    }
});
app.listen( PORT, () => console.log(`Server runnig on Port ${PORT}`));