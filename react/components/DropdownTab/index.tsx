import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import './index.css'

const CSS_HANDLES = ['DropdownTab']

const DropdownTab = (props: { options: string[], children: any[] }) => {
    const handles = useCssHandles(CSS_HANDLES)
    console.log("Props:", props)
    if(!props.options){
        return (
            <select className={handles.DropdownTab} name="" id="">
                <option value="default">default</option>
            </select>
        )
    }
    return(
        <div>
            <select className={handles.DropdownTab} name="" id="">
                {props.options.map(value => {
                    return(
                        <option value="">{value}</option>
                    )
                })}
            </select>
            {props.children}
        </div>
    )
}

export default DropdownTab
