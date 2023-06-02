import React, { useState } from 'react'
import {Button, Carousel, Form, Input, message} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import AuthCarousel from '../../components/auth/AuthCarousel'

const Register = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      if(res.status === 200) {
        message.success('Kayıt işlemi başarılı.')
        navigate('/login');
        setLoading(false);
      }
      
    } catch (error) {
      console.log(error);
      message.error('Birşeyler yanlış gitti!')
    }
  }

  return (
    <div className='h-screen'>
        <div className='flex justify-between h-full'>
            <div className='xl:px-20 px-10 w-full flex flex-col h-full justify-center'>
                <h1 className='text-center text-5xl font-bold mb-10'>LOGO</h1>
                <Form layout='vertical' onFinish={onFinish}>
                  <Form.Item 
                  label="Kullanıcı adı"
                  name={"username"}
                  rules={[
                    {
                      required: true,
                      message: "Kullanıcı adı alanı boş geçilemez!"
                    }
                  ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item 
                  label="Email"
                  name={"email"}
                  rules={[
                    {
                      required: true,
                      message: "Email alanı boş geçilemez!"
                    }
                  ]}>
                    <Input />
                  </Form.Item>
                  <Form.Item 
                  label="Şifre"
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "Şifre alanı boş geçilemez!"
                    }
                  ]}>
                    <Input.Password />
                  </Form.Item>
                  <Form.Item 
                  label="Şifre Tekrar"
                  dependencies={['password']}
                  name={"passwordAgain"}
                  rules={[
                    {
                      required: true,
                      message: "Şifre (Tekrar) alanı boş geçilemez!"
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Şifreler aynı olmak zorunda!'));
                      },
                    })
                  ]}>
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button className='w-full' htmlType='submit' 
                    type='primary' loading={loading}>Kaydol</Button>
                  </Form.Item>
                </Form>
                <div className='flex flex-col justify-center items-center w-full mt-5 text-sm'>
                  Bir Hesabınız var mı? &nbsp; <Link className='text-blue-500' to={"/login"}>Şimdi Giriş Yapın.</Link>
                </div>
            </div>
            <div className='xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff]'>
              <div className='w-full'>
                <Carousel className='!h-full' autoplay>
                    <AuthCarousel img={"/images/responsive.svg"} title={"Responsive"}
                      desc={"Tüm Cihaz Boyutlarıyla Uyumluluk"} 
                      />
                    <AuthCarousel img={"/images/statistic.svg"} title={"İstatistikler"}
                    desc={"Geniş Tutulan İstatistikler"} 
                      />
                    <AuthCarousel img={"/images/customer.svg"} title={"Müşteri Memnuniyeti"}
                    desc={"Deneyim Sonunda Üründen Memnun Müşteriler"} 
                      />
                    <AuthCarousel img={"/images/admin.svg"} title={"Yönetici Paneli"}
                    desc={"Tek Yerden Yönetim"} 
                      />
                </Carousel>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Register