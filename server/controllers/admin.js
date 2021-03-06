const {UserModel} = require('../models/allModels');
const bcrypt = require('bcrypt');

const getAllAdmins = function (req, res) {    
    UserModel.find({"isAdmin":true}, function (err, admins) {
        res.json(admins);
    });
}

const getOneAdmin = function (req, res) {
    UserModel.find({
        "isAdmin":true,
        '_id': req.params.id
      }).exec((err, user) => {
        res.json(user);
      });
}




const getAllUsers = function (req, res) {
    UserModel.find({"isAdmin":false}, function (err, users) {
        res.json(users);
    });
}

const getOneUser =function (req, res) {
    UserModel.find({
        "isAdmin":false,
        '_id': req.params.id
      }).exec((err, user) => {
        res.json(user);
      });
}



const addNewAdmin = function (req, res) {
    const {
        body: {
            firstName,
            lastName,
            username,
            email,
            password,
            image,
        }
    } = req;
    // let password = bcrypt.hashSync(password, 10);
    const admin = new UserModel({
        firstName,
        lastName,
        username,
        password,
        email,
        image,
        isAdmin:true
    });
    admin.save(function (err) {
        if (!err) res.json({"message":"Admin added successfully"});
        else console.log(err);
    });
}

const adminPassReset =async function (req, res) {
    const {
        body: {password}
    } = req;
    const admin = await UserModel.findById(req.params.id)
    if (admin.isAdmin==false) {
        res.status(424).json({"message":"this user is not an admin"});
    }else{

        admin.password = password;
        admin.save((err) =>{
            if(err){
                // console.log(err);
                res.status(424).json({"message":err.message});
            }
            else{
                res.status(200).json({"message":"Admin has been updated successfully"});
            }
        })
    }
   
}



const adminPassUpdate = async function (req, res) {
    const {
        body: {
            password,
            newPassword
        }
    } = req;
    
    const admin = await UserModel.findById(req.user.id)
    if ( await bcrypt.compare(password,admin.password)) {
        admin.password = newPassword;
        admin.save((err) =>{
            if(err){
                res.status(424).json({"message":err.message});
            }
            else{
                res.status(200).json({"message":"Password has been updated successfully"});
            }
        })
    }else{
        res.status(424).json({"message":"wrong password"});
    }
}



const deleteAdmin = function (req, res) {
    UserModel.deleteOne({
        'isAdmin' : true,
        '_id': req.params.id
    }, callback);

    function callback(err) {
        if (!err) {
            res.status(200).json({"message":"User has been deleted successfully"});
        }
        else {
            res.status(424).json({"message":"something went wrong"});
        }
    }
}



const deleteUser = function (req, res) {
    UserModel.deleteOne({
        'isAdmin' : false,
        '_id': req.params.id
    }, callback);

    function callback(err) {
        if (!err) {
            res.status(200).json({"message":"User has been deleted successfully"});
        }
        else {
            res.status(424).json({"message":"something went wrong"});
        }
    }
}

module.exports = {
                getAllAdmins,
                getOneAdmin,
                getAllUsers,
                getOneUser,
                addNewAdmin,
                adminPassReset,
                adminPassUpdate,
                deleteAdmin,
                deleteUser
            }