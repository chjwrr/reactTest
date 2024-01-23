import { useEffect, useRef, useState } from 'react';
import './index.less'

// 跑马灯效果
export default function Marquee({
  id,
  content,
  position='right',
  speed=100,
}:{
  id:string,
  content:string,
  position?:string,
  speed?:number
}) {
  const titleRef = useRef<any>()
  const titleViewRef = useRef<any>()
  const [isScrolle, setIsScrolle] = useState(false);
  useEffect(()=>{
    setTimeout(() => {
      const titleEle = document.getElementById('title' + id)
      const titleViewEle = document.getElementById('titleView' + id)
      if (titleEle && titleViewEle){
        if (position == 'left'){
          titleViewEle.scrollLeft = titleEle.offsetWidth * 2
          setInterval(()=>{
            if (titleViewEle.scrollLeft <= titleEle.offsetWidth){
              titleViewEle.scrollLeft = titleEle.offsetWidth * 2
            }else {
              titleViewEle.scrollLeft --
            }
          },speed)
        }else {
          setInterval(() => {
            if (titleViewEle.scrollLeft >= titleEle.offsetWidth){
              titleViewEle.scrollLeft = 0
            }else {
              titleViewEle.scrollLeft ++
            }
          },speed)
        }
      }
    }, 100);
  },[])

    // 鼠标移动，移除方法
    // const hoverHandler = (flag) => setIsScrolle(flag);

  return (
    <div>
      <div className='titleView' id={'titleView' + id} ref={titleViewRef}>
        <div className='text' ref={titleRef} id={'title' + id}>
          {content}
        </div>
        <div className='text'>
          {content}
        </div>
      </div>
    </div>
  );
}