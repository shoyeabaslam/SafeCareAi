import { FC, useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const CircularProgressBar:FC<{progress:string}>= ({ progress}) => {
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(()=>{
    const n = progress.split('-');
    if(n.length >= 2){
      setPercentage((Number(n[0])+Number(n[1].replace('%','')))/2);
    }else{
      setPercentage(Number(progress.split('%')[0]))
    }
  },[progress])

  return (
    <div className='w-[150px] mt-8'>
      <CircularProgressbar  value={percentage} text={`${percentage}%`} />
    </div>
  );
};

export default CircularProgressBar;
