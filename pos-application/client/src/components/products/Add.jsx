import { Button, Form, Input, Modal, Select, message } from 'antd'
import React from 'react'

const Add = ({isAddModalOpen, setIsAddModalOpen, categories, setProducts, products}) => {

    const [form] = Form.useForm();

    //! add product with fetch
    const onFinish = (values) => {
        try {
             fetch(process.env.REACT_APP_SERVER_URL+"/api/products/add-product", {
                 method: "POST",
                 body: JSON.stringify(values),
                 headers: {"Content-type": "application/json; charset=UTF-8"}
             });
             message.success("Ürün başarıyla eklendi.")
             form.resetFields();
             setProducts([...products,
            {
                ...values,
                _id: Math.random(),
                price: Number(values.price)
            }])
            setIsAddModalOpen(false);
            
        } catch (error) {
             console.log(error);
        }
     } 

    return (
        <Modal title="Yeni Ürün Ekle" 
        centered
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)} footer={false} >
            <Form layout='vertical' onFinish={onFinish} form={form}>
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
                        Oluştur
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Add