import React, {useState, useRef} from 'react'
import './status.styles.css'
import images from '../../data'
import {BsChevronRight} from 'react-icons/bs'
import {BsChevronLeft} from 'react-icons/bs'



const Status = () => {
    const check = useRef({})
    const [showRight, setShowRight] = useState(1)

   const handleClick = (scrollOffset) => {
        check.current.scrollLeft += scrollOffset
   }

  return (
    <div className='status' ref={check}>
        {images.map((e) => (
            <div key={e.index} className ='stat' >
                <img key={e.index}
                    src={e.image}
                    alt = ''
                    className='status_images'
                /> 
                <p>espn</p>
            </div>
            
   ) )}
     <div className='status_iconLeft' onClick={() => handleClick(-420)}><BsChevronLeft color = "black" className='route' size={14}/> </div>
    <div className='status_iconRight' onClick={() => handleClick(420)}> <BsChevronRight color = "black" className='route' size={14}/> </div>
    </div>
  )
}

export default Status