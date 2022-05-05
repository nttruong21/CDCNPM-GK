const express = require("express");
const router = express.Router();
const siteController = require("../controllers/SiteController");

router.get("/cart", siteController.getViewCart);
router.get("/bill", siteController.getViewBill);
router.get("/:slug", siteController.detail);
router.get("/", siteController.index);

module.exports = router;
