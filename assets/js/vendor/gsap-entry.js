// Entrada de esbuild: GSAP y los plugins que usa el sitio (todos gratuitos). Regenerar con: npm run vendor:gsap
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
