// import DesignSection from "./sections/DesignSection";
// import DisplaySection from "./sections/DisplaySection";
// import HeroSection from "./sections/HeroSection";
// import PhoneModel from "./sections/PhoneModel";
import Model from "./sections/Model";
import Quote from "./sections/Quote";
// import { GlobalStyle } from "./styles/GlobalStyle";
// import ProcessorSection from "./sections/ProcessorSection";
// import BatterySection from "./sections/BatterySection";
// import ColorSection from "./sections/ColorSection";
// import CameraSection from "./sections/CameraSection";
// import PricingSection from "./sections/PricingSection";
// import { ColorContextProvider } from "./context/ColorContext";

function App() {
  return (
    <>
      <Model />
      <Quote />
      {/* <GlobalStyle />
      <Quote />
      <PhoneModel />
      <HeroSection />
      <DesignSection />
      <DisplaySection />
      <ProcessorSection />
      <BatterySection />
      <ColorContextProvider>
        <ColorSection />
        <CameraSection />
        <PricingSection />
      </ColorContextProvider> */}
    </>
  );
}

export default App;
