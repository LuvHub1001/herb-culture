import { ComponentType, memo } from "react";
import { Header, Footer } from "../components";

function withCommonLayout<P extends object>(Component: ComponentType<P>) {
  const Wrapped = (props: P) => (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[var(--bg)]">
      <Header />
      <main className="flex-1">
        <Component {...props} />
      </main>
      <Footer />
    </div>
  );
  return memo(Wrapped) as unknown as ComponentType<P>;
}

export default withCommonLayout;
