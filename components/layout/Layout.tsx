import cx from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Container, Icon } from "@/ui";

import Inventory from "./Inventory";
import Sidebar, { SidebarState } from "./Sidebar";
import TransactionsDisplay from "./TransactionsDisplay";
import WalletConnect from "./WalletConnect";

type LayoutProps = {
  children: React.ReactNode;
};

const PROD = process.env.NODE_ENV == "production";

function ErrorHandler({ error }: { error: Error }) {
  return (
    <Container>
      <div>
        <div>
          <Icon icon="warning" />
          <div>Error</div>
        </div>
        <div>{error.message}</div>
      </div>
    </Container>
  );
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarClientWidth, setSidebarClientWidth] = useState(0);
  const [sidebarState, setSidebarState] = useState<SidebarState>("loading");

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum) {
      ethereum.on("accountsChanged", () => window.location.reload());
      ethereum.on("chainChanged", () => window.location.reload());
    }
  }, []);

  return (
    <div>
      <Sidebar permanentThreshold={1024} state={sidebarState} onChange={setSidebarState} onResize={setSidebarClientWidth} />
      <div>
        <WalletConnect />
        <div>
          <GridVideoBg />
          {sidebarState !== "loading" ? (
            <>
              <div>
                <ConditionalHeader show={sidebarState !== "permanent"} />

                {/* Content */}

                <div>
                  <ErrorBoundary FallbackComponent={ErrorHandler} resetKeys={[children]}>
                    {children}
                  </ErrorBoundary>
                </div>
              </div>
            </>
          ) : null}
        </div>
        {/* Floating Inventory */}
        <div>
          <Inventory />
        </div>
        <TransactionsDisplay />
      </div>
    </div>
  );
}

const ConditionalHeader = ({ show }: { show: boolean }) => (
  <Link href="/">
    <a>
      <Icon icon="ubq" />
      <span>Ubiquity</span>
    </a>
  </Link>
);

const GridVideoBg = () => {
  const video = (
    <video autoPlay muted loop playsInline>
      {PROD && <source src="ubiquity-one-fifth-speed-trimmed-compressed.mp4" type="video/mp4" />}
    </video>
  );

  return (
    <div id="background">
      {video}
      <div id="grid"></div>
    </div>
  );
};
