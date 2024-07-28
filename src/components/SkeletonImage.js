import React, { useState } from 'react';
import { Skeleton } from 'antd';

const SkeletonImage = ({ src, alt, fallbackSrc, className, skeletonSize }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setImgSrc(fallbackSrc);
        setIsLoading(false);
    };

    return (
        <div className={className}>
            {isLoading && <Skeleton.Image active style={{ width: skeletonSize.width, height: skeletonSize.height }} />}
            <img
                src={imgSrc}
                alt={alt}
                style={isLoading ? { display: 'none' } : {}}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
        </div>
    );
};

export default SkeletonImage;
