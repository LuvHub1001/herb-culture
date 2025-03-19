import { ComponentType } from "react";
import { Header, Footer } from "../components";

function withCommonLayout(Component: ComponentType) {
  const WrappedComponent = () => {
    return (
      <div>
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
