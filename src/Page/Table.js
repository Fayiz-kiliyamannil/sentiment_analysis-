import React from 'react'
import Graph from "../Components/Graph"
import Table from "../Components/Table"


function Tables() {
  return (
    <>
    <div className=' flex  max-lg:flex-col-reverse  bg-gradient-to-br from-blue-200 to-pink-200 ' >
    <div className=' flex-1'>
      <Table/>
      </div>
      <div className='max-lg:w-full max-lg:flex max-lg:justify-center ' > 
      <Graph/>
      </div>
     
    </div>
   
    </>
  )
}

export default Tables

