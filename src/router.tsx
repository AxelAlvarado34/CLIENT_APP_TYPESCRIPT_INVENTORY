import {createBrowserRouter} from 'react-router-dom'
import { Layout } from './layout/Layout'
import { loader as loaderProducts, Products, action as availabilityUpdateProduct } from './views/Products'
import { NewProduct, action as newProductAction } from './views/NewProduct'
import { EditProduct, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element : <Products/>,
                loader: loaderProducts,
                action: availabilityUpdateProduct
            },
            {
                path: 'products/new',
                element: <NewProduct/>,
                action: newProductAction
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct/>,
                action: editProductAction
            },
            {
                path: 'products/:id/delete',
                action : deleteProductAction
            }
        ]
    }
])