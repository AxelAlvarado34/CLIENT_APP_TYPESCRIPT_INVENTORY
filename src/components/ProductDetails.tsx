import { ActionFunctionArgs, Form, useNavigate, redirect, useFetcher } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/products.service"


type ProductDetailsProops = {
    product: Product
}

export async function action({ params }: ActionFunctionArgs) {

    if (params.id !== undefined) {
        await deleteProduct(+params.id)
        return redirect('/')
    }
}

export const ProductDetails = ({ product }: ProductDetailsProops) => {

    const fetcher = useFetcher();
    const isAvailable = product.availability;
    const navigate = useNavigate();

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800 text-center">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800 text-center">

                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} rounded-lg p-3 font-bold text-sm`}
                    >
                        {
                            isAvailable ? 'Disponible' : 'No disponible'
                        }
                    </button>
                </fetcher.Form>

            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex justify-center gap-4 items-center">
                    <button
                        onClick={() => navigate(`/products/${product.id}/edit`, {
                            state: { product }
                        })}
                        className="bg-blue-600 p-3 rounded-md text-white uppercase font-bold  hover:bg-blue-700"
                    >
                        Editar
                    </button>

                    <Form
                        method="POST"
                        action={`products/${product.id}/delete`}
                        onSubmit={(e) => {
                            if (!confirm('¿Eliminar?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input
                            className="bg-red-600 p-3 rounded-md text-white uppercase font-bold  hover:bg-red-700"
                            type="submit"
                            value={'Eliminar'}
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
