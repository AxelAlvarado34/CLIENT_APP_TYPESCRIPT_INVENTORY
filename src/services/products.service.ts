import axios from "axios";
import { DraftProductSchema, Product, ProductsArraySchema, ProductSchema } from "../types"
import { safeParse } from "valibot"
import { trueBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export const addProductService = async (data: ProductData) => {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        });

        if (result.success) {
            const url = `${import.meta.env.VITE_BASE_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no válidos')
        }

    } catch (error) {
        console.log(error);
    }
}


export const getProducts = async () => {
    try {
        const url = `${import.meta.env.VITE_BASE_URL}/api/products`;

        const { data } = await axios.get(url);
        const result = safeParse(ProductsArraySchema, data.data);
        if (result.success) {
            return result.output;
        } else {
            throw new Error('Error al cargar Productos')
        }

    } catch (error) {
        console.log(error);

    }
}

export const updateProduct = async (data: ProductData, id: Product['id']) => {

    try {

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: trueBoolean(data.availability.toString())
        })

        if (result.success) {
            const url = `${import.meta.env.VITE_BASE_URL}/api/products/${id}`;
            await axios.put(url, result.output);
        }

    } catch (error) {
        console.log(error);
    }

}

export const deleteProduct = async(id: Product['id']) => {
    
    try {
        const url = `${import.meta.env.VITE_BASE_URL}/api/products/${id}`;
        await axios.delete(url);
    } catch (error) {
        console.log(error);
        
    }
}

export const updateAvailabilityProduct = async(id: Product['id']) => {
    
    try {
        const url = `${import.meta.env.VITE_BASE_URL}/api/products/${id}`;
        await axios.patch(url);

    } catch (error) {
        console.log(error);
        
    }
}
