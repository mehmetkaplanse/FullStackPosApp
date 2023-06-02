import React, { useState } from 'react'
import {Button, Carousel, Checkbox, Form, Input, message} from 'antd'
import {Link, json, useNavigate} from 'react-router-dom'
import AuthCarousel from '../../components/auth/AuthCarousel'

const Register = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        body: JSON.stringify(values),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      });

      const user = await res.json();
      console.log(user);

      if(res.status === 200) {
        localStorage.setItem("posUser",JSON.stringify({
          username: user.username,
          email: user.email
        }));
        message.success('Giriş başarılı.')
        navigate('/');
        setLoading(false);
      }
      else if(res.status === 404) {
        message.error('Kullanıcı bulunamadı!')
        setLoading(false);
      }
      else if(res.status === 403) {
        message.error('Parola hatalı!')
        setLoading(false);
      }
      
    } catch (error) {
      console.log(error);
      message.error('Birşeyler yanlış gitti!')
      setLoading(false);
    }
  }



  return (
    <div className='h-screen'>
        <div className='flex justify-between h-full'>
            <div className='xl:px-20 px-10 w-full flex flex-col h-full justify-center'>
                <h1 className='text-center text-5xl font-bold mb-10'>LOGO</h1>
                <Form layout='vertical' onFinish={onFinish} initialValues={{remember: false}}>
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
                  <Form.Item name={"remember"} valuePropName='checked'>
                    <div className='flex justify-between items-center'>
                        <Checkbox>Remember Me</Checkbox>
                        <Link>Forgot Password</Link>
                    </div>
                  </Form.Item>
                  <Form.Item>
                    <Button className='w-full' htmlType='submit' 
                    type='primary' loading={loading}>Giriş Yap</Button>
                  </Form.Item>
                </Form>
                <div className='flex flex-col justify-center items-center w-full mt-10 text-sm'>
                  Henüz bir Hesabınız yok mu? &nbsp; <Link className='text-blue-500' to={"/register"}>Hemen Kaydolun.</Link>
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