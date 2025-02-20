
import { Board } from "@/components/Board";
import { Scene } from "@/components/Scene";
import { HeroUIProvider } from "@heroui/react";

export default function Home() {
  return (
    <>
      <HeroUIProvider>
        <Scene />
      </HeroUIProvider>
    </>
  );
}
