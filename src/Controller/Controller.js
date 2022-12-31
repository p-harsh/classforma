import React from 'react'
import './Controller.css'
import uuid from 'react-uuid';

const Controller = ({ id, status, setStatus }) => {
    let boxData = JSON.parse(localStorage.getItem(id))
    let authorData = [], titleData = [];
    if(boxData!==undefined && boxData!==null){
        authorData = boxData.author;
        titleData = boxData.title;
    }
    
    const handleTitleClick = () => {
        console.log("Title Clicked");
        setStatus("title");
    }

    const handleAuthorClick = () => {
        console.log("Author Clicked");
        setStatus("author")
    }

    return (
        <div>
            <div className='labels'>
                <h3>Labels</h3>
                <div className='labels-btn'>
                    <button style={{background: `${status==='title'?'red':'grey'}`}} onClick={handleTitleClick}>Title</button>
                    <button style={{ background: `${status === 'author' ? 'green' : 'grey'}` }} onClick={handleAuthorClick}>Author</button>
                </div>
            </div>
            <div className="boxes">
                <h3>Boxes</h3>
                <div className='boxes-content'>
                    <div className="boxes-title">
                        {
                            titleData !== undefined && titleData !== 'null' ?
                                titleData.map(title => {
                                    return <p key={uuid()}>x: {Math.round(title[0])}, y: {Math.round(title[1])}, height: {Math.round(title[3])}, width: {Math.round(title[2])} <i>Title</i></p>;
                                })
                                :
                                null
                        }
                    </div>
                    <div className='boxes-author'>
                        {
                            authorData !== undefined && authorData !== 'null' ?
                                authorData.map(author => {
                                    return <p key={uuid()}>x: {Math.round(author[0])}, y: {Math.round(author[1])}, height: {Math.round(author[3])}, width: {Math.round(author[2])} <i>Author</i></p>;
                                })
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Controller