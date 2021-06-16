import React from 'react';

export const Loader = () =>{

    return(
    <div className="load" style={{display: 'flex', justifyContent: 'center', paddingTop:'2rem'}}>
        <div clasName="preloader-wrapper active">
            <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div>
                <div className="gap-patch">
                    <div className="circle"></div>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    </div>
    )}