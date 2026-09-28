import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Nav } from "@/components/nav";
import { Perception } from "@/components/perception";
import { Research } from "@/components/research";
import { Work } from "@/components/work";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Perception />
        <Research />
        <Work />
        <About />
        <Contact />
      </main>
    </>
  );
}
