import { Button, Form, Input, Modal, Table, message } from 'antd'
import React, { useState } from 'react'

const Edit = ({isEditModalOpen, setIsEditModalOpen, categories, setCategories}) => {

    const [editingRow, setEditingRow] = useState({});

    const onFinish = (values) => {
        try {
            fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/update-category", {
                method: "PUT",
                body: JSON.stringify({...values, categoryId: editingRow._id}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            setCategories(
                categories.map((item) => {
                    if(item._id === editingRow._id) {
                        return { ...item, title: values.title};
                    }
                    return item;
                })
            )
            message.success("Kategori bilgisi güncellendi.");
        } catch (error) {
            message.error("Bir şeyler yanlış gitti!")
            console.log(error);
        }
    }

    const deleteCategory = (id) => {
       if(window.confirm("Emin misiniz?")) {
            try {
                fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/delete-category", {
                    method: "DELETE",
                    body: JSON.stringify({categoryId: id}),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                })
                message.success("Kategori başarıyla silindi.");
                setCategories(categories.filter((item) => item._id !== id));
            } catch (error) {
                message.error("Birşeyler yanlış gitti!");
                console.log(error);
            }
       }
    }

    const columns = [
        { 
            title: "Kategori başlığı",
            dataIndex: "title",
            render: (_,record) => {
                if(record._id === editingRow._id) {
                    return(
                        <Form.Item className='mb-0' name="title" initialValue={record.title}>
                            <Input/>
                        </Form.Item>
                    )
                }
                else {
                    return(
                        record.title
                    )
                }
            }
        },
       {
            title: "İşlemler",
            dataIndex: "action",
            render: (_, record) => {
                return(
                    <div>
                        <Button type='link' onClick={() => setEditingRow(record)} className='pl-0'>Düzenle</Button>
                        <Button type='text' className='text-green-600' htmlType='submit'>Kaydet</Button>
                        <Button type='text' danger onClick={() => deleteCategory(record._id)}>Sil</Button>
                    </div>
                )
            }
       } 
    ]

  return (
    <div>
        <Modal className='md:m-4 m-2' title="Kategori İşlemleri" 
            centered
            open={isEditModalOpen}
            onCancel={() => setIsEditModalOpen(false)} footer={false}>
            <Form onFinish={onFinish}>
                <Table bordered dataSource={categories} columns={columns} rowKey={"_id"}/>
            </Form>
        </Modal>
        
    </div>
  )
}

export default Edit