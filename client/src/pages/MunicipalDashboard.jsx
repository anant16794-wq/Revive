import React from 'react'

const MunicipalDashboard = () => {
  return (
    <div>
      <h2 className='text-3xl'>Waste Insights overview</h2>
      <br />
      <div className="flex justify-evenly mb-2">
        <div className="border border-gray-400 rounded p-10">
          <h2 className='text-3xl'>1,250</h2>
          <p>Total Waste <br /> Collected Today</p>
        </div>
        <div className="border border-gray-400 rounded p-10">
          <h2 className='text-3xl'><img className='size-20 transition-transform transform hover:scale-110 duration-300' src="./vite.svg" alt="" /></h2>
          <p>Trends last 7 days</p>
        </div>
        <div className="border border-gray-400 rounded p-10">
          <h2 className='text-3xl'>60%</h2>
          <p>Recycled <br /> vs Landfill</p>
        </div>
        <div className="border border-gray-400 rounded p-10">
          <h2 className='text-3xl'><img className='size-20' src="./vite.svg" alt="" /></h2>
          <p>Total Waste <br /> Collected Today</p>
        </div>
      </div>
    </div>
  )
}

export default MunicipalDashboard
