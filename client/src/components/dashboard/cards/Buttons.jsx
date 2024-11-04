import React from 'react'

function Buttons({name}) {
  return (
    <>
        <li className="flex justify-between items-center p-4 rounded-lg">
                <div>
                <h3 className="text-base font-semibold text-gray-700">{name}</h3>
                </div>
        </li>
    </>
  )
}

export default Buttons
