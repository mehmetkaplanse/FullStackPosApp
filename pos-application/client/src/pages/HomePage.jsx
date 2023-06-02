
import Header from '../components/header/Header'
import Categories from '../components/categories/Categories';
import Products from '../components/products/Products';
import CardTotals from '../components/cart/CardTotals';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';

const HomePage = () => {

  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/get-all");
        const data = await res.json();
        data && 
          setCategories(
            data.map((item) => {
              return {...item, value: item.title}
            })
          )

      } catch (error) {
        console.log(error);
      }
    }

    getCategories();

  },[])

  //! get-all products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/get-all");
        const data = await res.json();
        setProducts(data);

      } catch (error) {
        console.log(error);
      }
    }

    getProducts();

  },[])



  return (
    <>
        <Header setSearch={setSearch} />
        {
          products && categories ? (
            <div className="home px-6 flex flex-col md:flex-row justify-between 
            gap-10 pb-24 md:h-screen">
              <div className="categories overflow-auto max-h-[calc(100vh-130px)]">
              <Categories categories={categories} setCategories={setCategories} 
              setFiltered={setFiltered} products={products}/>
              </div>
              <div className="products flex-[8] max-h-[calc(100vh-130px)] overflow-auto pb-5 min-h-[500px]">
              <Products categories={categories} filtered={filtered} 
              products={products} setProducts={setProducts}
              search={search}/>
              </div>
              <div className="card-wrapper border min-w-[300px] md:-mr-[24px] md:-mt-[24px]">
              <CardTotals />
              </div>
            </div>
          ) : (
               <Spin size='large' className='absolute top-1/2 h-screen w-screen flex justify-center'/>
          )
        }
    </>
  )
}

export default HomePage