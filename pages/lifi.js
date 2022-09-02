import "@rainbow-me/rainbowkit/styles.css";
import { useDisconnect, useSigner } from "wagmi";
import dynamic from "next/dynamic";
import { useMemo } from "react"

const LiFiWidgetDynamic = dynamic(
    () => import("@lifi/widget").then((module) => module.LiFiWidget),
    {
      ssr: false
    }
  );

export function LiFiWrapper() {
    const { data: signer } = useSigner();
    const { disconnectAsync } = useDisconnect();
  
    console.log({
      signer
    })
  
    const widgetConfig = useMemo(
      () => ({
        walletManagement: {
          switchChain: async () => {
            return Promise.reject();
          },
          disconnect: disconnectAsync,
          connect: async () => {
            return Promise.reject();
          },
          signer: signer ?? undefined,
        },
        disableAppearance: true,
      }),
      [
        signer
      ]
    );
  
    return (
      <LiFiWidgetDynamic config={widgetConfig} />
    );
  }
  