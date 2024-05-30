import gsap from "gsap"
import { useEffect,useState } from "react"

const navList = ['Home','Services','Testimonials']

const Navbar = () => {
    const [isDrawerInView, setIsDrawerInView] = useState(false)
    const [isDrawerClicked,setIsDrawerClicked] = useState(false)

    const handleClickScroll = (id:string) => {
        const element = document.getElementById(id);
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth',block:'start' });
          if(isDrawerInView){
            handleDrawer()
          }
        }
      };

    useEffect(() => {
        const updateDrawerState = () => {
            setIsDrawerInView(window.innerWidth < 768);
          };
      
          // Initial check
          updateDrawerState();
      
          let timeoutId: string | number | NodeJS.Timeout | undefined;
          const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(updateDrawerState, 100); // Debounce resize events
          };
          window.addEventListener('resize', handleResize);
      
          return () => {
            clearTimeout(timeoutId); // Clear timeout on unmount
            window.removeEventListener('resize', handleResize); // Remove event listener
          };
    }, [])

    const handleDrawer = () => {
        if (isDrawerClicked) {
            //drawer is open
            gsap.to('#line1',{
                top:10,
                rotate:0,
                duration:0.5,
                
            })
            gsap.to('#line2',{
                rotate:0,
                duration:0.5
            })

            gsap.to('#navigation-drawer',{
                translateX:288,
                duration:0.5
            })
        } else {
            //drawer is close
            gsap.to('#line1',{
                top:18,
                rotate:45,
                duration:0.5,
                
            })
            gsap.to('#line2',{
                rotate:-45,
                duration:0.5
            })
            gsap.to('#navigation-drawer',{
                translateX:0,
                duration:0.5,
                ease:'power1.inOut'
            })
        }

        setIsDrawerClicked(prev => !prev);
    }
    return (
        <header className="z-50 fixed top-0 left-0 right-0 bg-black/0 backdrop-blur-sm h-14 flex items-center px-6">
            <nav className="flex justify-between items-center flex-1">
                <h1 className="font-Poetse text-blue-500 text-xl sm:text-2xl">SafeCareAi</h1>
                <div className="space-x-8 items-center flex">
                    {
                        isDrawerInView && 
                        <div className="flex flex-col z-20 items-center justify-center h-10 cursor-pointer relative px-4 w-[50px]" onClick={handleDrawer}>
                        <div  id="line1"  className="w-[30px] h-1 bg-slate-700 rounded-full absolute top-[10px]"></div>
                        <div id="line2" className="w-[30px] h-1 bg-slate-700  rounded-full absoute"></div>
                    </div>
                    }

                    <ul id="navigation-drawer" className="items-center justify-center translate-x-60 md:translate-x-0 bg-white md:bg-transparent md:max-h-fit top-0 bottom-0 h-screen flex flex-col md:flex-row md:space-x-8 absolute md:relative right-0 w-[200px] md:w-fit rounded-lg shadow-2xl md:shadow-none md:h-fit">
                        {
                            navList.map((list) => (
                                <li className="cursor-pointer my-2 md:my-0 text-lg hover:text-blue-500 transition-colors duration-200" key={list} onClick={()=>handleClickScroll(list)}>
                                    {list}
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </nav>
        </header>
    )
}

export default Navbar;