import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import { useSelector, useDispatch } from 'react-redux'
import { sort_products, filter_products } from '../redux/slices/filterSlice'
const ProductList = () => {
	const {
		filtered_products: products,
		grid_view,
		sort,
		filters,
	} = useSelector((state) => state.filter)

	const dispatch = useDispatch()

	// everytime sort changes, we reload this component
	React.useEffect(() => {
		dispatch(sort_products())
	}, [sort])

	// everytime filters changes, we reload this component
	React.useEffect(() => {
		dispatch(filter_products())
	}, [filters])

	if (products.length < 1) {
		return (
			<h5 style={{ textTransform: 'none' }}>
				Sorry,no products matched your search...
			</h5>
		)
	}

	if (grid_view === false) {
		return <ListView products={products} />
	}
	return <GridView products={products}></GridView>
}

export default ProductList
