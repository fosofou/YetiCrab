const {Router, request} = require('express');
const List = require('../models/TransportList');
const auth = require('../middleware/auth.middleware');
const {check, validationResult} = require('express-validator')
const router = Router();

router.post('/generate',
[
  check('id').notEmpty(),
  check('date').notEmpty(),
  check('name_carrier').notEmpty(),
  check('telephone').notEmpty()
],auth, async(req, res) =>{
    try{

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
            message: 'Заполните обязательные поля'
          })
        }

        const {id,date, name_carrier, telephone, comment} = req.body;
   
        

        const list = await List.findOne({id});

        if (list){
          console.log(list)
          return res.status(400).json({message:"Заявка с таким номеров уже существует"}) 
        }

        if (Date.parse(date) > Date.now()){
          return res.status(400).json({message: "Вы не можете получить заявку в будущём, укажите корректное время"})
        }



        const transportList = new List({
            id,date,name_carrier,telephone,comment,
            owner: req.user.userId
        })

        await transportList.save().catch(err => console.log(err));

        res.status(201).json({transportList});

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.get('/',auth, async(req, res) =>{
    try{

        const result = await List.find({owner: req.user.userId});
        res.json(result);

    } catch (e){
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

router.get('/:id',auth, async(req,res) => {
  try{
    
    const result = await List.findOne({id:req.params.id});
    res.json(result);

  } catch (e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/:id/delete',auth, async(req,res) => {
  try{
    
    await List.findOneAndDelete({id:req.params.id})
    res.status(200).json({message:"С кайфом удалил"});

  } catch (e){
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

router.post('/:id/update', auth, async(req,res) =>{ 
  try{

      const {id,date, name_carrier, telephone, comment} = req.body;
      const result = await List.findOneAndUpdate({id:req.params.id}, {$set:{
        id:id,
        date:date,
        name_carrier:name_carrier,
        telephone:telephone,
        comment:comment
      }})

      res.json(result);

  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
  }
})

module.exports = router
