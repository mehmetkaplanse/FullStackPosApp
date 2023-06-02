import { Button, message } from 'antd'
import React from 'react'
import { ClearOutlined, 
    PlusCircleOutlined,
    MinusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteProduct,increase, decrease, reset } from '../../redux/cartSlice';
import {useNavigate} from 'react-router-dom'

const CardTotals = () => {

    const cart = useSelector((state) => state.cart);
    const cartItems = cart.cartItems;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='cart h-full flex flex-col max-h-[calc(100vh-90px)]'>
            <h2 className='bg-blue-600 py-4 text-center text-white tracking-wide'>
                Sepetteki Ürünler
            </h2>
            <ul className="card-items px-2 flex flex-col gap-y-3 pt-2 overflow-y-auto py-2">
                {
                    cartItems.length > 0 ?
                    cartItems.map((item) => (
                        <li className="card-item flex justify-between" key={item._id}>
                            <div className='flex items-center'>
                                <img className='w-16 h-16 object-cover pt-2 
                                cursor-pointer' src={item.img} 
                                alt="" onClick={() => {
                                    dispatch(deleteProduct(item))
                                    message.success('Ürün sepetten silindi.')
                                }} />
                                <div className='flex flex-col ml-2'>
                                    <b>{item.title}</b>
                                    <span>{item.price}₺ x {item.quantity}</span>
                                </div>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <Button type='primary' 
                                size='small'
                                icon={<PlusCircleOutlined/>}
                                onClick={() => dispatch(increase(item))}
                                className='w-full flex items-center justify-center !rounded-full' />
                                <span className='font-bold'>{item.quantity}</span>
                                <Button type='primary' 
                                size='small'
                                icon={<MinusCircleOutlined/>}
                                onClick={() => {
                                    if(item.quantity === 1) {
                                        if(window.confirm('Ürün silinsin mi?')){
                                            dispatch(decrease(item))
                                            message.success('Ürün sepetten silindi.')
                                        }
                                    }
                                    if(item.quantity > 1) {
                                        dispatch(decrease(item))
                                    }
                                }}
                                className='w-full flex text-center items-center justify-center !rounded-full' />
                            </div>
                        </li>
                    )).reverse() : 
                    <p className='text-center'>
                        Sepetinizde henüz ürün yok.
                    </p>
                }
            </ul>
            <div className="card-totals mt-auto">
                <div className='border-b border-t'>
                    <div className='flex justify-between p-2'>
                        <b>Ara Toplam</b>
                        <span>{(cart.total).toFixed(2)}₺</span>
                    </div>
                    <div className='flex justify-between p-2'>
                        <b>KDV %{cart.tax}</b>
                        <span className='text-red-700'>
                            +{(cart.total*cart.tax)/100 > 0 ? ((cart.total*cart.tax)/100).toFixed(2) : 0}₺
                        </span>
                    </div>
                </div>
                <div className='border-b'>
                    <div className='flex justify-between p-2'>
                        <b className='text-green-500 text-lg'>Genel Toplam</b>
                        <span className='text-xl'>
                            {(cart.total+(cart.total*cart.tax)/100).toFixed(2)}₺
                        </span>
                    </div>
                </div>
                <div className='py-4 px-2'>
                    <Button className='w-full' type='primary' size='large'
                    disabled={cartItems.length===0 ? true : false} 
                    onClick={() => navigate('/cart')}>
                        Sipariş Oluştur
                    </Button>
                    <Button icon={<ClearOutlined />} className='w-full mt-2 flex items-center 
                    justify-center' type='primary' danger size='large' 
                    disabled={cartItems.length===0 ? true : false}
                    onClick={() => {
                        if(window.confirm('Sepet temizlensin mi?')) {
                            dispatch(reset());
                            message.success('Sepetiniz temizlendi.')
                        }
                    }}>
                        Temizle
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardTotals