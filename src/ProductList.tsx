import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { useCart } from './contex/CartContext';
import AddToCartButton from './components/button/AddToCartButton';
import axios from 'axios';
import { useDebounce } from './helper';

// Define Product type
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const { addToCart } = useCart();

    const debouncedSearch = useDebounce(search, 300);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (debouncedSearch.trim() === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(
                products.filter((product) =>
                    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
                )
            );
        }
    }, [debouncedSearch, products]);

    return (
        <>
            <Header />
            <div className='bg-black/20 py-4'>
                <div className='container mx-auto'>
                    <h1 className='text-[20px] font-bold text-center'>All Product List</h1>
                </div>
            </div>
            <div className='container mx-auto px-4'>
                <input
                    type="text"
                    className="border mt-5 p-2 rounded w-full"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                />
                {isLoading ? (
                    <h2 className='font-bold text-center w-full mt-5'>Loading...</h2>
                ) : filteredProducts.length ? (
                    <div className="mt-5 mb-5 grid lg:grid-cols-4 md:grid-cols-3 gap-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="min-w-[25%] border border-black rounded-xl overflow-hidden p-2">
                                <div className='bg-white p-[10px] rounded-xl'>
                                    <img className='object-fill h-64 mx-auto mb-3' src={product.image} alt={product.title} />
                                </div>
                                <h3 className='font-semibold w-[100%] text-lg text-ellipsis overflow-hidden text-nowrap'>
                                    {product.title}
                                </h3>
                                <p className='font-medium mb-2'>Rs. {product.price}</p>
                                <AddToCartButton onClick={() => addToCart(product)} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2 className='font-bold text-center w-full mt-5'>Data Not Found</h2>
                )}
            </div>
        </>
    );
}
