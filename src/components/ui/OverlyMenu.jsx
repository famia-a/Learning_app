import { HugeiconsIcon } from "@hugeicons/react";
import {SparkleIcon,Idea01Icon,BookCheckIcon,NoteIcon,MentoringIcon} from '@hugeicons/core-free-icons'
export default function(){
    return(
        <div className="absolute left-0 bottom-20 w-40 sm:w-52 bg-white/90 backdrop-blur-md rounded-2xl p-1 shadow-xl border border-gray-100 z-30 space-y-2 text-[12px] font-medium text-gray-700">
            <div className="flex items-center gap-2 p-1 rounded-lg bg-pink-50 text-pink-600">
              <span className="p-1 bg-pink-100 rounded"><HugeiconsIcon icon={SparkleIcon} /></span> AI Transcript
            </div>
            <div className="flex items-center gap-2 p-1 rounded-lg">
              <span className="p-1 bg-purple-100 text-purple-600 rounded"><HugeiconsIcon icon={MentoringIcon} /></span> Smart Summary
            </div>
            <div className="flex items-center gap-2 p-1 rounded-lg ">
              <span className="p-1 bg-amber-100 text-amber-600 rounded"><HugeiconsIcon icon={NoteIcon} /></span> Key Takeaways
            </div>
            <div className="flex items-center justify-between p-1 rounded-lg ">
              <span className="flex items-center gap-2">
                <span className="p-1 bg-emerald-100 text-emerald-600 rounded"><HugeiconsIcon icon={BookCheckIcon} /></span> AI Quiz
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1 py-0.5 rounded-full font-bold">85%</span>
            </div>
            <div className="flex items-center gap-2 p-1 rounded-lg">
              <span className="p-1 bg-blue-100 text-blue-600 rounded"><HugeiconsIcon icon={Idea01Icon} /></span> Ask AI
            </div>
          </div>
    )
}