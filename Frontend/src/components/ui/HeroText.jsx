import { HugeiconsIcon } from '@hugeicons/react';
import {SparklesIcon} from '@hugeicons/core-free-icons';
export default function HeroText(){
    return(
     <div className="inline-flex items-center gap-2 bg-pink-200 text-[#F43F72] px-3 mx-4 py-1 rounded-full text-xs font-semibold tracking-wide">
        <span><HugeiconsIcon icon={SparklesIcon} size={19} /></span> AI-Powered Learning
    </div>
    )
}