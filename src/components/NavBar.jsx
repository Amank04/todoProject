import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex bg-blue-700 justify-between text-white py-2'>
        <div className='logo'>
            <span className='mx-2 font-bold text-2xl'>e-Task</span>
        </div>
        <ul className='flex mx-6 gap-5 text-lg'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>YourTask</li>
        </ul>
    </nav>
  )
}

export default NavBar