const router=require('express').Router();
const {signup,login,setAvatar,getAllUsers}=require('../controllers/userController');
router.post('/signup',signup);
router.post('/',login);
router.post('/setAvatar/:id',setAvatar);
router.get('/allusers/:id',getAllUsers);
module.exports=router;
