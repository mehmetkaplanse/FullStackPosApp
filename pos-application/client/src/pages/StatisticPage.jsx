import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import StatisticCard from '../components/statistics/StatisticCard'
import { Area,Pie } from '@ant-design/plots';
import { Spin } from 'antd';

const StatisticPage = () => {

    const posUser = localStorage.getItem('posUser');
    const username = JSON.parse(posUser).username;

    const [data, setData] = useState();
    const [products, setProducts] = useState([]);

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

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/get-all")
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => {
            console.log('fetch data failed', error);
          });
      };


    const config = {
        data,
        xField: 'customerName',
        yField: 'subTotal',
        xAxis: {
          range: [0, 1],
        },
      };

    const config2 = {
        appendPadding: 10,
        data,
        angleField: 'subTotal',
        colorField: 'customerName',
        radius: 1,
        innerRadius: 0.6,
        label: {
          type: 'inner',
          offset: '-50%',
          content: '{value}',
          style: {
            textAlign: 'center',
            fontSize: 14,
          },
        },
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ],
        statistic: {
          title: false,
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
            content: 'Toplam\nDeğer',
          },
        },
      };


      const totalAmount = () => {
        const amount = data.reduce((total, item) => item.totalAmount + total,0);
        return `${amount.toFixed(2)}₺`;
      }


  return (
    <>
        <Header />
        <h1 className='text-3xl font-bold text-center mb-2'>İstatistiklerim</h1>
        {
          data ? (
            <div className="px-6 pb-20 md:pb-0">
            <div className='statistic-section'>
                <h2 className='text-lg ml-5'>Hoşgeldin 
                    <span className='font-bold text-green-700 text-xl'> {username}</span>
                </h2>
                <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 
                md:gap-10 gap-4 my-5">
                    <StatisticCard 
                        title={"Toplam Müşteri"} 
                        amount={data?.length} 
                        img={"images/user.png"} 
                    />
                    <StatisticCard 
                        title={"Toplam Kazanç"} 
                        amount={totalAmount()} 
                        img={"images/money.png"} 
                    />
                    <StatisticCard 
                        title={"Toplam Satış"} 
                        amount={data?.length} 
                        img={"images/sale.png"} 
                    />
                    <StatisticCard 
                        title={"Toplam Ürün"} 
                        amount={products?.length} 
                        img={"images/product.png"} 
                    />
                </div>
                <div className='flex justify-between gap-10 lg:flex-row flex-col items-center p-5'>
                    <div className='lg:w-1/2 lg:h-60 h-72'>
                        <Area {...config} width={10} />
                    </div>
                    <div className='lg:w-1/2 lg:h-60 h-72'>
                        <Pie {...config2} />
                    </div>
                </div>
            </div>
            </div>
          ) : (
            <Spin size='large' className='absolute top-1/2 h-screen w-screen flex justify-center'/>
          )
        }
    </>
  )
}

export default StatisticPage