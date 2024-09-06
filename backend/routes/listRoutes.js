const express = require('express');
const router = express.Router();
const { createList, addItemToList, getUserLists, getListItems } = require('../controllers/listController');
const authMiddleware = require('../middleware/authentication');

router.route('/').post(authMiddleware, createList).get(authMiddleware, getUserLists); // Create a new list and get all lists
router.route('/:listId').get(authMiddleware, getListItems); // Get all items in a particular list
router.route('/:listId/add').post(authMiddleware, addItemToList); // Add an item to an existing list

module.exports = router;
