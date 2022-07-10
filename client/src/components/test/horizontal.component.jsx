import React, {useState, useRef, useEffect} from 'react'
import './horizontal.styles.css'
import images  from '../../data'
// import fiction from '../assets/fiction.jpg'

const Horizontal = () => {
    const check = useRef({})
    const [showRight, setShowRight] = useState(check.current?.scrollLeft || 0)
    
    // console.log(check)
    let meter

    useEffect(() => {
        // meter = check.current?.scrollLeft
        setShowRight(check.current?.scrollLeft)
        //console.log(showRight)
    },)

    //console.log(showRight)

   const handleClick = (scrollOffset) => {
        //console.log(check)
        check.current.scrollLeft += scrollOffset
        //setShowRight(check.current?.scrollLeft)
   }

  return (
    <div className='horizontal' ref={check}>
        {images.map((e) => (
            <div key={e.index}  >
                <img key={e.index}
                    src={e.image}
                    alt = ''
                    className='images'
                />
               
            </div>
            
   ) )}
    { showRight > 0 ? <div className='iconRight' onClick={() => handleClick(-250)}>={'>'}</div> : null}
    {/* {check.current?.scrollLeft > 0 ? <div className='iconRight' onClick={() => handleClick(-150)}>={'>'}</div> : null} */}
    <div className='iconLeft' onClick={() => handleClick(250)}>={'>'}</div>
    </div>
  )
}

export default Horizontal