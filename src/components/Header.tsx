import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from './cart/Cart';
import { useCart } from '../contex/CartContext';

export default function Header() {
    const [isCart, setIsCart] = useState<boolean>(false);
    const { cart } = useCart();

    return (
        <>
            {isCart && <Cart isCart={isCart} setIsCart={setIsCart} />}
            <div className='flex py-3 bg-black/80 justify-center items-center gap-3'>
                <div className='container mx-auto px-4'>
                    <div className='flex justify-between items-center'>
                        <Link to={'/'}>
                            <img src='image/logo.png' alt='logo' width={100} />
                        </Link>
                        <p className='cursor-pointer relative' onClick={() => setIsCart(!isCart)}>
                            <img src='image/icon/cart.svg' alt='cart' width={30} />
                            {cart.length > 0 && (
                                <span className='rounded-full absolute top-3 right-0 bg-[#000] text-center leading-[18px] 
                                    h-[18px] w-[18px] text-[12px] text-white'>
                                    {cart.length}
                                </span>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
