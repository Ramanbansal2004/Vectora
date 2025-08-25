import React from 'react'

const Alert = ({co, ci}) => {
    const input=Array.from({ length: ci });
  return (
    <div className='fixed top-4 left-1/2 bg-white p-4 flex'>
        <div>
            Input
            {input.map((_, index) => (
                <div>
                    <textarea placeholder='Input'/>
                    </div>
            ))}
        </div>
        <div>
            Output
            {Array.from({ length: co }).map((_, index) => (
                <div>
                    <textarea></textarea>
                    </div>
            ))}
        </div>
    </div>
  )
}

export default Alert