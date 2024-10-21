import {
  Box,
  Button,
  FilePicker,
  FilePickerButton,
  Input,
  Label,
  Stack,
  Toaster,
  useToaster,
} from "@twilio-paste/core";
import { FC, SetStateAction, useRef, useState } from "react";
import { useConfig } from "../ConfigProvider/ConfigProvider";
import { InformationIcon } from "@twilio-paste/icons/esm/InformationIcon";

export const IframeLoader: FC = () => {
  const { logoUrl, setLogoUrl } = useConfig();

  const toaster = useToaster();
  const [url, setUrl] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (event: {
    target: { value: SetStateAction<string> };
  }) => setUrl(event.target.value);

  const handleLogoUrlChange = (event: { target: { value: string } }) =>
    setLogoUrl(event.target.value);

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
    } catch (error) {
      console.log(error);
      return false;
    }
    return true;
  };

  const handleFileChange = (e: any) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setImg(url);
  };

  const handleSetIframe = () => {
    if (isValidUrl(url)) {
      const iframeOld = document.getElementById("iframe");
      if (iframeOld) {
        iframeOld.remove();
      }
      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", url);
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "1300px");
      iframe.setAttribute("id", "iframe");
      const iframeContainer = document.getElementById("iframe_container");
      if (iframeContainer) {
        iframeContainer.appendChild(iframe);
      }
    } else {
      toaster.push({
        message: "URL should start with https://",
        variant: "error",
        dismissAfter: 5000,
      });
    }
  };

  const handleClear = () => {
    setUrl("");
    setLogoUrl("");
    setImg("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    const iframeOld = document.getElementById("iframe");
    if (iframeOld) {
      iframeOld.remove();
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Box>
      {isVisible ? (
        <Box
          paddingTop="space30"
          paddingBottom="space20"
          paddingX="space30"
          backgroundColor="colorBackgroundDecorative10Weakest"
        >
          <Stack orientation="horizontal" spacing="space60">
            <Box>
              <Label htmlFor="url">Website URL to Preview</Label>
              <Box
                display="flex"
                alignItems="center"
                columnGap="space30"
                width="size50"
              >
                <Input
                  id="url"
                  type="text"
                  placeholder="https://example.com"
                  value={url}
                  onChange={handleUrlChange}
                  required
                />
                <Button variant="secondary" onClick={handleSetIframe}>
                  Set
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() =>
                    window.open(
                      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options",
                      "_blank"
                    )
                  }
                >
                  <InformationIcon decorative />
                </Button>
              </Box>
            </Box>

            <Box>
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Box
                display="flex"
                alignItems="center"
                columnGap="space30"
                width="size50"
              >
                <Input
                  id="logoUrl"
                  type="text"
                  placeholder="https://example.com/logo.png"
                  value={logoUrl}
                  onChange={handleLogoUrlChange}
                />
                <Button variant="secondary" onClick={() => handleLogoUrlChange}>
                  Set
                </Button>
              </Box>
            </Box>

            <Box>
              <Label htmlFor="fileUpload">Upload Image</Label>
              <Box
                display="flex"
                alignItems="center"
                columnGap="space30"
                width="size50"
              >
                <FilePicker
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                >
                  <FilePickerButton variant="secondary">
                    Choose File
                  </FilePickerButton>
                </FilePicker>
                <Button variant="secondary" onClick={handleClear}>
                  Clear All
                </Button>
              </Box>
            </Box>
            <Box marginTop="space30">
              <Button variant="secondary" onClick={toggleVisibility}>
                Hide Menu
              </Button>
            </Box>
          </Stack>

          <Box id="iframe_container" height="auto" marginTop="space60">
            {img && (
              <img
                id="imageid"
                src={img}
                alt="screenshot"
                width="100%"
                height="auto"
              />
            )}
          </Box>

          <Toaster {...toaster} />
        </Box>
      ) : (
        <Box margin="space30">
          <Button variant="secondary" onClick={toggleVisibility}>
            Show Menu
          </Button>
        </Box>
      )}
    </Box>
  );
};
