import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Skeleton } from 'antd';

const LazyLoad = ({ children, skeletonType }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();

    const handleIntersection = useCallback((entries, observer) => {
        if (entries[0].isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0
        });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [handleIntersection]);

    const getSkeletonContent = (type) => {
        switch (type) {
            case 'card':
                return (
                    <div className="movie-card">
                        <Skeleton.Image className="movie-card--image" />
                        <div className="movie-card--info">
                            <Skeleton active title={false} paragraph={{ rows: 1, width: '100%' }} />
                            <Skeleton active title={false} paragraph={{ rows: 1, width: '100%' }} />
                        </div>
                    </div>
                );
            case 'trailer':
                return <Skeleton.Image style={{ width: '31.25rem', height: '18.75rem', borderRadius: '0.625rem' }} />;
            case 'image':
                return <Skeleton.Image />;
            case 'title':
                return <Skeleton.Input style={{ width: '20rem', height: '2.5rem' }} active />;
            case 'content':
                return <Skeleton active />;
            case 'contentdesc':
                return <Skeleton active paragraph={{ rows: 10 }} />;
            default:
                return <Skeleton active />;
        }
    };

    return (
        <div ref={ref}>
            {isVisible ? children : getSkeletonContent(skeletonType)}
        </div>
    );
};

export default LazyLoad;
