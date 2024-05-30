import { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";


const Loader:FC<{loadingStage:string}> = ({loadingStage})=>{
    return(
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/10 backdrop-blur-3xl">
            <div className="flex w-full h-full items-center flex-col space-y-2 justify-center">
                <div className="text-blue-600">{loadingStage}</div>
                <AiOutlineLoading className="text-blue-600 text-8xl animate-spin"/>
            </div>
        </div>
    )
}

export default Loader;