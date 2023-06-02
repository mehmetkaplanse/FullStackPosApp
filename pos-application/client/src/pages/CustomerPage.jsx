import { Spin, Table } from "antd";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";

const CustomerPage = () => {

  const [bills, setBills] = useState();
 
    //! get-all-bills
    useEffect(() => {
      try {
        const getBills = async() => {
          const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/get-all");
          const data = await res.json();
          setBills(data);
        }
        getBills();
      
      } catch (error) {
        console.log(error);
      }
    },[])


  const [isModalOpen, setIsModalOpen] = useState(false);


  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Telefon Numarası',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'İşlem Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return <span>{text.substring(0,10)}</span>
      }
    },
  ];

  
  return (
    <>
      <Header />
      <h1 className="text-4xl text-center font-bold mb-4">Müşteriler</h1>
      {
        bills ? (
          <div className="px-6">
            <Table dataSource={bills} columns={columns} rowKey={"_id"}
            bordered pagination={false}
            scroll={{
              x: 1000,
              y: 300
            }}/>
          </div>
        ) : (
          <Spin size='large' className='absolute top-1/2 h-screen w-screen flex justify-center'/>
        )
      }
    </>
  );
};

export default CustomerPage;
