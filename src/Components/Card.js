import React, { useState } from 'react'
import axiox from 'axios'
import {Link} from "react-router-dom"
import Loading from './Loading'

function Card() {

  const [comment, setComment] = useState("")
  const [sentimental, setSentimental] = useState("")
  const [error, setError] = useState('')
  const [loading,setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const resopnse = await axiox.post("https://sendiment-analysis-backend.onrender.com/api/form", { comment })
      if (resopnse.data.success) {
        setLoading(false)
        setSentimental(resopnse.data.message)
        setComment('')
        setTimeout(() => {
          setSentimental('')
        }, 3000)
      }

    } catch (error) {
      setError(error)
      console.error(error);
    }
  }

  if(loading){
    return <Loading/>
  }

  if (error) {
    return (
      <h1> {error.message} </h1>
    )
  }

  return (
    <div className='h-screen bg-gradient-to-br from-blue-200 to-pink-200 pt-36'>
      <form onSubmit={handleSubmit}>
        <div className='   flex justify-center ' >
          <div className='border border-gray-700 flex flex-col px-5 pt-16 rounded-xl h-80  w-full mx-20 lg:w-[50%]' >
            <label className="font-bold">Enter the comments... </label>
            <input type="text" id="first_name" value={comment} onChange={(e) => setComment(e.target.value)} className="border-b-2 focus:outline-none text-xl text-gray-800 border-gray-800  w-full  bg-transparent text-gray-100    p-2 " placeholder="What do you think?" />
            <div className='flex justify-center w-full' >
              <button type='submit' className='bg-gradient-to-r from-indigo-500 to-pink-500 w-[50%]   border mt-8 rounded-full py-2.5 font-bold' >Submit</button>
            </div>
            {sentimental < 0 ?
              <h1 className=' text-center mt-6 font-bold uppercase text-red-500 s' >it's a negative sentence</h1>
              : sentimental >= 1 ?
                <h1 className=' text-center mt-6 font-bold uppercase text-green-500 s' > It's a positive sentences </h1>
                : sentimental === 0 ?
                  <h1 className=' text-center mt-6 font-bold uppercase text-yellow-500 s' > It's a neutral sentence </h1>
                  :
                  <h1 className=' text-center mt-6 font-bold uppercase text-yellow-500 s' > {sentimental} </h1>
            }
          </div>
        </div>
      </form>
      <div className='text-center text-medium  '>Tab to analysis data 
     <Link to='/table' className='text-purple-700 underline  ml-1 '>here...  </Link>
      </div>
    

    </div>
  )
}

export default Card