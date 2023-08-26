const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const slugify = require("slugify");

//add category
const setCategory = asyncHandler(async (req,resp) => {
    const {name} = req.body;

    if(!name){
        resp.status(404).json({
            messgae:"please fill all the fields"
        })
    }else{
        try {
         const category =await new Category({
            name:name,
            slug:slugify(name)
         }).save();
         console.log(category);
         resp.status(201).json({
            name:category.name + "saved"
         })

        } catch (error) {
            console.log(err);
            resp.status(500);
            throw new Error(error)
        }
    }
});
//update category
const updateCategory = asyncHandler(async(req,resp)=>{
    const {name} = req.body;
    const {id} = req.params;
    try {
        const category = await Category.findByIdAndUpdate(id,{
            name:name,
            slug:name,
        },{new:true});
        console.log(category)
        resp.status(201).json({
            name:category.name + "is updated"
        })
    } catch (error) {
        console.log(err);
        resp.status(500);
        throw new Error(error)
    }
});
//get all category
const getCategory = asyncHandler(async(req,resp)=>{
    try {
        const category =await  Category.find();
        resp.status(201).json(category);
    } catch (error) {
        console.log(err);
        resp.status(500);
        throw new Error(error)
    }
})

//get single Category
const singleCategory = asyncHandler(async(req,resp)=>{
    const {slug} = req.params;
    try {
        const category =await  Category.findOne({slug:slug});
        resp.status(201).json(category);
        console.log(category)
    } catch (error) {
        console.log(err);
        resp.status(500);
        throw new Error(error)
    }
})
//delete category
const deleteCategory = asyncHandler(async(req,resp)=>{
    const {id} = req.params;
    try {
        const category =await  Category.deleteOne({_id:id});
        resp.status(201).json({name:category.deletedCount + "deleted"});
        console.log(category)
    } catch (error) {
        console.log(err);
        resp.status(500);
        throw new Error(error)
    }
})


module.exports = { setCategory,updateCategory,getCategory,singleCategory,deleteCategory};
