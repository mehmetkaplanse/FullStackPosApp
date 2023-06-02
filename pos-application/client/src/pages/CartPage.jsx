import { Button, Card,Popconfirm,Table, message } from "antd";
import {
  PlusCircleOutlined,
  MinusCircleOutlined } from '@ant-design/icons';
import Header from "../components/header/Header";
import { useState } from "react";
import CreateBill from "../components/cart/CreateBill";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { increase, decrease, deleteProduct} from '../redux/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  const columns = [
    {
      title: 'Görsel',
      dataIndex: 'img',
      key: 'img',
      width: "125px",
      render:(text) => {
        return (
          <img src={text} alt="" className="w-full h-20 object-cover"/>
        )
      }
    },
    {
      title: 'Ürün Adı',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (price) => {
        return (
          <span>{price.toFixed(2)}₺</span>
        )
      },
      sorter: (a,b) => a.price - b.price
    },
    {
      title: 'Adet',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text,record) => {
        return (
          <div className='flex items-center gap-x-2'>
            <Button type='primary' 
            size='small'
            icon={<PlusCircleOutlined/>}
            onClick={() => dispatch(increase(record))}
            className='w-full flex items-center justify-center !rounded-full' />
            <span className='font-bold'>{record.quantity}</span>
            <Button type='primary' 
            size='small'
            icon={<MinusCircleOutlined/>}
            onClick={() => {
                if(record.quantity === 1) {
                    if(window.confirm('Ürün silinsin mi?')){
                        dispatch(decrease(record))
                        message.success('Ürün sepetten silindi.')
                    }
                }
                if(record.quantity > 1) {
                    dispatch(decrease(record))
                }
            }}
            className='w-full flex text-center items-center justify-center !rounded-full' />
          </div>
        )
      }
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'price',
      key: 'price',
      render: (text,record) => {
        return (
          <span>{(record.quantity * record.price).toFixed(2)}₺</span>
        )
      }
    },
    {
      title: 'İşlemler',
      render: (_,record) => {
        return (
          <Popconfirm
          title="Silmek için emin misiniz?"
          onConfirm={() => {
            dispatch(deleteProduct(record))
            message.success('Ürün sepetten silindi.')
            }}
          okText="Evet"
          cancelText="Hayır" onClic
          >
            <Button className="w-full" danger>SİL</Button>
          </Popconfirm> 
        )
      }
    },
  ];

  
  return (
    <>
      <Header />
      <div className="px-6">
        {
          cart.cartItems.length > 0 ? <Table scroll={{ x: 1000 ,y: 300}} dataSource={cart.cartItems} columns={columns} bordered pagination={false}/>
          : <div className="text-center">
            Sepetinizde herhangi bir ürün bulunmuyor.
          </div>
        }
        <div className="card-total flex justify-end mt-4">
            <Card className="w-72 md:mb-0 mb-[80px]">
                <div className="flex justify-between">
                    <span>Ara Toplam</span>
                    <span>{cart.total > 0 ? cart.total.toFixed(2): 0}₺</span>
                </div>
                <div className="flex justify-between my-2">
                    <span>KDV %{cart.tax}</span>
                    <span className="text-red-500">{(cart.total * cart.tax)/100>0
                    ? `+${((cart.total *cart.tax)/100).toFixed(2)}`:0}₺</span>
                </div>
                <div className="flex justify-between">
                    <b>Toplam</b>
                    <b>{(cart.total+(cart.total*cart.tax)/100).toFixed(2)}₺</b>
                </div>
                <Button className="mt-3 w-full" type="primary" size="large"
                  onClick={() => setIsModalOpen(true)}
                  disabled={cart.cartItems.length>0 ? false : true}>
                  Sipariş Oluştur
                </Button>
            </Card> 
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
