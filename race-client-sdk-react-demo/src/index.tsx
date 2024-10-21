import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "./components/ConfigProvider/ConfigProvider";
import { FlexChatProviderReact } from "./components/FlexChatProvider/FlexChatProviderReact";
import { FormProvider } from "./components/FormProvider/FormProvider";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";
import { VideoProvider } from "./components/VideoProvider/VideoProvider";
import { VoiceProvider } from "./components/VoiceProvider/VoiceProvider";
import { DemoApp } from "./DemoApp";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider>
      <ConfigProvider>
        <VideoProvider>
          <VoiceProvider>
            <FormProvider>
              <FlexChatProviderReact>
                <DemoApp />
              </FlexChatProviderReact>
            </FormProvider>
          </VoiceProvider>
        </VideoProvider>
      </ConfigProvider>
    </ThemeProvider>
  </StrictMode>
);