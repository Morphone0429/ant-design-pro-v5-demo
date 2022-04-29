import type { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

function Index(props: IProps) {
  return <>{props?.children}</>;
}
export default Index;
