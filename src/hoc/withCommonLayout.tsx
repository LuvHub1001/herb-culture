import { ComponentType } from "react";
import { Header, Footer } from "../components";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <div className="overflow-x-hidden">
        <Header />
        <div>
          <Component />
        </div>
        <Footer />
      </div>
    );
  };

  return WrappedComponent;
}
export default withCommonLayout;
