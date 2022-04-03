const express = require('express')
const router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId
const {Lesson} =require('../model/Lesson')

//get lessons

router.route('/').get((req, res)=>{
    Lesson.find((err, lessons) =>{
        if(err) res.status(500).send("Error occured while fetching data. Please try again later")
        else{
            if(lessons.length>0) res.send(lessons)
            else res.send("Add some data to fetch")
        }
    })
})
.post((req, res)=>{
    if(req.body.name=="" || req.body.id=="")
    {
        res.status(404).send("Name/id filed cannot be empty")
    }
    else{
        var lesson = new Lesson(req.body)
        lesson.save()
        .then(lesson=>res.send(lesson))
        .catch(err=>res.status(404).send("Error occured while posting data", err))
    }
})

router.route('/:id')
    .get((req, res) => {
        const id = req.params.id

        if (ObjectId.isValid(id)) {

            Lesson.findOne({ "_id": id }, (err, lesson) => {
                if (err) res.status(500).send("Please try again later")
                else {
                    if (lesson) res.send(lesson)
                    else res.send("No data present for specified id!")
                }
            })
        }
        else res.status(404).send("Invalid Id. Please try again using valid id.")
    })

    .put((req, res) =>{

        const id = req.params.id

        if(req.body.name == "" || req.body.id == ""){
            res.status(404).send("Name/id field can not be empty")
        }
        else{
            var lesson = ({
                id:req.body.id,
                name:req.body.name
            })

            Lesson.updateOne({"_id": id }, lesson,(err,lesson) =>{
                if(err){
                    res.status(404).send("Some error occured")
                }
                else{
                    if(lesson==null){
                        res.status(404).send("This id not belongs to any lesson")
                    }
                    else{
                        res.redirect(`/lessons/${id}`)
                    }
                }
            })
        }

    })

    //Delete
    .delete((req, res)=>{

        const id = req.params.id
        Lesson.deleteOne({"_id":id}, (err, lesson)=>{
            if(err){
                res.status(404).send("error occured while getting data")
            }
            else{
                if(lesson == null){
                    res.status(404).send("This id not belongs to any lesson")
                }
                else{
                    res.send(`Lesson with id ${id} is deleted`)
                }
            }
        })
    })



module.exports = router