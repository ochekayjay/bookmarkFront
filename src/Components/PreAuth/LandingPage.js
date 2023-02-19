import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";


function LandingPage() {

    const particlesInit = useCallback(async (engine) => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await console.log(container);
    }, []);


  return (
    <div>
        <Particles 
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
            background: {
                color: {
                    value: "#0d47a1",
                },
            },
            fpsLimit: 60,
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "9fafca",
                },
                collisions: {
                    enable: true,
                },
                move: {
                    directions: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 6,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 2000,
                    },
                    limit:0,
                    value: 400,
                },
                opacity: {
                    value: 1,
                    animation:{
                        enable: true,
                        minimumValue: 0.05,
                        speed: 1,
                        sync: false
                    },
                    radom:{
                        enable: true,
                        minimumValue: 0.05,
                    }
                },
                shape: {
                    type: "circle",
                },
                size: {
                    random: {
                        enable:true,
                        minimumValue: 0.5,
                    },
                    value: 5,
                },
            },
            
        }} />
    </div>
  )
}

export default LandingPage