import {
  Context,
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { ACCOUNT_SID, FLEXCHAT_FLOW_SID, MOCKAPI } from "src/constants";
import { ReactElementProps } from "../../interface";

export type ConfigContextType = {
  config: any;
  webChatConfig: any;
  logoUrl: string;
  setLogoUrl: (url: string) => void;
};

export const ConfigContext: Context<ConfigContextType> =
  createContext<ConfigContextType>(null!);

export const ConfigProvider: FC<ReactElementProps> = ({
  children,
}: ReactElementProps) => {
  const [config, setConfig] = useState<any>("");
  const [webChatConfig, setWebChatConfig] = useState<any>("");
  const [logoUrl, setLogoUrl] = useState<string>("");

  // This function is responsible for getting the initial config for the application such as Account SID, Flex Flow SID, etc.
  useEffect(() => {
    fetch(`${MOCKAPI}`)
      .then((response) => response.json())
      .then((data) => {
        setConfig(data);
      });
  }, []);

  // This function is responsible for getting the webchat config for the Twilio Flex Web Chat.
  useEffect(() => {
    fetch(
      `https://api.ciptex.com/race/${ACCOUNT_SID}/webchat/${FLEXCHAT_FLOW_SID}/config`
    )
      .then((response) => response.json())
      .then((data) => {
        setWebChatConfig(data);
      });
  }, []);

  return (
    <ConfigContext.Provider
      value={{ config, webChatConfig, logoUrl, setLogoUrl }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
