import React, {useRef, useState} from "react";

interface CountUpProps {
    end: number;
    duration?: number;
}

const CountUp: React.FC<CountUpProps> = ({end, duration = 2000}) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const countRef = useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number | null = null;
                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = (currentTime - startTime) / duration;

                        if (progress < 1) {
                            setCount(Math.floor(end * progress));
                            requestAnimationFrame(animate);
                        } else {
                            setCount(end);
                        }
                    };
                    requestAnimationFrame(animate);
                }
            },
            {threshold: 0.5}
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return <span ref={countRef}>{count}</span>;
};

export default CountUp;