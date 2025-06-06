import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { github, logo2 } from './assets';
import { Home, CreatePost } from './pages';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="dark">
      <BrowserRouter>
        <header className='w-full flex justify-between items-center bg-gray-900 sm:px-8 py-4 px-4 border-b border-b-gray-800'>
          <Link to="/">
            <img src={logo2} alt="" className='w-14 object-contain' />
          </Link>
          <h1 className='text-4xl font-bold text-white'>Promptify.AI</h1>
          <div className='flex gap-x-4'>
            <Link to="/create-post" className='font-inter font-medium bg-blue-500 text-white px-4 py-2 rounded-md'>
              Create
            </Link>

            <Link to="https://github.com/parthk02/MCA_final" target='_blank' className='flex border-white border-2 font-medium text-white px-2 py-2 rounded-md'>
              <img src={github} alt="git" className='w-6 h-6 mx-1' />
            </Link>
          </div>

        </header>

        <main className='sm:p-8 px-4 py-8 w-full bg-gray-950 min-h-[calc(100vh-73px)]'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
