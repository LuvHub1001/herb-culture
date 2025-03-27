import { ComponentType } from "react";
import { Header, Footer } from "../components";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        <Header />
        <div className="flex-grow">
          <Component />
        </div>
        <Footer />
      </div>
    );
  };

  return WrappedComponent;
}
export default withCommonLayout;
