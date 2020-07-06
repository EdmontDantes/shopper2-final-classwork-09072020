const router = require('express').Router();

const Category = require('./categories/models/Category');

router.get('/add-category', (req, res, next) => {
    return res.render('admin/add-category');
})

router.post('/add-category', (req, res, next) => {

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