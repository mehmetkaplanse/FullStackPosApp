import { Button,Spin, Table } from "antd";
import Header from "../components/header/Header";
import { useEffect, useState } from "react";
import PrintBill from "../components/bills/PrintBill";

const BillPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bills, setBills] = useState();
  const [customer, setCustomer] = useState();

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


  const columns = [
    {
      title: 'Müşteri Adı',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Telefon No',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
    },
    {
      title: 'Oluşturma Tarihi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => {
        return <span>{text.substring(0,10)}</span>
      }
    },
    {
      title: 'Ödeme Yöntemi',
      dataIndex: 'paymentMode',
      key: 'paymentMode',
    },
    {
      title: 'Toplam Fiyat',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => {
        return <span className="text-green-500">{text}₺</span>
      }
    },
    {
      title: 'İşlem',
      dataIndex: 'action',
      key: 'action',
      render: (_,record) => {
        return <Button type="link" onClick={() => {
          setIsModalOpen(true)
          setCustomer(record)
        }}>Yazdır</Button>
      }
    },
  ];

  
  return (
    <>
      <Header />
      <h1 className="text-4xl text-center font-bold mb-4">Faturalar</h1>
      {
        bills ? (
          <div className="px-6">
            <Table dataSource={bills} columns={columns} bordered rowKey={"_id"}
            pagination={false} scroll={{
              x:1000,
              y:300
            }}/>
          </div>
        ) : (
          <Spin size='large' className='absolute top-1/2 h-screen w-screen flex justify-center'/>
        )
      }
      <PrintBill isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen} 
        customer={customer} />
    </>
  );
};

export default BillPage;
