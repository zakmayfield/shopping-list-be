const router = require('express').Router()
const List = require('./list-model')

router.get('/', (req, res) => {
  List.getList()
    .then(list => {
      res.status(200).json(list)
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack })
    })
})

router.get('/:id', (req, res) => {
  List.getById(req.params.id)
    .then(item => {
      if (!item) {
        res.status(404).json({
          error: `could not find an item with the id of ${req.params.id}`
        })
      } else {
        res.status(200).json(item)
      }
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack })
    })
})

router.post('/', (req, res) => {
  List.addItem(req.body)
    .then(item => {
      res.status(201).json(item)
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack })
    })
})

router.put('/:id', (req, res) => {
  let updatedItem = req.body

  //get item
  List.getById(req.params.id)
    .then(listItem => {
      if (!listItem) {
        res
          .status(404)
          .json({
            error: `could not find an item with the id of ${req.params.id}`
          })
      } else {

        //edit the item
        List.editItem(updatedItem, req.params.id)
          .then(() => {

            //find the item again
            List.getById(req.params.id)
              .then(item => res.status(200).json(item))
              .catch(({name, message, stack}) =>
              res.status(400).json({ name, message, stack, custom: "Could not find that item after editing"})
            )

          })
          .catch(({name, message, stack}) =>
            res.status(400).json({ name, message, stack, custom: "Could not edit that item"})
          )

      }
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack, custom: "Could not find that item" })
    })

})

router.delete('/:id', (req, res) => {
  List.getById(req.params.id)
    .then(listItem => {
      if (!listItem) {
        res.status(404).json({
          error: `could not find an item with the id of ${req.params.id}`
        })
      } else {
        List.removeItem(req.params.id)
          .then(count => {
            res
              .status(202)
              .json({
                message: `You have successfully deleted: ${listItem.name}`,
                count: count,
                item: listItem
              })
          })
          .catch(err => {
            res.status(400).json({ error: 'Could not remove that item' })
          })
      }
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack })
    })
})

module.exports = router
