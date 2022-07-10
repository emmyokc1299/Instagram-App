import React, {useState, useRef, useEffect} from 'react'
import './slide.styles.css'
import fiction from '../../assets/fiction.jpg'
import health from '../../assets/health.jpg'
import culture from '../../assets/culture.jpg'
import vid from '../../assets/react.mp4'
import ReactPlayer from 'react-player'


const Slide = () => {

    const slide = [fiction, vid, health, culture]
    const move = useRef({})

    const arr = new Array(slide.length - 1).fill('white')
    let [newArr, setNewArr] = useState(['blue', ...arr])

    const moveDot = (direction) => {
        if(direction === "right" && newArr.indexOf('blue') + 1 < newArr.length){
            newArr.splice( newArr.indexOf('blue') + 1 , 0 , (newArr.splice(newArr.indexOf('blue'), 1)[0]))  
            setNewArr([...newArr])
        }
        else if (direction === "left"&& newArr.indexOf('blue') - 1 >= 0){
            newArr.splice( newArr.indexOf('blue') - 1 , 0 , (newArr.splice(newArr.indexOf('blue'), 1)[0]))  
            setNewArr([...newArr])
        }
      
    }

    const handleClick = (scrollOffset) => {
        move.current.scrollLeft += scrollOffset

        if (scrollOffset > 0) {
            moveDot("right")
        }
        else if (scrollOffset < 0){
            moveDot("left")
        }
   }

    const media = (e) => {
        let element = e.toString().split('')
        let index = e.toString().split('').length - 1
        if (element[index] === '4'){
            return(
                <div className='videoplayer'>
                    <ReactPlayer url={e} playing={true} light={true} controls={true} width={400} height={400}/>
                </div>
            )
        }
        else{
            return(
                <img 
                key={slide.indexOf(e)}
                src={e}
                alt=''
                className='image'
                />
            )
        }
    }

  return (
      <>
        { newArr.indexOf('blue') > 0 ? (<div className='arrowLeft' onClick={() => handleClick(-400)}> ={'>'} </div>) : null}
        <div className='slideContainer' ref={move}>
            {slide.map((e) => (
            media(e)
            ))}
        </div>
        <div className='bubble'>
            {
                newArr.map(e => (
                    <span className={`${e}`}></span>
                ))
            }
        </div>
        {newArr.indexOf('blue') !== newArr.length - 1 ? (<div className='arrowRight' onClick={() => handleClick(400)}> ={'>'} </div>) : null}
        
      </>
    
  )
}

export default Slide


/**
 * When ever you want to conditionally render an element, make sure the variable upon which it depends is part of the component state and not related to a DOM property else it will be one step behind in responding. That is why newArr is used to conditionally render the arrows and move.current.scrollLeft isn't used because the changes to the move Ref isn't as responsive as changes to the newArr state.
 */