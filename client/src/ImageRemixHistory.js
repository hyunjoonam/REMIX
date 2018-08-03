import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import './ImageRemixHistory.css';

let image = 'http://www.wallpaper.ge/wallpapers/mona_lisa-800x600.jpg'

let imgUrls = [
    'https://culturehog.com/wp-content/uploads/mona-lisa-funny-pics-31.jpg',
    'https://culturehog.com/wp-content/uploads/mona-lisa-funny-pics-02.jpg',
    'https://culturehog.com/wp-content/uploads/mona-lisa-funny-pics-12.jpg',
    'https://culturehog.com/wp-content/uploads/mona-lisa-funny-pics-32.jpg',
    'https://culturehog.com/wp-content/uploads/mona-lisa-funny-pics-27.jpg',
    'https://culturehog.com/wp-content/uploads/mona-lisa-funny-pics-14.jpg',
    'https://culturehog.com/wp-content/uploads/mona-lisa-funny-pics-30.jpg',
    'https://culturehog.com/wp-content/uploads/mona-lisa-funny-pics-28.jpg'
    
  ];

class ImageRemixHistoryImages extends Component {

render() {
    return(
        <img className={this.props.className} src={this.props.src} alt={this.props.alt} />
    );
}
}
//This is where a User can see all images they have Remixed
class ImageRemixHistory extends Component {
    state = {
        selectedFile: null
    }

    /* Handling the upload Button:
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('remixImages', this.state.selectedFile, this.state)
        axios.post(//send upload to Remix Database, Remix Table include filepath?)
            console.log('image uploaded to database')
    }
    */


    render() {
        return  (
        <div>
            <div refs='remix-gallery-container' className='container-fluid gallery-container'>
                <div className='row'>
                    <div className='imageDownloadBox'>
                        <img className='img-responsive center-block img-rounded' src= {image} alt={this.props.alt}/>
                        <br/>
                        <br/>
                        <div className='downloadButton'>
                            <a href={image} download>
                            <button>Download This Photo</button>
                            </a>
                        </div>
                        <br/>
                        <br/>
                        <div className='uploadButton'>
                            <input 
                            style={{display: 'none'}} 
                            type='file' 
                            onChange={this.fileSelectedHandler} 
                            ref={fileInput => this.fileInput = fileInput}/>
                            <button onClick={() => this.fileInput.click()}>Choose Image URL</button>
                            <button onClick={this.fileUploadHandler}>Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        

            {/* This is where all the remixes submitted for an 
                Indiviual image will appear: */}
            <h1>Checkout this Images Remix History</h1>
            <div refs='remix-gallery-container' className='container-fluid gallery-container'>
                <div className='row'>
                    {
                        imgUrls.map((url, index) => {
                            return <div key={index} className='col-sm-6 col-md-3 col-xl-2'>
                                <div className = 'gallery-card'>
                                    <ImageRemixHistoryImages className='gallery-thumbnail' src={url} alt={'Image number ' + (index + 1)} />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
        )
    }
}

export default ImageRemixHistory;