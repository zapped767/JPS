import React, {useEffect} from "react";

declare global {
    interface Window {
        google?: any;
    }
}

const Map: React.FC = () => {
    useEffect(() => {
        const loadMapScript = () => {
            if (window.google && window.google.maps) return; // Already loaded

            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfSKxw9yp4A5BOxIQhS65P15BneJdU63A&libraries=places`;
            script.async = true;
            script.onload = initMap;
            document.body.appendChild(script);
        };

        const initMap = () => {
            const position = {lat: 6.8767805, lng: 79.876686};

            const map = new window.google.maps.Map(
                document.getElementById("map") as HTMLElement,
                {
                    zoom: 19,
                    center: position,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                }
            );

            const marker = new window.google.maps.Marker({
                position,
                map,
                title: "ZephyraTravels",
                label: {text: "ZephyraTravels", color: "black", fontSize: "16px"},
            });

            marker.addListener("click", () =>
                window.open(
                    "https://www.google.com/maps/place/ZephyraTravels/@6.8767858,79.8741111,17z/data=!3m1!4b1!4m6!3m5!1s0x3ae25bcce2007083:0x6d48d539f68a584e!8m2!3d6.8767805!4d79.876686!16s%2Fg%2F11xs0hh2jc?entry=ttu&g_ep=EgoyMDI1MTAxMy4wIKXMDSoASAFQAw%3D%3D",
                    "_blank"
                )
            );
        };

        // Lazy-load only when map is visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    loadMapScript();
                    observer.disconnect();
                }
            },
            {rootMargin: "200px"}
        );

        observer.observe(document.getElementById("map")!);
    }, []);

    return <div id="map" style={{width: "100%", height: "400px", borderRadius: "16px", overflow: "hidden"}}/>;
};

export default Map;
