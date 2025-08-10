// app/_app.tsx
import "../global.css";
import { TailwindProvider } from "nativewind";
import { Slot } from "expo-router";

export default function App() {
  return (
    <TailwindProvider>
      <Slot />
    </TailwindProvider>
  );
}
