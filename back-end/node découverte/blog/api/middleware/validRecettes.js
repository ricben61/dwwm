const { check, validationResult } = require('express-validator');


exports.validateRecettes=[
    check('titre').trim().escape().isLength({min:5, max:25}).
    withMessage('Le titre doit faire entre 5 et 25 caracteres!')
    .matches(/^[A-Za-z0-9 ]+$/)
    .withMessage('votre titre ne doit pas contenir de caracteres spéciaux') ,
    
    check('description').trim().escape().matches(/^[A-Za-z0-9 .,'!&()+]+$/)
    .withMessage('votre recette ne doit pas contenir de caracteres spéciaux')
    .isLength({min:20, max:1000}).
    withMessage('La recette doit contenir minimum 20 lettres ou chiffres'),

    // check('description').trim(),
    
];