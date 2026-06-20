const express =require('express');
const mongoose=require('mongoose');
const TodoSchema=require('./Todolist');


const app=express();


app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Taskdata")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

app.post('/add_todo',async (req,res)=>{
   const {title}=req.body;
   const {description}=req.body;
   try{
      const newData=new TodoSchema({title,description});
      await newData.save()
      return res.json({message :"task added successfully"})
   }
   catch(err){
      console.log(err.message);
   }
})
app.put('/update_todo/',async(req,res)=>{
   const {title}=req.body;
   const {description}=req.body;
   const {completed}=req.body
   try{
       res.json({message:"Task updated successfully"})
   }
   catch(err){
      console.log(err.message);
   }
});
app.get('/get_all_todos',async(req,res)=>{
   try{
      const allData=await TodoSchema.find()
      return res.json(allData)
   }
   catch(err){
      console.log(err.message);
   }
})
app.get('/get_todo/:id',async (req,res)=>{
   try{
      const Data=await TodoSchema.findById(req.params.id)
      return res.json(Data)
   }
   catch(err){
      console.log(err.message);
   }
})
app.delete('/delete_todo/', async (req,res)=>{
   try{
      await TodoSchema.findByIdAndDelete(req.params.id);
      return res.json({message:"Task deleted sucessfully"})
   }
   catch(err){
      console.log(err.message);
   }
   
})


app.listen(3000,()=>console.log('server running on http://127.0.0.1:3000.....'))