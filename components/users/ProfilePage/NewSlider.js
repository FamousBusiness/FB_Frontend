import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function NewSlider({ img }) {
    const thumbnailSize = 80; // Adjust this value as needed

    const images = img.map(image => ({
        original: image.image,
        thumbnail: image.image,
        // sizes: 300,
    }));

    const galleryStyles = {
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center',
        // height: '100%',
        // width: '800px',
        // maxWidth: '100%',
        // height: '350px', // Set the desired height for the slider container
        position: 'relative',
    };

    const imageStyles = {
        objectFit: 'contain',
        objectPosition: 'center',
        // width: '100%',
        // height: '100%',
    };

    return (
        <div className="slider-container" style={galleryStyles}>
            <style>
                {`
                    .image-gallery-slide-container {
                        width: 300px;
                        
                        height: 300px;
                        object-fit: contain;
                        object-position: center;
                        position: relative;
                    }

                    .image-gallery-slide img {
                        width: 300px;
                        height: 300px;
                    

                         

                    }

                    .image-gallery-thumbnails-container .image-gallery-thumbnail img {
                        width: ${thumbnailSize}px !important;
                        height: ${thumbnailSize}px !important;
                        object-fit: contain;
                        object-position: center;
                    }
                `}
            </style>
            <ImageGallery
                items={images}
                showPlayButton={false}
                showBullets={false}
                showFullscreenButton={false}
                showNav={false}
                showIndex={false}
                lazyLoad={true}
                infinite={true}
                thumbnailPosition='bottom'
                useBrowserFullscreen={false}
                showThumbnails={true}
                autoPlay={false}
                // thumbnailWidth={thumbnailSize}
                // thumbnailHeight={thumbnailSize}
                // additionalClass="image-gallery-thumbnails-container"
                 
            />
        </div>
    );
}

export default NewSlider;
