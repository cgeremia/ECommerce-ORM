const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 // find all categories
  // be sure to include its associated Products
router.get('/', (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'No categories found'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

 // find one category by its `id` value
// be sure to include its associated Products

router.get('/:id', (req, res) => {
 Category.findOne({
  where: {
    id: req.params.id
  },
  include: {
    model: Product,
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
  }
 })
 .then(dbCategoryData => {
  if(!dbCategoryData) {
    res.status(404).json({message: 'No categories found'});
    return;
  }
  res.json(dbCategoryData);
 })
 .catch(err => {
  console.log(err);
  res.status(500).json(err);
 });
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.categroy_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    res.status(500).json(err);
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({message: 'No category was found with that id'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
