const express = require('express')
const router = express.Router()
var ObjectId = require('mongoose').Types.ObjectId
const {Squad} =require('../model/Squad')
const {Lesson} =require('../model/Lesson')

//Get Squad

router.route('/').get((req, res)=>{
    Squad.find((err, squads) =>{
        if(err) res.status(500).send("Error occured while fetching data. Please try again later")
        else{
            if(squads.length>0) res.send(squads)
            else res.send("Add some data to fetch")
        }
    })
})

//Post Squad
.post((req, res) =>{
    if(req.body.name=="" || req.body.id==""){
        res.status(404).send("Name/id filed can not be empty")
    }
    else{
        let squad = new Squad(req.body)
        squad.save()
        .then(squad=>res.send(squad))
        .catch(err=>res.status(404).send("Error occurred"))
    }
})

//Get Squad by Id
router.route("/:id")
    .get((req, res) => {
        const id = req.params.id

        if (ObjectId.isValid(id)) {

            Squad.findOne({ "_id": id }, (err, squad) => {
                if (err) res.status(500).send("Please try again later")
                else {
                    if (squad) res.send(squad)
                    else res.send("No data present for specified id!")
                }
            })
        }
        else res.status(404).send("Invalid Id. Please try again using valid id.")
})

//Mapping of Squad by id along with name

router.route('/map/:id/:name').post((req,res)=>{
    let lesson , squad
    Lesson.findOne({"_id":req.params.id},(err,data)=>{
        lesson = new Lesson(data)
    })

    Squad.findOne({name:req.params.name},(err,data)=>{
        squad = new Squad(data)
        squad.lessonId.push(lesson)
        squad.save()
        .then(reg=>{res.send(reg)})
        .catch(err=>{res.send("Failed to map",err)})
    })
})


//update Squad by Id

router.put('/:id', (req, res) =>{
    const id = req.params.id

    if(req.body.name == "" || req.body.id == ""){
        res.status(404).send("Name/id field can not be empty")
    }
    else{
       var squad = ({
           id: req.body.id,
           name: req.body.name,
           cohort: req.body.cohort
       }) 
       Squad.updateOne({"_id": id}, squad, (err, squad) => {
           if(err){
               res.status(404).send("Some error occured")
           }
           else{
               if(squad == null){
                   res.status(404).send("This id did not belongs to any squad")
               }
               else{
                   res.redirect(`/squads/${id}`)
               }
           }
       })
    }
})

//Delete squad by mapping id along with name

router.delete('/map/:id/:name', (req, res)=> {
        const id = req.params.id
        Squad.deleteOne({"_id": id}, (err, squad) =>{
            if(err){
                res.status(404).send("error occured while getting data")
            }
            else{
                if(squad == null){
                    res.status(404).send("This id did not belongs to any squad")
                }
                else{
                    res.send(`squad with id ${id} is deleted`)
                }
            }
        })

    })




module.exports = router