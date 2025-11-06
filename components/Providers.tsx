"use client";

import { CDPReactProvider } from "@coinbase/cdp-react";
import { cdpConfig } from "@/lib/config";
import { theme } from "@/lib/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <CDPReactProvider config={cdpConfig} theme={theme}>
      {children}
    </CDPReactProvider>
  );
}
