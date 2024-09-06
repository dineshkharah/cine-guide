const List = require('../models/List'); //this is required to interact with the List model
const { StatusCodes } = require('http-status-codes');

const createList = async (req, res) => {
    try {
        const { name } = req.body;
        const user = req.user.userId;

        const existingList = await List.findOne({ user, name }); //check if a list with the same name already exists

        if (existingList) {
            return res.status(StatusCodes.BAD_REQUEST).json({ err: 'List with that name already exists' });
        }

        const list = await List.create({
            user, //add the userId to the list
            name, //add the listName to the list
            items: [] //initialize the items array as empty
        }); //create a new list in the database with the provided data
        res.status(StatusCodes.CREATED).json({ list });
    } catch (error) {
        console.error('Error during list creation:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Server error' });

    }
};

// To add to an existing list, we need to find the list by its id and update it
const addItemToList = async (req, res) => {
    try {
        const { listId } = req.params;
        const { tmdbId, mediaType } = req.body;

        const list = await List.findById(listId); //find the list by its id

        if (!list) {
            return res.status(StatusCodes.NOT_FOUND).json({ err: 'List not found' });
        }

        if (list.user.toString() !== req.user.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ err: 'Not authorized to add to this list' });
        }

        list.items.push({ tmdbId, mediaType }); //add the item to the list
        await list.save(); //save the updated list

        res.status(StatusCodes.OK).json({ list });
    } catch (error) {
        console.error('Error during adding item to list:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Server error' });
    }
};


// To get all the lists that belong to a user, we need to find all lists with the user's id
const getUserLists = async (req, res) => {
    try {
        const user = req.user.userId;

        const lists = await List.find({ user }); //find all lists that belong to the user
        res.status(StatusCodes.OK).json({ lists });
    } catch (error) {
        console.error('Error during getting user lists:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Server error' });
    }
}

// To get all the items in a list, we need to find the list by its id and populate the items array
const getListItems = async (req, res) => {
    try {
        const { listId } = req.params;
        const list = await List.findById(listId)

        if (!list) {
            return res.status(StatusCodes.NOT_FOUND).json({ err: 'List not found' });
        }

        if (list.user.toString() !== req.user.userId) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ err: 'Not authorized to view this list' });
        }

        res.status(StatusCodes.OK).json({ list });
    } catch (error) {
        console.error('Error during getting list items:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: 'Server error' });
    }
}

module.exports = {
    createList,
    addItemToList,
    getUserLists,
    getListItems
}