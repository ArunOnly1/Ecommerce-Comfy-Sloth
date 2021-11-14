import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
	Error,
	Filters,
	Loading,
	PageHero,
	ProductList,
	Sort,
} from '../components'
import {
	load_all_products,
	set_error,
	set_loading,
} from '../redux/slices/filterSlice'
import { products_url as url } from '../utils/constants'

const ProductsPage = () => {
	const dispatch = useDispatch()

	const fetchProducts = async () => {
		try {
			dispatch(set_loading(true))
			const { data } = await axios.get(url)
			dispatch(load_all_products(data))
		} catch (error) {
			console.log(error)
			dispatch(set_error())
		} finally {
			dispatch(set_loading(false))
		}
	}
	// using selector to get data in redux store
	const { get_products_loading: loading, get_products_error: error } =
		useSelector((state) => state.filter)

	useEffect(() => {
		fetchProducts()
	}, [])

	if (loading) {
		return <Loading />
	}
	if (error) {
		return <Error />
	}

	return (
		<main>
			<PageHero title='products' />
			<Wrapper className='page'>
				<div className='section-center products'>
					<Filters />
					<div>
						<Sort />
						<ProductList />
					</div>
				</div>
			</Wrapper>
		</main>
	)
}

const Wrapper = styled.div`
	.products {
		display: grid;
		gap: 3rem 1.5rem;
		margin: 4rem auto;
	}
	@media (min-width: 768px) {
		.products {
			grid-template-columns: 200px 1fr;
		}
	}
`

export default ProductsPage
