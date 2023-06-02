import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'

const Edit = () => {

    const [products, setProducts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState({});
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();

    console.log(editingItem);


    //! update-product
    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL+"/api/products/update-product", {
                method: "PUT",
                body: JSON.stringify({...values, productId: editingItem._id}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            setProducts(
                products.map((item) => {
                    if(item._id === editingItem._id) {
                        return values
                    }
                    return item;
                })
            );
            message.success("Ürün bilgisi güncellendi.");
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!")
            console.log(error);
        }
    }

    //! get-products
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

    //! get-categories
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

    //! delete-product
    const deleteProduct = (id) => {
        if(window.confirm("Emin misiniz?")) {
             try {
                 fetch(process.env.REACT_APP_SERVER_URL+"/api/products/delete-product", {
                     method: "DELETE",
                     body: JSON.stringify({productId: id}),
                     headers: {"Content-type": "application/json; charset=UTF-8"}
                 })
                 message.success("Ürün başarıyla silindi.");
                 setProducts(products.filter((item) => item._id !== id));
             } catch (error) {
                 message.error("Birşeyler yanlış gitti!");
                 console.log(error);
             }
        }
     }

    const columns = [
        { 
            title: "Ürün Adı",
            dataIndex: "title",
            width: "8%",
            render: (_,record) => {      
                return(
                    record.title
                )
            }
        },
        {
            title: "Ürün Görseli",
            dataIndex: "img",
            width: "4%",
            render: (_,record) => {      
                return <img src={record.img} alt="" className='h-20 object-cover'/>
            }
        },
        {
            title: "Ürün Fiyat",
            dataIndex: "price",
            width: "8%",
        },
        {
            title: "Kategori",
            dataIndex: "category",
            width: "8%",
        },
        {
            title: "İşlemler",
            dataIndex: "action",
            width: "8%",
            render: (_, record) => {
                return(
                    <div className='flex items-center justify-center gap-5'>
                        <Button type='link' className='pl-0' 
                            onClick={() => {
                                setIsEditModalOpen(true)
                                setEditingItem(record)
                            }}>Düzenle</Button>
                        <Button type='text' danger onClick={() => deleteProduct(record._id)}>Sil</Button>
                    </div>
                )
            }
        } 
    ]

  return (
    <>
        <Table bordered dataSource={products} columns={columns} rowKey={"_id"}
       scroll={{ x: "1000px" ,y: 'calc(100vh - 380px)' }}/>

        <Modal title="Yeni Ürün Ekle" 
        centered
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)} footer={false} >
            <Form layout='vertical' onFinish={onFinish} form={form} initialValues={editingItem}>
                <Form.Item name={"title"} label={"Başlık"}
                    rules={[{required: true, message: "Lütfen bir başlık ekleyin!"}]}>
                    <Input placeholder='Elma'/>
                </Form.Item>
                <Form.Item name={"img"} label={"Görsel - Url"}
                    rules={[{required: true, message: "Lütfen bir görsel url ekleyin!"}]}>
                    <Input placeholder='www.image.com'/>
                </Form.Item>
                <Form.Item name={"price"} label={"Fiyat"}
                    rules={[{required: true, message: "Lütfen bir fiyat ekleyin!"}]}>
                    <Input placeholder='20₺'/>
                </Form.Item>
                <Form.Item name={"category"} label={"Kategori"}
                    rules={[{required: true, message: "Lütfen bir kategori ekleyin!"}]}>
                      <Select
                        showSearch
                        placeholder="Kategori Seçiniz"
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.title ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                        (optionA?.title ?? '').toLowerCase().localeCompare((optionB?.title ?? '').toLowerCase())
                        }
                        options={categories}
                        
                     />
                </Form.Item>
                <Form.Item className='flex justify-end mb-0'>
                    <Button type='primary' htmlType='submit'>
                        Güncelle
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
  )
}

export default Edit