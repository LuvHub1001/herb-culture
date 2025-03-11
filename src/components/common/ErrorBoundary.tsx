import { Component, ErrorInfo, ReactNode } from "react";

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
      return <div>Global Error...!</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
