import { Component, ErrorInfo, ReactNode } from "react";
import ErrorPage from "../../pages/ErrorPage";

interface States {
  hasError: boolean;
  error: Error | null;
}

interface Props {
  children: ReactNode;
}

class ErrorBoundary extends Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(err: Error) {
    return {
      hasError: true,
      error: err,
    };
  }

  componentDidCatch(err: Error, errInfo: ErrorInfo): void {
    console.log(`Error:: ${err}`);
    console.log(`ErrorInfo:: ${errInfo}`);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
