import { FC, SetStateAction, useState } from 'react';
import { HiArrowSmRight } from 'react-icons/hi';
import ReactCrop, { type Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


interface props{
    src:string,
    setSrc:(prev:string)=>void,
    setIsImageShown:(prev:boolean)=>void
}

const CropImage:FC<props> = ({ src, setSrc, setIsImageShown }) => {
    const [crop, setCrop] = useState<Crop>({
        unit: 'px', // Can be 'px' or '%'
        x: 0,
        y: 50,
        width: 300,
        height: 100
    });




    const handleCropChange = (newCrop: SetStateAction<Crop>) => {
        setCrop(newCrop);
    };

    const handleCropComplete = (croppedAreaPixels: PixelCrop) => {
        if (!src) return;
        const image = new Image();
        image.src = src;
        image.onload = () => {
            const canvas = document.createElement('canvas');
            const displayedWidth = 300;
            const scaleX = image.naturalWidth / displayedWidth;
            const scaleY = image.naturalHeight / (image.height * (displayedWidth / image.width));

            canvas.width = croppedAreaPixels.width * scaleX;
            canvas.height = croppedAreaPixels.height * scaleY;
            const ctx = canvas.getContext('2d');

            ctx?.drawImage(
                image,
                croppedAreaPixels.x * scaleX,
                croppedAreaPixels.y * scaleY,
                croppedAreaPixels.width * scaleX,
                croppedAreaPixels.height * scaleY,
                0,
                0,
                canvas.width,
                canvas.height
            );
            setSrc(canvas.toDataURL('image/jpeg'));
            setIsImageShown(false);
        }
    };
    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-white/10 backdrop-blur-3xl'>
            <div className="flex flex-col items-center h-full ">
                {src && (
                    <div className="flex flex-col items-center justify-between h-full w-full pt-4">
                        <ReactCrop className='rounded-xl bg-slate-100 w-[300px] max-h-[400px] shadow-md border-2 overflow-hidden border-blue-500' crop={crop} onChange={handleCropChange} >
                            <img className='object-contain w-[300px] max-h-[400px]' src={src} alt="Source" />
                        </ReactCrop>
                        <div className='flex items-center justify-end w-full px-20 bg-white py-4 shadow-md border rounded-md'>
                            <button className="bg-blue-600 flex space-x-8 justify-center  rounded-full text-white  py-2 px-4 " onClick={() => handleCropComplete(crop as PixelCrop)}>
                                <span>Crop Image</span> <HiArrowSmRight className='text-xl'/>
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CropImage;