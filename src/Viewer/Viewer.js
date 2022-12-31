import React, { useState, useMemo } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import uuid from 'react-uuid';

import { pdfData } from '../utils/constants';

export default function Viewer({ id, status, setStatus }) {
    const pdf_viewer_ref = React.useRef(null);
    const [viewer_rect, setViewerRect] = useState({});
    const [isDraggable, setIsDraggable] = useState(false)
    const [coord, setCoord] = useState([0, 0, 0, 0])
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages)
    }

    const handleMouseDown = (e) => {
        if (isDraggable === false && (status === "title" || status === 'author')) {
            var rect = pdf_viewer_ref.current.getBoundingClientRect();
            setViewerRect(pdf_viewer_ref.current.getBoundingClientRect());
            setIsDraggable(true);
            setCoord([e.clientX - rect.left, e.clientY - rect.top, coord[2], coord[3]]);
        }
    }

    const handleMouseMove = (e) => {
        if (isDraggable) {
            var rect = viewer_rect;
            setCoord([coord[0], coord[1], e.clientX - rect.left-coord[0], e.clientY - rect.top-coord[1]]);
        }
    }

    const handleMouseUp = (e) => {
        if (isDraggable) {
            var boxOldData = JSON.parse(localStorage.getItem(id));
            if (boxOldData === null || boxOldData === undefined) {
                let boxData = { [status]: [coord] }
                localStorage.setItem(id, JSON.stringify(boxData));
            }
            else {
                if (boxOldData[status] === null || boxOldData[status] === undefined) {
                    boxOldData[status] = [coord];
                }
                else {
                    boxOldData[status] = [...boxOldData[status], coord];
                }
                localStorage.setItem(id, JSON.stringify(boxOldData));
            }
            setCoord([0, 0, 0, 0]);
            setIsDraggable(false);
            setStatus("idle");
        }
    }

    const localStorageData = useMemo(() => {
        let boxData = JSON.parse(localStorage.getItem(id))
        if (boxData === undefined || boxData === null) {
            boxData = {'author': [], 'title': []}
        }
        else if(boxData['author']===undefined || boxData['title']===null){
            boxData['author'] = []
        }
        else if(boxData['title']===undefined || boxData['title']===null){
            boxData['title'] = []
        }
        return boxData;
    }, [status,id])

    const idleDep = useMemo(() => status==='idle'?'auto':'none', [status]);

    return (
        <div className="viewer"
            style={{ margin: '0 12px', border: '2px solid grey' }}
        >
            <div className="pdf__container"
                style={{ position: 'relative' }}
                onMouseDown={handleMouseDown}
                onMouseMoveCapture={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <div ref={pdf_viewer_ref} style={{
                    'cursor': 'default',
                    'WebkitUserSelect': idleDep, /* Safari */
                    'msUserSelect': idleDep, /* IE 10 and IE 11 */
                    'userSelect': idleDep /* Standard syntax */
                }}>
                    <Document file={pdfData[id - 1]["Sample Document " + id]} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                        ))}
                    </Document>
                </div>
                <div className="box" style={{
                    position: 'absolute',
                    width: `${coord[2]}px`,
                    height: `${coord[3]}px`,
                    border: `${`2px solid ${status === 'title' ? 'red' : 'green'}`}`,
                    background: `${status === 'title' ? 'rgba(255, 0,0,0.3)' : 'rgba(0,255,0,0.3'}`,
                    top: `${coord[1]}px`,
                    left: `${coord[0]}px`
                }}>
                </div>
                {
                    localStorageData['title'].map(title=>{
                        return <div key={uuid()} className="box" style={{
                            position: 'absolute',
                            width: `${title[2]}px`,
                            height: `${title[3]}px`,
                            border: '2px solid red',
                            background: 'rgba(255, 0,0,0.3)',
                            top: `${title[1]}px`,
                            left: `${title[0]}px`
                        }}>
                        </div>
                    })
                }
                {
                    localStorageData['author'].map(author => {
                        return <div key={uuid()} className="box" style={{
                            position: 'absolute',
                            width: `${author[2]}px`,
                            height: `${author[3]}px`,
                            border: '2px solid green',
                            background: 'rgba(0,255,0,0.3)',
                            top: `${author[1]}px`,
                            left: `${author[0]}px`
                        }}>
                        </div>
                    })
                }
            </div>
        </div>
    );
}