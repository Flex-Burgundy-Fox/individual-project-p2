const router = require("express").Router()

const billControllers = require("../controllers/bill")

router.post("/", billControllers.checkout)
router.post("/sentBillToDB", billControllers.sentBillToDB)
router.get("/showBill", billControllers.showBill)

module.exports = router
