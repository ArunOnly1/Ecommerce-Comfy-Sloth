import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filter',
	initialState: {
		filtered_products: [],
		all_products: [],
		get_products_loading: false,
		get_products_error: false,
		grid_view: true,
		sort: 'price-lowest',
		filters: {
			text: '',
			company: 'all',
			category: 'all',
			color: 'all',
			min_price: 0,
			max_price: 0,
			price: 0,
			shipping: false,
		},
	},
	reducers: {
		load_all_products: (state, action) => {
			state.all_products = action.payload
			state.filtered_products = [...state.all_products]
			// console.log(state.all_products)

			// for max price
			let maxPrice = action.payload.map((p) => p.price)
			maxPrice = Math.max(...maxPrice)
			// console.log(maxPrice)
			// Setting maxPrice
			// first way
			// state.filters.max_price = maxPrice
			// second way
			state.filters = { ...state.filters, max_price: maxPrice, price: maxPrice }
		},
		set_loading: (state, action) => {
			state.get_products_loading = action.payload
		},
		set_error: (state, action) => {
			state.get_products_error = true
		},
		view_toggler: (state, action) => {
			state.grid_view = action.payload
		},

		// Sort functionality
		update_sort: (state, action) => {
			state.sort = action.payload
		},
		sort_products: (state, action) => {
			let tempProducts = [...state.all_products]
			if (state.sort === 'price-lowest') {
				tempProducts = tempProducts.sort((a, b) => a.price - b.price)
			} else if (state.sort === 'price-highest') {
				tempProducts = tempProducts.sort((a, b) => b.price - a.price)
			} else if (state.sort === 'name-a') {
				tempProducts = tempProducts.sort((a, b) => a.name.localeCompare(b.name))
			} else if (state.sort === 'name-z') {
				tempProducts = tempProducts.sort((a, b) => b.name.localeCompare(a.name))
			}
			// This is for weird scenario which may happen if any of the conditions are not applied
			else {
				tempProducts = [...state.all_products]
			}

			// final step
			state.filtered_products = tempProducts
		},

		// Filter functionality

		update_filters: (state, action) => {
			state.filters = { ...state.filters, ...action.payload }
			// console.log(state.filters)
		},
		filter_products: (state, action) => {
			const { all_products } = state
			const { text, company, category, color, price, shipping } = state.filters
			let tempProducts = [...all_products]

			// filtering
			// text input
			if (text) {
				tempProducts = tempProducts.filter((product) => {
					// if the product starts with the supplied text
					// then only the filtering happens
					return product.name.toLowerCase().startsWith(text)
				})
			}

			// category
			if (category !== 'all') {
				tempProducts = tempProducts.filter((product) => {
					return product.category === category
				})
			}

			// company
			if (company !== 'all') {
				tempProducts = tempProducts.filter((product) => {
					return product.company === company
				})
			}

			// colors
			if (color !== 'all') {
				tempProducts = tempProducts.filter((product) => {
					return product.colors.find((p) => {
						return p === color
					})
				})
			}

			// price
			tempProducts = tempProducts.filter((product) => product.price <= price)

			// shipping
			if (shipping === true) {
				tempProducts = tempProducts.filter(
					(product) => product.shipping === true
				)
			}
			// final step

			state.filtered_products = tempProducts
		},
		clear_filters: (state, action) => {
			state.filters = {
				...state.filters,
				text: '',
				company: 'all',
				category: 'all',
				color: 'all',
				price: state.filters.max_price,
				shipping: false,
			}
		},
	},
})

export const {
	load_all_products,
	set_loading,
	set_error,
	view_toggler,
	update_sort,
	sort_products,
	update_filters,
	clear_filters,
	filter_products,
} = filterSlice.actions
export default filterSlice.reducer
