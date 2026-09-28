# Design brief

Reading this as: a research portfolio for faculty and recruiters, with a cool architectural language, leaning toward a light paper page and one original Three.js room.

Dials: variance 6, motion 4, density 4. The room is the only cinematic object. The page around it stays quiet.

## Direction

Perception studio. A cutaway of one room (desk, chair, lamp, window, doorway) moves through three states: Scene, Structure, Description. The states are a drawing of the research problem. They are not a claim that Room VLM reconstructs geometry.

The page chrome is cool gray and one deep teal. The lamp inside the model is a warm light source, not a second interface color. Type is Outfit for headlines and IBM Plex Sans for text, both self-hosted. No serif, no neon, no custom cursor, no horizontal reel, no marquee.

Motion is a short camera and light change between the three states. Reduced motion snaps to the chosen state and leaves a fully composed scene. If WebGL fails, a static elevation shows the same three states.

## System

No packaged design system fits this page. Styling is Tailwind plus a small set of global rules. The 3D view is React Three Fiber. Scroll is native.
