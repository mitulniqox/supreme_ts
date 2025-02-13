import React from 'react';
import styles from "./Cart.module.css";
import { useCart } from '../../contex/CartContext';

interface CartProps {
    isCart: boolean;
    setIsCart: (isOpen: boolean) => void;
}

interface CartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    qty: number;
}

export default function Cart({ isCart, setIsCart }: CartProps) {
    const { cart, increaseQty, decreaseQty, removeFromCart, getSubtotal } = useCart();

    return (
        <div className={styles.cart}>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='m-0 uppercase font-bold'>Shopping Cart</h2>
                <p className='cursor-pointer' onClick={() => setIsCart(!isCart)}>
                    <img src='image/icon/close.svg' alt='close' width={16} />
                </p>
            </div>

            {cart.length === 0 ? (
                <h2 className='font-bold text-center w-full mt-5'>Cart is empty</h2>
            ) : (
                <div className='flex flex-col gap-3'>
                    <div className='h-[calc(100vh-110px)] overflow-y-auto flex flex-col gap-3'>
                        {cart.map((item: CartItem) => (
                            <div className='flex gap-2 items-center' key={item.id}>
                                <div className='h-[80px] w-[80px] flex p-2 border border-[#f7f7f7]'>
                                    <img src={item.image} className='w-full' alt={item.title} />
                                </div>
                                <div className='w-[calc(100%-100px)]'>
                                    <p className='text-ellipsis font-semibold overflow-hidden text-nowrap'>{item.title}</p>
                                    <span className='text-sm'>Rs. {item.price}</span>
                                    <div className='flex'>
                                        <button onClick={() => decreaseQty(item.id)} className="px-2">➖</button>
                                        <span className="px-2">{item.qty}</span>
                                        <button onClick={() => increaseQty(item.id)} className="px-2">➕</button>
                                    </div>
                                </div>
                                <button className='cursor-pointer w-[18px]' onClick={() => removeFromCart(item.id)}>
                                    <img src='image/icon/delete.svg' alt='delete' width={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-lg font-bold">Subtotal: Rs. {getSubtotal()?.toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
}
