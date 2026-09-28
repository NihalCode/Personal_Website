import { SiteChrome } from "@/components/site-chrome";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Work } from "@/components/work";
import { Research } from "@/components/research";
import { Record } from "@/components/record";
import { ModelCard } from "@/components/model-card";
import { Contact } from "@/components/contact";

export default function Page() {
  return (
    <SiteChrome>
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Research />
        <Record />
        <ModelCard />
        <Contact />
      </main>
    </SiteChrome>
  );
}
