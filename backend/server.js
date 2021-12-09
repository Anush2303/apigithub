const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();

app.use(bodyParser.json());

app.use(express.static("github\public"));

mongoose.connect("mongodb://localhost:27017/repoDB",{useNewUrlParser:true});

const repoSchema={
    title:String,
    content:String
};

const Repo=mongoose.model("Repo",repoSchema);

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'GET,POST,PATCH,DELETE,OPTIONS'
    );
    next();
});
/*app.get("/",function(req,res){
    console.log("from backend");
})*/
/*app.get("/repos",function(req,res){
    Repo.find(function(err,foundRepos){
        if(!err)
        {
            res.send(foundRepos);
        }
        else
        console.log(err);
    });
});*/

app.post("/repoAdd",function(req,res,next){
    const newRepo=new Repo({
        title:req.body.repoTitle,
        content:req.body.repoBody
    });
    newRepo.save(function(err){
        if(!err)
        {
            console.log("added to db");
        }
        else
        console.log(err);
    });
    res.send({message:"added"});
});

app.listen(5000,function(){
    console.log("server up");
});

