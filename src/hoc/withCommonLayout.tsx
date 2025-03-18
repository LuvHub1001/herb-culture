import { ComponentType } from "react";
import { Header, Footer } from "../components";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <>
        <Header />
        <div className="min-h-[calc(h-screen - h-105 - h-30)]">
          <Component />
        </div>
        <Footer />
      </>
    );
  };

  return WrappedComponent;
}
export default withCommonLayout;
