import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loading from './Loading';

function Table() {
const [sendimetalValue,setSendimentalValue] = useState([])
const [loading, setLoading] = useState(false)

const getTableData = async ()=>{
  try {
    setLoading(true)
    const response = await axios.get("https://sendiment-analysis-backend.onrender.com/api/table")
    if(response.data.success){
      setSendimentalValue(response.data.value)
      setLoading(false)
    }
  } catch (error) {
    console.error(error);
  }
}
useEffect(()=>{
getTableData()
},[])

if(loading){
  return <Loading/> 
}


  return (
    <div className='p-5'>
      <div className="relative overflow-x-auto rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-700">
          <thead className="text-xs text-gray-700 uppercase  bg-gray-300 bg-opacity-70 dark:text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                comment
              </th>
              <th scope="col" className="px-6 py-3">
                Sentiment
              </th>
            </tr>
          </thead>
          <tbody>
            {
              sendimetalValue?.map((obj) => (
                <tr className="bg-gray-200 bg-opacity-50 border-b dark:border-gray-500">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950">
                    {obj._id}
                  </th>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-950">
                    {obj.comment}
                  </th>
                  <td className="px-6 py-4">
                    {obj.sentimentalValue === "Negative" ?
                      <button className='bg-red-500 px-2 rounded-full text-gray-200 font-medium' > Negative </button>
                      : obj.sentimentalValue === "Positive" ?
                        <button className='bg-green-500 px-2 rounded-full text-gray-200 font-medium' > Positive </button>
                        : <button className='bg-yellow-500 px-2 rounded-full text-gray-700 font-medium' > Neutral </button>
                    }
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>


    </div>
  )
}

export default Table
