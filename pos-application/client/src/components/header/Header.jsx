import React from 'react'
import { SearchOutlined, 
    HomeOutlined,ShoppingCartOutlined,
    CopyOutlined,
    UserOutlined,
    BarChartOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
import { Badge, Input, message } from 'antd';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import './style.css';


const Header = ({ setSearch }) => {

    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const logOut = () => {
        if(window.confirm('Çıkış yapmak istiyor musunuz?')) {
            localStorage.removeItem('posUser');
            navigate('/login');
            message.success('Çıkış yapıldı.');
        }
    }

    return (
        <div className='border-b mb-6'>
            <header className='py-4 px-6 flex items-center justify-between gap-10'>
                {/* LOGO */}
                <div className="logo">
                    <Link to="/">
                        <h2 className='text-2xl font-bold md:text-4xl'>LOGO</h2>
                    </Link>
                </div>
                {/* search input */}
                <div className="header-search flex-1">
                    <Input className='rounded-full max-w-[800px]' 
                    size="large" placeholder="Ürün Ara..." 
                    prefix={<SearchOutlined/>} 
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    onClick={() => {
                        pathname !== '/' && navigate('/')
                    }}
                    />
                </div>
                {/* menu items */}
                <div className="menu-links">
                    <Link to={"/"} className={`menu-link ${
                        pathname === '/' && 'active'
                    }`}>
                        <HomeOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[12px]'>Anasayfa</span>
                    </Link>
                    <Badge count={cart.cartItems.length} offset={[0,0]} className='md:flex hidden'>
                        <Link to={"/cart"} className={`menu-link ${
                            pathname === '/cart' && 'active'
                        }`}>
                            <ShoppingCartOutlined className='text-2xl' />
                            <span className='md:text-xs text-[12px]'>Sepet</span>
                        </Link>
                    </Badge>
                    <Link to={"/bills"} className={`menu-link ${
                        pathname === '/bills' && 'active'
                    }`}>
                        <CopyOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[12px]'>Faturalar</span>
                    </Link>
                    <Link to={"/customers"} className={`menu-link ${
                        pathname === '/customers' && 'active'
                    }`}>
                        <UserOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[12px]'>Müşteriler</span>
                    </Link>
                    <Link to={"/statistics"} className={`menu-link ${
                        pathname === '/statistics' && 'active'
                    }`}>
                        <BarChartOutlined className='md:text-2xl text-xl' />
                        <span className='md:text-xs text-[12px]'>İstatistikler</span>
                    </Link>
                    <div onClick={logOut}>
                        <Link className="menu-link">
                            <LogoutOutlined className='md:text-2xl text-xl' />
                            <span className='md:text-xs text-[12px]'>Çıkış</span>
                        </Link>
                    </div>
                </div>

                <Badge count={cart.cartItems.length} offset={[0,0]} className='md:hidden flex'>
                        <Link to={"/cart"} className={`menu-link ${
                            pathname === '/cart' && 'active'
                        }`}>
                            <ShoppingCartOutlined className='text-2xl' />
                            <span className='md:text-xs text-[12px]'>Sepet</span>
                        </Link>
                </Badge>
            </header>
        </div>
    )
}

export default Header