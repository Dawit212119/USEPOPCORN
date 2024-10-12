import { useState } from "react"
//import PropType from "prop-types"

  // StarRating.PropType={
  //   maxRating:PropType.number.isRequired,
  //   color:PropType.string,
  //   size:PropType.number,
  //   defaultRating:PropType.number,
  //   message:PropType.array
  // }


const containerStyle={
    display:'flex',
    alignItem:'center',
    gap:'10px'
  }
  const starContainerStyle={
    gap:'4px',
    display:'flex'
  }
export default function StarRating({maxRating=5,color='#fcc419',size=48, defaultRating=0,message=[],onSetRating}){
    const textStyle={
        lineHeight:'1',
        margin:'0px',
        color,
        fontSize:`${size/1.5}px`
      }
    
const [rate,Setrate]=useState(defaultRating);
const [temprating,setemprating]=useState(0);
  function handleclick(i){
        Setrate(i+1);
        onSetRating(i+1);
  }
    return <div style={containerStyle}>
        <div style={starContainerStyle}>
            {Array.from({length:maxRating},(_,i)=>(
                <Star key={i} onrate={()=>handleclick(i)} full={temprating ? temprating>=i+1:rate>=i+1}
                
                onHoverIn={()=>setemprating(i+1)} 
                onHoverOut={()=>setemprating(0)}
                 color={color}
                 size={size}
                
                />
            ))}
        </div>
        <div style={textStyle}>     
            
            { message.length === maxRating ? message[temprating? temprating+1:rate+1]       :  temprating ||rate || ""}</div>
    </div>
}

  function Star({onrate,full,onHoverIn,onHoverOut,color,size}){

    const starStyle={
        width:"48px",
        height:"48px",
        display:'block',
        cursor:'pointer'
    };
    return 
    (     <span roll='button' style={starStyle} onClick={onrate} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
         {full ? (
    
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={color}
        stroke={color}
    >
        <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
     
         ):(       <svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke={color}
>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="{2}"
  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
/>
</svg>
    )}  </span> )
  
    }



 /*
FULL STAR




EMPTY STAR


*/