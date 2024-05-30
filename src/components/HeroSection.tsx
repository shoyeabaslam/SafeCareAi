import ParticleAnimation from "./ParticleAnimation"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useRef } from "react";
import { GoHome } from "react-icons/go";
import { IoIosArrowBack } from "react-icons/io";
import { RxBox } from "react-icons/rx";
import robot from '../assets/robot.png'

gsap.registerPlugin(ScrollTrigger);

const styles = {
    boxShadow: "rgba(50, 50, 93, 0.25) -20px 50px 100px -20px, rgba(0, 0, 0, 0.3) -30px 28px 60px -30px",
    borderRadius: "40px",
    borderLeft: "3px solid rgb(127 127 127 / 50%)",
    borderTop: "0.8px solid rgba(155, 155, 155, 0.5)"
}

const AppWorkingSteps = ['Upload the Ingridients', 'Select your Health Conditon', 'Analyze Ingredients', 'Personalized Recommendations', 'Overall Safety of the product']

const HeroSection = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null)
    const robotRef = useRef(null)
    useGSAP(() => {
        gsap.fromTo('.themetext', {
            x: -100,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power1.inOut",
        })
        gsap.fromTo('.subtext', {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power1.inOut",
            delay: 0.5,
            stagger: 0.5
        })

        const boxes:Element[] = gsap.utils.toArray(scrollRef.current!.children);

        boxes.forEach((box) => {
            gsap.fromTo(box, {
                opacity: 0,
                x: -100,

            },
                {
                    opacity: 1,
                    x:0,
                    scrollTrigger: {
                        trigger: box,
                        start: 'bottom bottom',
                        end: 'top 62%',
                        scrub: 2,
                    },
                    ease: "power1.inOut",
                })
        })

        gsap.fromTo(robotRef.current, {
            rotate: 0,
        }, {
            rotate: -40,
            scrollTrigger: {
                pin: true, // pin the trigger element while active
                start: 'top top', // when the top of the trigger hits the top of the viewport
                end: '+=500', // end after scrolling 500px beyond the start
                scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                snap: {
                    snapTo: 'labels',
                    duration: { min: 0.2, max: 3 },
                    delay: 0.2,
                    ease: 'power1.inOut' // the ease of the snap animation ("power3" by default)
                }
            }
        })

    }, [])
    return (
        <section id="Home" className="py-5">
            <ParticleAnimation>
                <div className="wrapper flex flex-col items-center space-y-5 w-full sm:w-[80%] md:w-[50%]">
                    <div className="px-3">
                        <h1 className="themetext text-6xl sm:text-8xl font-Poetse text-blue-600 ">SafeCareAi.</h1>
                    </div>
                    <div className="tagline flex flex-col space-y-2 text-slate-800">
                        <h3 className="subtext text-center text-xl sm:text-3xl font-semibold">AI-Powered Ingredient Insights</h3>
                        <h3 className="subtext text-center text-lg sm:text-2xl font-semibold">Know what is good for your health</h3>
                    </div>
                    <div className="mobile_wrapper relative w-screen flex items-center justify-center  h-[600px] overflow-hidden">
                        <div style={styles} className="w-[250px] sm:w-[300px] h-[500px] z-10 bg-white shadow rounded-lg overflow-hidden mt-12 relative">
                            <div className=" w-full p-4 text-slate-900 text-2xl font-bold text-center">
                                How it works
                            </div>
                            <div ref={scrollRef} className="mobile flex flex-col px-4 mt-8">
                                {
                                    AppWorkingSteps.map((steps, idx) => (
                                        <h1 key={idx} className="bg-blue-500 my-3 text-white p-2 sm:p-3 rounded-xl text-sm">{steps}</h1>
                                    ))
                                }
                            </div>
                            <div className="flex px-8 items-end  justify-between absolute bottom-0 left-0 right-0 py-3 border shadow-sm">
                                <IoIosArrowBack className="text-blue-500" />
                                <GoHome className="text-slate-400 text-md" />
                                <RxBox className="text-slate-400 text-sm" />
                            </div>
                        </div>
                        <div className="robot-container absolute inset-0 flex items-center justify-center -ml-20">
                            <img ref={robotRef} id="robot" src={robot} alt="robot" className="origin-bottom w-[250px] sm:w-[300px]" />
                        </div>
                    </div>
                </div>
            </ParticleAnimation>
        </section>
    )
}

export default HeroSection;