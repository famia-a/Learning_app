import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { Quiz03Icon, Quiz02Icon,Quiz05Icon} from '@hugeicons/core-free-icons';
function QuickFea() {
  return (
    <div className="flex flex-wrap gap-4 mt-4 px-4 text-xs font-medium text-gray-600 pt-2">
        <span className="flex items-center gap-1.5"><span className="text-[#F43F72] p-1 rounded-full bg-pink-300"><HugeiconsIcon icon={Quiz03Icon} size={18} /></span> AI Transcripts</span>
        <span className="flex items-center gap-1.5"><span className="text-[#F43F72] p-1 rounded-full bg-pink-300"><HugeiconsIcon icon={Quiz02Icon} size={18} /></span> Smart Summaries</span>
        <span className="flex items-center gap-1.5"><span className="text-[#F43F72] p-1 rounded-full bg-pink-300"><HugeiconsIcon icon={Quiz05Icon} size={18} /></span> AI Quizzes</span>
    </div>
  )
}

export default QuickFea