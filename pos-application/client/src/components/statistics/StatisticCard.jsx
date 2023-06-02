import React from 'react'

const StatisticCard = ({title, amount, img}) => {
  return (
    <div className="card-item bg-gray-800 rounded-xl p-8">
        <div className='flex gap-x-4 items-center'>
            <div className='rounded-full bg-white w-16 h-16 p-3'>
                <img src={img} alt="" />
            </div>
            <div className='text-white'>
                <p className='mb-2 text-gray-400 font-medium text-lg'>{title}</p>
                <p className='text-xl text-gray-200 font-semibold'>{amount}</p>
            </div>
        </div>
    </div>
  )
}

export default StatisticCard