import React from 'react'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'
import { useDispatch } from 'react-redux'
import {
	fetchProducts,
	getProductsBegin,
	getProductsError,
} from '../redux/slices/productsSlice'
import { products_url as url } from '../utils/constants'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const FeaturedProducts = () => {
	const dispatch = useDispatch()

	const productsFetcher = async (url) => {
		try {
			dispatch(getProductsBegin(true))
			const { data } = await axios.get(url)
			// console.log(data)
			dispatch(fetchProducts(data))
		} catch (error) {
			dispatch(getProductsError())
			console.log(error)
		} finally {
			dispatch(getProductsBegin(false))
		}
	}

	React.useEffect(() => {
		productsFetcher(url)
	}, [])

	const {
		featured_products: featured,
		products_error: error,
		products_loading: loading,
	} = useSelector((state) => state.products)

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <Error />
	}

	return (
		<Wrapper className='section'>
			<div className='title'>
				<h2>featured products</h2>
				<div className='underline'></div>
			</div>
			<div className='section-center featured'>
				{featured.slice(0, 3).map((product) => {
					return <Product key={product.id} {...product} />
				})}
			</div>
			<Link to='/products' className='btn'>
				all products
			</Link>
		</Wrapper>
	)
}
const Wrapper = styled.section`
	background: var(--clr-grey-10);
	.featured {
		margin: 4rem auto;
		display: grid;
		gap: 2.5rem;
		img {
			height: 225px;
		}
	}
	.btn {
		display: block;
		width: 148px;
		margin: 0 auto;
		text-align: center;
	}
	@media (min-width: 576px) {
		.featured {
			grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
		}
	}
`

export default FeaturedProducts
