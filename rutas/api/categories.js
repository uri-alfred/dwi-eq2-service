const express = require("express")
const Controller = require("../../controllers/categories")
const RepositoryCategory = require("../../database/RepositoryCategory")

const router = express.Router()
const controller = new Controller(new RepositoryCategory())

router.get("/", async (req, res) => {
  controller.findCategories().then((category) => res.json(category))
})
router.get("/:id", async (req, res) => {
  controller.findCategoryById(req.params.id).then((category) => {
    if (category == null) {
      res.status(404)
      res.json({ message: "Category not found" })
    } else {
      res.status(200)
      res.json(category)
    }
  })
})
router.post("/", async (req, res) => {
  const created = await controller.addCategory(req.body.name)
  console.log("post", created)
  if (!created) {
    res.status(400)
    res.json({ message: "Category already exists" })
    return
  } else {
    res.status(201)
    res.json({ message: "Add successfully." })
  }
})
router.put("/:id", async (req, res) => {
  console.log("put")
  controller.updateCategory(req.params.id, req.body.name)
  //check if updated
  res.status(200)
  res.json({ message: "Update successfully." })
})
router.delete("/:id", async (req, res) => {
  console.log("delete")
  controller.deleteCategory(req.params.id)
  res.status(200)
  res.json({ message: "Deleted successfully." })
})

module.exports = router
