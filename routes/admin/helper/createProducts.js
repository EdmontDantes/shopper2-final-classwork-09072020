const { waterfall } = require('async')
const faker = require('faker');
const Product = require('../products/models/Product');


module.exports = {

    creatingProducts: (req, res) => {
                            waterfall([
                                (callback) => {
                                    Category.findOne({name: req.params.name}, (err, category) => {
                                        if(err) return next(err);
                                        callback(null, category);
                                    });
                                },
                                (category) => {
                                    for (let i = 0; i < 24; i++) {
                                        const product = new Product();
                                        product.category = category._id;
                                        product.name = faker.commerce.productName();
                                        product.price = faker.commerce.price();
                                        product.image = `/images/products2/${i}.jpg`;
                                        product.description = faker.lorem.paragraph();
                                        product.save();
                                    }
                                }
                            ]);
                            // res.json({ message: 'Success'});
                            req.flash('messages', `Successfully added ${req.params.name.toUpperCase()} category and 24 products`);
                            return res.redirect('/api/admin/add-category');
                        }
}