const path=require('path');
const hbs=require('hbs');
const express = require('express');
const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');

const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

// define paths for express config
const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// setup static directory to serve
app.use(express.static(publicPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:"Welcome to HBS",
        name:"Andrew"
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Welcome to About page",
    });
});


app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Welcome to Help page",
        name:"Anushka shah"
    });
});


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a address"
        })
    }

    // geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    //     if(error){
    //         return res.send({error})
    //     }
    //     forecast(latitude,longitude,(error,forecastData)=>{
    //         if(error){
    //             return res.send({error});
    //         }
    
    //         res.send({
    //             forecast:forecastData,
    //             location,
    //             address:req.query.address
    //         })
    
    //     })
    // })

    res.send({
        location:"Finland",
        Weather:"It is snowing",
        address:req.query.address
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
       title:"404 Page",
       name:"Anushka Shah",
       errorMessage:"Help page not found"
    })
 });

app.get('*',(req,res)=>{
   res.render('404',{
      title:"404 Page",
      name:"Anushka Shah",
      errorMessage:"Page not found"
   })
});

 

app.listen(4000,()=>{
    console.log('Server is listening on port 4000');
});
