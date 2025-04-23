import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin, FileTransferPlugin,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./styles.css";

// vite.config.ts
import { defineConfig } from 'vite'



import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm: false,
    })
    const camera=viewer.scene.activeCamera
    const position=camera.position
    const target=camera.target
    const manager = new AssetManagerPlugin();
    await viewer.addPlugin(manager);
    // Add plugins individually.
    await viewer.addPlugin(GBufferPlugin)
    // await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
    await viewer.addPlugin(SSRPlugin)
    await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)
    // and many more...

    // or use this to add all main ones at once.
    await addBasePlugins(viewer) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)
    
    // Required for downloading files from the UI
    await viewer.addPlugin(FileTransferPlugin)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // Import and add a GLB file.

    await viewer.load("./assets/SU7.glb")
    //await viewer.load(`${import.meta.env.BASE_URL}/assets/SU7.glb`);

    // Load an environment map if not set in the glb file
    // await viewer.setEnvironmentMap("./assets/environment.hdr");

    // Add some UI for tweak and testing.
    //const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    //uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)
    
    viewer.renderer.refreshPipeline;
   
    function setupScrollanimation() {
        // 第一段 -> 第二段
        ScrollTrigger.create({
            trigger: ".second",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
            onUpdate: self => {
                const p = self.progress
                position.set(
                    lerp(-2, 3.5, p),
                    lerp(0.69, 2.4, p),
                    lerp(-5.9, 3.8, p)
                )
                target.set(
                    lerp(-0.12, 0.47, p),
                    lerp(0.37, -0.05, p),
                    lerp(-0.43, -0.55, p)
                )
                   
                const textEl = document.querySelector('.section-continer1') as HTMLElement
                if (textEl) {
                    textEl.style.opacity = `${lerp(1,0,p*3)}`
                    textEl.style.transform = `translateX(${p * 500}px)`     
                }
                const textE2 = document.querySelector('.section.second h1') as HTMLElement
                if (textE2) {
                    textE2.style.opacity = `${lerp(0,1,p)}`
                    //textE2.style.transform = `translateX(${p * 500}px)`     
                }
                onUpdate()
            }
        })
    
        // 第二段 -> 第三段
        ScrollTrigger.create({
            trigger: ".third",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
            onUpdate: self => {
                const p = self.progress
                position.set(
                    lerp(3.5, 3.7, p),
                    lerp(2.4, -0.007, p),
                    lerp(3.8, 0.464, p)
                )
                target.set(
                    lerp(0.47, 0.375, p),
                    lerp(-0.05, 0.011, p),
                    lerp(-0.55, 1.095, p)
                )
                const textEl = document.querySelector('.section.second h1') as HTMLElement
                if (textEl) {
                    textEl.style.opacity = `${lerp(1,0,p*3)}`
                    textEl.style.transform = `translateX(${p * 500}px)`     
                }
                const textE2 = document.querySelector('.section-continer3') as HTMLElement
                if (textE2) {
                    textE2.style.opacity = `${lerp(0,1,p)}`
                    //textE2.style.transform = `translateX(${p * 500}px)`     
                }
                onUpdate()
            }
        })

        // 第三段 -> 第四段
        ScrollTrigger.create({
            trigger: ".fourth",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
            onUpdate: self => {
                const p = self.progress
                position.set(
                    lerp(3.7, 0.64,p),
                    lerp(-0.007, 0.26 ,p),
                    lerp(0.464, -0.5,p)
                )
                target.set(
                    lerp(0.375,-0.36 ,p),
                    lerp(0.011,0.12 ,p),
                    lerp(1.095, 0.1,p)
                )
                const textEl = document.querySelector('.section-continer3') as HTMLElement
                if (textEl) {
                    textEl.style.opacity = `${lerp(1,0,p*3)}`
                    textEl.style.transform = `translateX(${-p * 500}px)`     
                }
                const textE2 = document.querySelector('.section-continer4') as HTMLElement
                if (textE2) {
                    textE2.style.opacity = `${lerp(0,1,p)}`
                    //textE2.style.transform = `translateX(${p * 500}px)`     
                }
                onUpdate()
            }
        })

        // 第四段 -> 第五段
        ScrollTrigger.create({
            trigger: ".fifth",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
            onUpdate: self => {
                const p = self.progress
                position.set(
                    lerp(0.64,-0.56,p),
                    lerp(0.26,0.49 ,p),
                    lerp(-0.5,-0.256,p)
                )
                target.set(
                    lerp(-0.36,-0.237 ,p),
                    lerp(0.12,0.36 ,p),
                    lerp(0.1,-0.25,p)
                )
                const textEl = document.querySelector('.section-continer4') as HTMLElement
                if (textEl) {
                    textEl.style.opacity = `${lerp(1,0,p*3)}`
                    // textEl.style.transform = `translateX(${-p * 500}px)`     
                }
                const textE2 = document.querySelector('.section-continer5') as HTMLElement
                if (textE2) {
                    textE2.style.opacity = `${lerp(0,1,p)}`
                    //textE2.style.transform = `translateX(${p * 500}px)`     
                }
                onUpdate()
            }
        })
        // 第五段 -> 第六段
        ScrollTrigger.create({
            trigger: ".sixth",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
            onUpdate: self => {
                const p = self.progress
                position.set(
                    lerp(-0.56,-0.035,p),
                    lerp(0.49,0.484 ,p),
                    lerp(-0.256,-0.48,p)
                )
                target.set(
                    lerp(-0.237,0.338 ,p),
                    lerp(0.36,-0.0067 ,p),
                    lerp(-0.25,-0.002,p)
                )
                const textEl = document.querySelector('.section-continer5') as HTMLElement
                if (textEl) {
                    textEl.style.opacity = `${lerp(1,0,p*3)}`
                    textEl.style.transform = `translateX(${p * 500}px)`     
                }
                const textE2 = document.querySelector('.section-continer6') as HTMLElement
                if (textE2) {
                    textE2.style.opacity = `${lerp(0,1,p)}`
                    //textE2.style.transform = `translateX(${p * 500}px)`     
                }
                onUpdate()
            }
        })

        // 第六段 -> 第七段
        ScrollTrigger.create({
            trigger: ".seventh",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
            onUpdate: self => {
                const p = self.progress
                position.set(
                    lerp(-0.035,0.665,p),
                    lerp(0.484,0.0757 ,p),
                    lerp(-0.48,-0.669,p)
                )
                target.set(
                    lerp(0.338,0.354 ,p),
                    lerp(-0.0067,-0.194 ,p),
                    lerp(-0.002,-0.1,p)
                )
                const textEl = document.querySelector('.section-continer6') as HTMLElement
                if (textEl) {
                    textEl.style.opacity = `${lerp(1,0,p*3)}`
                    textEl.style.transform = `translateX(${-p * 500}px)`     
                }
                const textE2 = document.querySelector('.section-continer7') as HTMLElement
                if (textE2) {
                    textE2.style.opacity = `${lerp(0,1,p)}`
                    //textE2.style.transform = `translateX(${p * 500}px)`     
                }
                onUpdate()
            }
        })

        // 第七段 -> 第八段
        ScrollTrigger.create({
            trigger: ".eighth",
            start: "top bottom",
            end: "top top",
            scrub: 1.5,
      
            onUpdate: self => {
                const p = self.progress
                position.set(
                    lerp(0.665,3.24,p),
                    lerp(0.0757,4.229 ,p),
                    lerp(-0.669,-3.75,p)
                )
                target.set(
                    lerp(0.354,-0.19 ,p),
                    lerp(-0.194,-0.06 ,p),
                    lerp(-0.1,-0.71,p)
                )
                const textEl = document.querySelector('.section-continer7') as HTMLElement
                if (textEl) {
                    textEl.style.opacity = `${lerp(1,0,p*3)}`
                    textEl.style.transform = `translateX(${-p * 500}px)`     
                }
                const textE2 = document.querySelector('.section-continer8') as HTMLElement
                if (textE2) {
                    textE2.style.opacity = `${lerp(0,1,p)}`
                    //textE2.style.transform = `translateX(${p * 500}px)`     
                }
                onUpdate()
            }
        })

        
    }
    
    function lerp(a: number, b: number, t: number) {
        return a + (b - a) * t
    }
    
    setupScrollanimation()
    
    let needsupdate=true;
    function onUpdate(){
        needsupdate=true
        viewer.renderer.resetShadows()
      
    }
    viewer.addEventListener('preFrame',()=>{
        
        if(needsupdate){
            camera.positionUpdated(true)
            camera.targetUpdated(true)
            needsupdate=false
        }
    })

}


setupViewer()
