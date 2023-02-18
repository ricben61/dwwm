const Role = require('../models/roleModel');
const User = require('../models/userModel')

module.exports = {
    get: (req, res) => {
        res.render('user/register');
    },

    post: async (req, res) => {
        const Pass = req.body.password
        const confPass = req.body.confPassword
        
        if ( Pass !== confPass){
            res.redirect('/user/register')
        }else{

        const { firstname, lastname, password, phone } = req.body;
        const email = req.body.email.toLowerCase();
        
        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            phone: phone
        });
        const role=await Role.findOne({where:{name:'user'}})
        user.addRole(role)
        res.redirect('/user/register');
    }},

    updateUser: async (req, res) => {
        const user = await User.findOne({ where: { id: req.params.id },raw:true });
        res.render('user/register', {user});
    },

    update: async (req, res) =>{
        const { firstname, lastname, phone } = req.body;
        await User.update({
            firstname: firstname,
            lastname: lastname,
            phone: phone
        }, {
            where: {
              id: req.params.id
            }});
        res.redirect('../list-users');
    },

    delete: async (req, res) => {
        await User.destroy({ where: { id: req.params.id } });
        res.redirect('/user/list-users');
    },

    getUsersList: async (req, res) => {
        const users = await User.findAll({
            include: Role,
            nest:true,
            raw:true});

        res.render('user/list_users', {users});
    }





};