const express = require('express');
const app = express();
const data = require('./item_list.json')
app.use(express.json());

// Api 1 For getting data of with page and offset
app.get('/api/products/list', (req, res) => {

    //getting size and page from query in in
    const size = req.query.size;
    const page = req.query.page;

    // handling invalid size or page
    if (size <= 0 || page <= 0) return res.status(400).json({ status: 400, message: "Bad request" })


    // calculating start and end index  
    const start = (page - 1) * size;
    const end = page * size;

    // Slicing data accordingly
    const result = data.slice(start, end);

    res.status(200).json({ status: 200, message: result })

})



// Api 2 For getting data of specific id
app.get('/api/products/:id', (req, res) => {
    // getting id from url
    //because the type of id coming in url is string so we have to convert it integer
    const pid = parseInt(req.params.id)

    // finding data with specific id
    const product = data.find(item => item.id === pid);

    if (!product) {
        return res.status(404).json({ status: 404, message: 'Product not found' });
    }
    else {
        return res.status(200).json({ status: 200, item: product })
    }
})
// Here i successfullly created both RESTful Api , we can check them using postman or thunderclient extension of vs code
//URL for 1st api in postman will be ****** localhost:5000/api/products/list?size=2&page=1 ******
// URL for 2nd api in postman will be  ****** localhost:5000/api/products/101 ******
const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`App is linsting at port ${port}`);
});