import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FC, useRef, useState } from "react";
import { BsFillHeartPulseFill } from "react-icons/bs";

const filledBox = [

    { x: '5%', size: '10px' },
    { x: '15%', size: '8px' },
    { x: '25%', size: '12px' },
    { x: '10%', size: '6px' },

    { x: '90%', size: '11px' },
    { x: '80%', size: '14px' },
    { x: '75%', size: '18px' },
    { x: '65%', size: '7px' },

];

const colors = ['#F28C20', '#090DE9', '#0CB3DE', '#32D7DD'];

const ParticleAnimation: FC<{ children: React.ReactNode }> = ({ children }) => {
    const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [timeLine, setTimeline] = useState<GSAPTimeline[]>([]);
    useGSAP(() => {
        const currentTimeLine: GSAPTimeline[] = []
        boxRefs.current.forEach((box) => {
            const timeLine = gsap.timeline();
            if (box) {
                currentTimeLine.push(timeLine);
                timeLine.fromTo(box,
                    {
                        bottom: -1,
                        borderRadius: '25%',
                    },
                    {
                        opacity: 1,
                        rotation: 360,
                        borderRadius: '50%',
                        top: -50,
                        repeat: -1,
                        duration: Math.random() * 10 + 4, // Random duration between 2 and 4 seconds
                    }
                );
            }
        });
        setTimeline(currentTimeLine);

        gsap.fromTo('.safecarecard',{
            bottom:-30,
        },{
            opacity:1,
            top:-80,
            stagger:{
                amount:1.5
            },
            duration:5,
            repeat:-1
        })
    }, []);


    const handleMouseOver = (idx: number) => {
        timeLine[idx].pause();
        gsap.to(boxRefs.current[idx], { scale: 2, duration: 0.5 });
    }

    const handleMouseOut = (idx: number) => {
        timeLine[idx].play();
        gsap.to(boxRefs.current[idx], { scale: 1, delay: 2 })
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center">
            <div className=" h-[90vh] absolute overflow-hidden w-full pointer-events-none">
                {filledBox.map((box, idx) => (
                    <div
                        ref={el => boxRefs.current[idx] = el}
                        className="filledbox cursor-pointer pointer-events-auto bg-blue-500 rounded-sm absolute"
                        key={idx}
                        style={{
                            width: `${box.size}`,
                            backgroundColor: `${colors[Math.floor(Math.random() * colors.length)]}`,
                            height: `${box.size}`,
                            left: `${box.x}`
                        }}
                        onMouseOver={() => handleMouseOver(idx)}
                        onMouseLeave={() => handleMouseOut(idx)}
                    ></div>
                ))}

                <div className="safecarecard absolute left-[4%]">
                    <div className="w-[50px] rounded-lg h-[70px] shadow-lg bg-blue-500/30 shadow-rose-200 border   border-rose-100 -rotate-12 flex items-center justify-center">
                        <BsFillHeartPulseFill className="text-rose-400" />
                    </div>
                </div>

                <div className="safecarecard opacity-25 absolute left-[82%]">
                    <div className="w-[50px] rounded-lg h-[70px]  bg-blue-500/30 shadow-lg shadow-rose-200 border   border-rose-100 rotate-12 flex items-center justify-center">
                        <BsFillHeartPulseFill className="text-rose-400" />
                    </div>
                </div>
            </div>
            <div className="w-full sm:flex sm:justify-center px-2 pt-[150px]">
                {children}
            </div>


        </div>
    );
};

export default ParticleAnimation;
