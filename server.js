const express =require('express');
const mongoose=require('mongoose');
const UserData=require('./Model');


const app=express();


app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

app.post('/studentdb',async (req,res)=>{
   const {username}=req.body;
   const {email}=req.body;
   try{
      const newData=new UserData({username,email});
      await newData.save()
      return res.json({message :"user data send successfully"})
   }
   catch(err){
      console.log(err.message);
   }
})
app.put('/update/:id',async(req,res)=>{
   const {username}=req.body;
   const {email}=req.body;
   try{
       res.json({message:"userdata updated successfully"})
   }
   catch(err){
      console.log(err.message);
   }
});
app.get('/get_all_data',async(req,res)=>{
   try{
      const allData=await UserData.find()
      return res.json(allData)
   }
   catch(err){
      console.log(err.message);
   }
})
app.get('/get_data/:id',async (req,res)=>{
   try{
      const Data=await UserData.findById(req.params.id)
      return res.json(Data)
   }
   catch(err){
      console.log(err.message);
   }
})
app.delete('/delete/:id', async (req,res)=>{
   try{
      await UserData.findByIdAndDelete(req.params.id);
      return res.json({message:"User data deleted sucessfully"})
   }
   catch(err){
      console.log(err.message);
   }
   
})


app.listen(3000,()=>console.log('server running on http://127.0.0.1:3000.....'))