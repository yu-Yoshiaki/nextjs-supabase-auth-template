/**
 * @package
 */

import { memo } from "react";

// eslint-disable-next-line react/display-name
export const Footer = memo(() => {
  return (
    <footer className="h-[80px] text-center bg-gray-100">
      <small>&copy; 2022 Ticketia</small>
    </footer>
  );
});
