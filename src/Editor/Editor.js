import React, {useState} from 'react'
import Controller from '../Controller/Controller'
import Viewer from '../Viewer/Viewer'
import { useParams } from 'react-router-dom'

const Editor = () => {
    let {id} = useParams();
    const [status, setStatus] = useState("idle");
    return (
    <div style={{display: 'grid', 'gridTemplateColumns': '1fr 1fr', width: '100%'}}>
        <Controller id={id} status={status} setStatus={setStatus}/>
        <Viewer id = {id} status={status} setStatus={setStatus}/>
    </div>
    )
}


export default Editor;