import React from 'react'

const AuthCarousel = ({img,title,desc}) => {
  return (
    <div>
      <div className='!flex flex-col items-center justify-center h-full'>
          <img className='w-[500px] h-[500px] px-6' src={img} alt="" />
          <h3 className='text-3xl text-white text-center font-bold'>{title}</h3>
          <p className='mt-2 mb-8 text-white text-2xl text-center'>{desc}</p>
      </div>
    </div>
  )
}

export default AuthCarousel