import { useEffect, useRef, useState } from 'react';
import './index.less'
import { ITEM_HEIGHT, ITEM_WIDTH } from './homeCommon/common';
export default function HomePage() {
  const [mouseDown,setMouseDown] = useState(false)
  const [touchStart,setTouchStart] = useState(false)
  const [transform,setTransform] = useState('')
  // const [windowWidth,setWindowWidth] = useState(0)
  // const [windowHieght,setWindowHeight] = useState(0)

  // useEffect(()=>{
  //   setWindowWidth(window.innerWidth)
  //   setWindowHeight(window.innerHeight)
  //   document.addEventListener('resize',()=>{
  //     setWindowWidth(window.innerWidth)
  //     setWindowHeight(window.innerHeight)
  //   })
  // },[])

  const mouseDownPageX = useRef(0)
  const mouseDownPageY = useRef(0)
  const transformX = useRef(0)
  const transformY = useRef(0)

  function onMouseDown(e:any){
    setMouseDown(true)
    console.log('鼠标按下',e.nativeEvent)
    mouseDownPageX.current = e.nativeEvent.pageX
    mouseDownPageY.current = e.nativeEvent.pageY
  }
  function onMouseMove(e:any){
    if (mouseDown){
      console.log('鼠标按下移动X',e.nativeEvent.pageX - mouseDownPageX.current)
      console.log('鼠标按下移动Y',e.nativeEvent.pageY - mouseDownPageY.current)
      setTransform(`translate3d(${ transformX.current + e.nativeEvent.pageX - mouseDownPageX.current}px, ${transformY.current + e.nativeEvent.pageY - mouseDownPageY.current}px, 0px)`)
    }
  }
  function onMouseUp(e:any){
    setMouseDown(false)
    console.log('鼠标抬起')
    transformX.current =  transformX.current + e.nativeEvent.pageX - mouseDownPageX.current
    transformY.current = transformY.current + e.nativeEvent.pageY - mouseDownPageY.current

    console.log('transformX=',transformX.current)
    console.log('transformY=',transformY.current)

  }


  function onTouchStart(){
    setTouchStart(true)
    console.log('滑动开始')
  }
  function onTouchMove(e:any){
    if (touchStart){
      console.log('滑动中',e)
    }
  }
  function onTouchEnd(){
    setTouchStart(false)
    console.log('滑动结束')
  }
  function onTouchCancel(){
    setTouchStart(false)
    console.log('滑动取消')
  }
  function onWheel(e:any){
    console.log('滑动监听开始',e)
    if (e.deltaY < 0){
      console.log('向下滚动')
      if (e.deltaX < 0){
        console.log('向右滚动')
      }else {
        console.log('向左滚动')
      }
    }else {
      console.log('向上滚动')
      if (e.deltaX < 0){
        console.log('向右滚动')
      }else {
        console.log('向左滚动')
      }
    }
  }

  return (
    <div className='productPage'>
      <div className='stage'>
        <div className='contentView'
          style={{
            cursor:mouseDown ? 'grabbing' : 'grab',
            transform

          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onWheel={onWheel}
        >
          {
            new Array(160).fill('').map((item:any,index:number)=>{
              return <div id={'item_' + (index+1)} className='item1' key={'item' + index} style={{
                width:ITEM_WIDTH,
                height:ITEM_HEIGHT,
              }}>
                <div className='itemContent'>
                {index + 1}
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}
export async function clientLoader() {
  const data = await fetch('/api/data');
  return [1,2,3];
}