import react from 'react'
import {llm} from '../redux/fetchApi'
export default function Sidebar(){
    return(
<button onClick={llm} >Click it</button>
    )
}