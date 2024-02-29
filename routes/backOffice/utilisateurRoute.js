const { request, response } = require('express');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

//japm uuju epqw qijk

const Employe = require('../../models/backOffice/employeModel');
//const RendezVous = require('../../models/bacskOffice/rendezVousModel');
//const Services = require('../models/backOffice/servicesModel');
//const ServiceDetail = require('../models/backOffice/sousServicesModel');
const Utilisateur = require('../../models/backOffice/utilisateurModel');
const ConfirmCompte= require('../../models/backOffice/confirmationModel');

// inscription de l'utilisateur pour créer un nouveau compte
router.post('/inscription', async (request,response)=>{
    const user = new Employe({
        name : request.body.name,
        password : request.body.password,
        mail : request.body.mail,
        description : request.body.description,
        id_role : new ObjectId(request.body.id_role),
        debutHeure :request.body.debutHeure,
        finHeure:request.body.finHeure
    })
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aroniainasaotra@gmail.com',
            pass: 'japmuujuepqwqijk'
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    //check compte s'il existe déjà
    try {
        const userExist = await Employe.findOne({ mail: user.mail });
    
        let rep = {};
        console.log('tafiditra ato');
        // Si l'utilisateur n'existe pas encore
        if (userExist == null) {
            const data = await user.save();
            console.log('ato 1');
            const code = new ConfirmCompte({
                userId: data._id,
            });
            await code.save();
            console.log('ato 2');
            const body = '<h1>Bonjour,</h1><p>Nous avons reçu une demande de création de compte pour cette adresse e-mail.</p><p> Pour compléter la création de votre compte, veuillez entrer le code de confirmation suivant : ' + code.code + ' sur notre site web.</p> \n'
                + '<p>Merci d\'avoir utiliser notre service.</p><p>Cordialement,</p> <p>L\'équipe de notre service</p>';
    
            const mailOptions = {
                to: user.mail,
                subject: 'Email de confirmation de création de compte',
                html: body,
            };
    
            const info = await transporter.sendMail(mailOptions);
    
            const responseObj = {
                message: 'OK',
                value: null,
                code: 200,
            };
    
            console.log('Email sent: ' + info.response);
    
            return responseObj;
        }
        // Si l'utilisateur existe déjà avec compte déjà activé
        else if (userExist.valid) {
            rep = {
                message: 'KO',
                erreur: 'L\'email appartient déjà à un compte existant.',
                value: null,
                code: 404,
            };
        }
        // Si l'utilisateur existe mais le compte n'est pas encore validé
        else {
            rep = {
                message: 'KO',
                value: '/confirmation-required',
                code: 404,
            };
        }
    
        return rep;
    } catch (error) {
        console.error(error);
        const rep = {
            message: 'KO',
            value: error,
            code: 404,
        };
        return rep;
    }  
    
})

// confirmation compte utilisateur par email
router.post('/confirmation',async (request,response)=>{
    console.log(request.body.code)
    let rep = {}
    try {
        let confirmUser = await ConfirmCompte.findOne({code : request.body.code});
            if(confirmUser!=null){
                await Utilisateur.findOneAndUpdate({ _id: confirmUser.userId}, {valid:true},{ new: true })
                        .then((updatedUser)=>{
                            ConfirmCompte.deleteOne({_id:confirmUser._id}).exec().then((result) => {
                                if(result.deletedCount>0){
                                    console.log("ConfirmCompte supprimé");
                                }else{
                                    console.log("ConfirmCompte n'a pas été supprimé");
                                }
                            });
                            
                            rep = {
                                message : 'OK',
                                value : updatedUser,
                                code : 200
                            }
                            console.log(rep)
                            response.json(rep);
                        })
            }
    } catch (error) {
        console.log(error)
        response.json({code : 404,message:'KO',error : error});
    }
})


router.post('/login', async (request, response) => {
    try {
        const user = await Employe.findOne({
            mail: request.body.mail,
            password: request.body.password
        }).populate('id_role');

        if (!user) {
            const reponse = {
                message: 'KO',
                value: 'Votre email ou votre mot de passe est incorrect',
                code: 404
            }
            response.json(reponse);
        } else {
            const reponse = {
                message: 'OK',
                value: user,
                code: 200
            }
            response.json(reponse);
        }
    } catch (error) {
        console.error(error);
        const rep = {
            message: 'KO',
            code: 404,
            value: error.message
        }
        response.send(rep);
    }
});

module.exports = router;


module.exports = router;