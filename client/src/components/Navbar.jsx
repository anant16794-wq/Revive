import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-36 border-b border-grey-500 py-4 bg-emerald-600 w-full">
      <img src='' alt="Logo" className='w-28 lg:w-32 cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-white'>
        <div className='flex items-center gap-5'>
            <button>Dashboard</button>
            <button>Ward</button>
            <button>Analytics</button>
        </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full">Get Started</button>
      </div>
    </div>
    </div>
  )
}

export default Navbar
