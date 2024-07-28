import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from 'antd';

const LazyLoad = ({ children, skeletonType }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 1000);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    let skeletonContent;
    switch (skeletonType) {
        case 'card':
            skeletonContent = (
                <div className="movie-card ">
                    <Skeleton.Image className='movie-card--image' />
                    <div className="movie-card--info ">
                        <Skeleton active title={false} paragraph={{ rows: 1, width: '100%' }} />
                        <Skeleton active title={false} paragraph={{ rows: 1, width: '100%' }} />
                    </div>
                </div>
            );
            break;
        case 'trailer':
            skeletonContent = <Skeleton.Image style={{ width: '31.25rem', height: '18.75rem', borderRadius: "0.625rem" }} />;
            break;

        case 'image':
            skeletonContent = <Skeleton.Image />;
            break;

        case 'title':
            skeletonContent = <Skeleton.Input style={{ width: '20rem', height: '2.5rem' }} active={true} />;
            break;

        case 'content':
            skeletonContent = <Skeleton active />;
            break;

        case 'contentdesc':
            skeletonContent = <Skeleton active paragraph={{ rows: 10 }} />;
            break;

        default:
            skeletonContent = <Skeleton active />;
    }

    return (
        <div ref={ref}>
            {isVisible ? children : skeletonContent}
        </div>
    );
};

export default LazyLoad;
