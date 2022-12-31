import React, { useEffect } from 'react'
import {pdfData} from '../utils/constants'
import uuid from 'react-uuid'
import {Link} from 'react-router-dom'

const DocumentList = () => {
  return (
    <>
        <ul>
            {
                pdfData.map((e, ind)=>{
                    return <li key={uuid()}><Link to={`./viewer/${ind+1}`}>{Object.keys(e)[0]}</Link></li>
                })
            }
        </ul>
    </>
  )
}

export default DocumentList