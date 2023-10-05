let initialState;
if (!localStorage.getItem("furnitureCart")) {
	initialState = [];
} else {
	initialState = JSON.parse(localStorage.getItem("furnitureCart"));
}

const cartReducer = (state, action) => {
	switch(action.type) {
		case "ADD":
			let newCart = [...state, action.payload];
			return newCart;
		case "REMOVE":
			let filteredCart = state.filter(item => item.name != action.payload);
			return filteredCart;

		default: return state;
	}
}

export {
	initialState,
	cartReducer,
}