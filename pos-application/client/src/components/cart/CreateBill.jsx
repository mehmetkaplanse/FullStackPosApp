import { Button, Card, Form, Input, Modal, Select, message } from 'antd'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../../redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const CreateBill = ({isModalOpen, setIsModalOpen}) => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //! create-bill
  const onFinish = async (values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL +'/api/bills/add-bill', {
        method: "POST",
        body: JSON.stringify({
          ...values,
          subTotal: cart.total,
          tax: ((cart.total *cart.tax)/100).toFixed(2),
          totalAmount: (cart.total+(cart.total*cart.tax)/100).toFixed(2),
          cartItems: cart.cartItems,
        }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      if(res.status === 200) {
        message.success('Fatura başarıyla oluşturuldu.');
        setIsModalOpen(false);
        dispatch(reset());
        navigate('/bills');
      }
      
    } catch (error) {
      message.warning('Birşeyler yanlış gitti!');
      console.log(error);
    }
  }


  return (
    <>
         <Modal title="Fatura Oluştur" open={isModalOpen} 
          footer={false} onCancel={() => setIsModalOpen(false)}>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item 
                label="Müşteri Adı" 
                name={"customerName"}
                rules={[{required: true, message: "Müşteri Alanı Boş Bırakılamaz!"}]}>
                  <Input placeholder='Bir Müşteri Adı Yazınız.'/>
                </Form.Item>
                <Form.Item 
                label="Tel No" 
                name={"customerPhoneNumber"}
                rules={[{required: true, message: "Lütfen Tel No Giriniz!"}]}>
                  <Input placeholder='Bir Tel No Yazınız.' maxLength={11}/>
                </Form.Item>
                <Form.Item 
                label="Ödeme Yöntemi" 
                name={"paymentMode"}
                rules={[{required: true, message: "Ödeme Yöntemi Boş Bırakılamaz!"}]}>
                  <Select placeholder="Ödeme Yöntemi Seçiniz">
                    <Select.Option value="Nakit">Nakit</Select.Option>
                    <Select.Option value="Kredi Kart">Kredi Kart</Select.Option>
                  </Select>
                </Form.Item>
                <Card>
                    <div className="flex justify-between">
                        <span>Ara Toplam</span>
                        <span>{cart.total > 0 ? cart.total.toFixed(2): 0}₺</span>
                    </div>
                    <div className="flex justify-between my-2">
                        <span>KDV%{cart.tax}</span>
                        <span className="text-red-500">{(cart.total * cart.tax)/100>0
                        ? `+${((cart.total *cart.tax)/100).toFixed(2)}`:0}₺</span>
                    </div>
                    <div className="flex justify-between">
                        <b>Toplam</b>
                        <b>{(cart.total+(cart.total*cart.tax)/100).toFixed(2)}₺</b>
                    </div>
                    <div className="flex justify-end">
                      <Button className="mt-4" type="primary" 
                      size="large" htmlType='submit'
                        onClick={() => setIsModalOpen(true)}>
                        Sipariş Oluştur
                      </Button>
                    </div>
                </Card>
            </Form>
        </Modal>
    </>
  )
}

export default CreateBill