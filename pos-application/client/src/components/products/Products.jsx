import React, { useState } from 'react'
import ProductItem from './ProductItem';
import {PlusOutlined,EditOutlined} from '@ant-design/icons'
import Add from './Add';
import { useNavigate } from 'react-router-dom';

const Products = ({categories, products, setProducts, filtered, search}) => {

    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const navigate = useNavigate();


    return (
      <div className='products-wrapper grid grid-cols-card gap-4'>
        {
          filtered.filter((product) => product.title.toLowerCase().includes(search))
          .map((item) => (
            <ProductItem item={item} key={item._id}/>
          ))
        }
        <div className='product-item border hover:shadow-lg cursor-pointer hover:opacity-90
          transition-all select-none bg-purple-800 flex justify-center items-center min-h-[186px]' 
          onClick={() => setIsAddModalOpen(true)}>
            <PlusOutlined className='text-white md:text-2xl'/>
        </div>  
        <div className='product-item border hover:shadow-lg cursor-pointer hover:opacity-90
          transition-all select-none bg-orange-800 flex justify-center items-center min-h-[186px]'
            onClick={() => navigate("/products")}>
            <EditOutlined className='text-white md:text-2xl hover:opacity-90'/>
        </div>  
        <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}
          categories={categories} setProducts={setProducts} products={products}/>
      </div>
    )
}

export default Products