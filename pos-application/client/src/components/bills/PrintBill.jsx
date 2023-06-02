import { Button, Modal} from 'antd'
import React, { useRef } from 'react'
import {useReactToPrint} from 'react-to-print';

const PrintBill = ({isModalOpen, setIsModalOpen, customer}) => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

  return (
    <>
         <Modal title="Fatura Yazdır" open={isModalOpen} 
          footer={false} onCancel={() => setIsModalOpen(false)} width={800}>
            
            <section className='py-20 bg-black' ref={componentRef}>
                <div className='max-w-5xl mx-auto bg-white px-6'>
                    <article className='overflow-hidden'>
                        <div className="logo my-6">
                            <h2 className='text-4xl font-bold text-slate-700'>LOGO</h2>
                        </div>

                        <div className="bill-details">
                            <div className='grid sm:grid-cols-4 grid-cols-3 gap-10'>
                                <div className='text-md text-slate-500'>
                                    <p className='font-bold text-slate-700'>Fatura Detayı</p>
                                    <p>{customer?.customerName}</p>
                                    <p>Fake Street 123</p>
                                    <p>San Javier</p>
                                    <p>CA 1234</p>
                                </div>
                                <div className='text-md text-slate-500'>
                                    <p className='font-bold text-slate-700'>Fatura Numarası</p>
                                    <p>The Boring Company</p>
                                    <p>Tesla Street 007</p>
                                    <p>Frisco</p>
                                    <p>CA 0000</p>
                                </div>
                                <div className='text-md text-slate-500'>
                                    <p className='font-bold text-slate-700'>Fatura Numarası</p>
                                    <p>000{Math.floor(Math.random()*100)}</p>
                                    <p className='font-bold text-slate-700 mt-2'>Veriliş Tarihi</p>
                                    <p>{customer?.createdAt.substring(0,10)}</p>
                                </div>
                                <div className='text-md text-slate-500 sm:block hidden'>
                                    <p className='font-bold text-slate-700'>Şartlar</p>
                                    <p>10 Gün</p>
                                    <p className='font-bold text-slate-700 mt-2'>Vade</p>
                                    <p>2023-11-21</p>
                                </div>
                            </div>
                        </div>

                        <div className='bill-table-area mt-8'>
                            <table className='min-w-full divide-y divide-slate-200 overflow-hidden'>
                                <thead>
                                    <tr>
                                        <th scope='col' className='py-3.5  text-left
                                        text-sm text-slate-700 font-normal sm:pl-6  
                                        md:pl-0 sm:table-cell hidden'>Görsel</th>

                                        <th scope='col' className='py-3.5 text-left
                                        text-sm text-slate-700 font-normal  
                                        md:pl-0 sm:table-cell hidden'>Başlık</th>
                                        <th scope='col' className='py-3.5 text-left
                                        text-sm text-slate-700 font-normal 
                                        md:pl-0 sm:hidden' colSpan={4}>Başlık</th>

                                        <th scope='col' className='py-3.5 text-center
                                        text-sm text-slate-700 font-normal sm:pl-6  
                                        md:pl-0 sm:table-cell hidden'>Fiyat</th>
                                        <th scope='col' className='py-3.5 text-center
                                        text-sm text-slate-700 font-normal sm:pl-6  
                                        md:pl-0 sm:table-cell hidden'>Adet</th>
                                        <th scope='col' className='py-3.5 text-end
                                        text-sm text-slate-700 font-normal sm:pl-6  
                                        md:pl-0'>Toplam</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {
                                    customer?.cartItems?.map((item) => (
                                        <tr className='border-t border-slate-200'>
                                            <td className='py-4 hidden sm:table-cell'>
                                                <img className='w-12 h-12 object-cover' src={item.img} alt="" />
                                            </td>
                                            <td className='py-4'>
                                                <div className='flex flex-col'>
                                                    <span className='font-medium'>{item.title}</span>
                                                    <span className='font-medium sm:hidden inline-block text-xs'>Birim fiyatı {item.price}₺</span>
                                                </div>
                                            </td>
                                            <td className='py-4 text-center hidden sm:table-cell'>
                                                <span className='font-medium'>{item.price}₺</span>
                                            </td>
                                            <td className='py-4 text-center hidden sm:table-cell'>
                                                <span className='font-medium'>{item.quantity}</span>
                                            </td>
                                            <td className='py-4 text-end sm:table-cell hidden'>
                                                <span className='font-medium'>{(item.quantity * item.price).toFixed(2)}₺</span>
                                            </td>
                                            <td className='py-4 text-end sm:hidden' colSpan={4}>
                                                <span className='font-medium'>{(item.quantity * item.price).toFixed(2)}₺</span>
                                            </td>
                                        </tr>
                                    ))
                                   }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className='text-right pt-4 sm:table-cell hidden' colSpan={4} scope='row'>
                                            <span className='font-normal text-slate-700'>Ara Toplam</span>
                                        </th>
                                        <th className='text-left pt-4 sm:hidden' scope='row'>
                                            <span className='font-normal text-slate-700'>Ara Toplam</span>
                                        </th>
                                        <th className='text-right pt-4' colSpan={4} scope='row'>
                                            <span className='font-normal text-slate-700'>{customer?.subTotal}₺</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='text-right pt-4 sm:table-cell hidden' colSpan={4} scope='row'>
                                            <span className='font-normal text-slate-700'>KDV</span>
                                        </th>
                                        <th className='text-left pt-4 sm:hidden' scope='row'>
                                            <span className='font-normal text-slate-700'>KDV</span>
                                        </th>
                                        <th className='text-right pt-4' colSpan={4} scope='row'>
                                            <span className='font-normal text-red-500'>+{customer?.tax}₺</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className='text-right pt-4 sm:table-cell hidden' colSpan={4} scope='row'>
                                            <span className='font-normal text-slate-700'>Genel Toplam</span>
                                        </th>
                                        <th className='text-left pt-4 sm:hidden' scope='row'>
                                            <span className='font-normal text-slate-700'>Genel Toplam</span>
                                        </th>
                                        <th className='text-right pt-4' colSpan={4} scope='row'>
                                            <span className='font-normal text-slate-700'>{customer?.totalAmount}₺</span>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>

                            <div className='py-9'>
                                <div className='border-t pt-9 border-slate-200'>
                                    <p className=' text-xs font-light'>
                                        Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                                        Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden
                                        sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti
                                        talep etme hakkına sahip olduklarını ve bu noktada bu ücrete
                                        ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                                        Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi
                                        geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 Bank of
                                        England tabanı olmak üzere toplam %8,5 uygulanacaktır.
                                        Taraflar Kanun hükümleri dışında sözleşme yapamazlar.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </article>
                </div>
            </section>

            <div className='flex justify-end mt-4'>
                <Button type='primary' size='large' onClick={handlePrint}>Yazdır</Button>
            </div>
        </Modal>
    </>
  )
}

export default PrintBill