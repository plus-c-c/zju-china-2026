import { Link, useLocation, type LinkProps } from "react-router-dom";
import { pinHomeReturnTarget, type HomeReturnTarget } from "../../utils/homeProgress";

export function HomeReturnLink({
  returnTo,
  onClick,
  ...props
}: LinkProps & { returnTo: HomeReturnTarget }) {
  const { key } = useLocation();
  return <Link {...props} data-home-return-target={returnTo} onClick={(event) => {
    onClick?.(event);
    if (!event.defaultPrevented && event.button === 0
      && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      pinHomeReturnTarget(key, returnTo);
    }
  }} />;
}
