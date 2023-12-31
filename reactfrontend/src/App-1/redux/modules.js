const initialState = {
    items: [],
}

const LIST_ITEMS = 'APP1/TODO/LIST_ITEMS';
const LIST_ITEMS_SUCCESS = 'APP1/TODO/LIST_ITEMS_SUCCESS';
const LIST_ITEMS_POST = 'APP1/TODO/LIST_ITEMS_POST';
const LIST_ITEMS_DELETE = 'APP1/TODO/LIST_ITEMS_DELETE';
const LIST_ITEMS_UPDATE = 'APP1/TODO/LIST_ITEMS_UPDATE';

const listItems = () => {
    return { type: LIST_ITEMS }
}
const listItemsSuccess = (items) => {
    return { type: LIST_ITEMS_SUCCESS, items }
}
const listItemsPost = (item) => {
    return { type: LIST_ITEMS_POST, item }
}
const listItemsDelete = (id) => {
    return { type: LIST_ITEMS_DELETE, id }
}
const listItemsUpdate = (id, item) => {
    return { type: LIST_ITEMS_UPDATE, id, item }
}

const todoReducer = (data = initialState, action) => {
    switch (action.type) {
        case LIST_ITEMS_SUCCESS: {
            const { items } = action;
            return  { ...data, items };
        }
        default:
            return data;
    }
}

export default todoReducer;

export const actions = {
    listItems,
    listItemsSuccess,
    listItemsPost,
    listItemsDelete,
    listItemsUpdate,
};

export const actionTypes = {
    LIST_ITEMS,
    LIST_ITEMS_POST,
    LIST_ITEMS_DELETE,
    LIST_ITEMS_UPDATE,
};
