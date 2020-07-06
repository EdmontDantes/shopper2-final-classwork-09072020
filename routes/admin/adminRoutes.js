const router = require('express').Router();

const Category = require('./categories/models/Category');
const checkCategory = require('./categories/utils/checkCategory');
const { validationResult } = require('express-validator');
router.get('/add-category', (req, res, next) => {
    return res.render('admin/add-category');
})




router.post('/add-category', checkCategory, (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // console.log(errors.errors);
            // return res.status(422).json({ err: errors.array() });
            req.flash('errors', errors.errors[0].msg);
            return res.redirect('/api/admin/add-category');
        }


        const category = new Category();
        category.name = req.body.name;

        category.save().then((savedCategory) => {
            req.flash('messages', 'Successfully added category now req.flash works');
            // console.log(req.flash('messages'))
            // res.json({ message: 'Success', category: savedCategory });
            return res.redirect('/api/admin/add-category');
        }).catch((err) => {
            if(err.code === 11000) {
                req.flash('errors', 'Category already exists');
                return res.redirect('/api/admin/add-category');
            } else {
                return next(err);
            }

        });

});

module.exports = router;