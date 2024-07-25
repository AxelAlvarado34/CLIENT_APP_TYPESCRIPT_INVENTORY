import { ActionFunctionArgs, Form, Link, redirect, useActionData, useLocation } from "react-router-dom"
import { updateProduct } from "../services/products.service";
import { ErrorMessage } from "../components/ErrorMessage";

export async function action({ request, params }: ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())

    let error = '';

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }

    if (error.length) {
        return error;
    }

    if (params.id !== undefined) {
        await updateProduct(data, +params.id);
    }

    return redirect('/');
}

const availabilityOptions = [
    { name: 'Disponible', value: true },
    { name: 'No Disponible', value: false }
]

export const EditProduct = () => {

    const error = useActionData() as string;
    const location = useLocation();

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                    to={'/'}
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white hover:bg-indigo-500 "
                >
                    Regresar
                </Link>
            </div>

            {
                error && <ErrorMessage>{error}</ErrorMessage>
            }

            <Form
                className="mt-10"
                method="POST"
            >

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    <input
                        id="name"
                        type="text"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Nombre del Producto"
                        name="name"
                        defaultValue={location.state.product.name}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="price"
                    >Precio:</label>
                    <input
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                        defaultValue={location.state.product.price}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={location.state.product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
