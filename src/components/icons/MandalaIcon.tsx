import { SVGProps } from "react";

export function MandalaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v2.4" />
      <path d="M12 19.6V22" />
      <path d="M4.6 4.6l1.7 1.7" />
      <path d="M17.7 17.7l1.7 1.7" />
      <path d="M2 12h2.4" />
      <path d="M19.6 12H22" />
      <path d="M4.6 19.4l1.7-1.7" />
      <path d="M17.7 6.3l1.7-1.7" />
      <path d="M16.2 8.4A4.2 4.2 0 0012 6.5a4.2 4.2 0 00-4.2 1.9" />
      <path d="M8.4 16.2A4.2 4.2 0 006.5 12a4.2 4.2 0 011.9-4.2" />
      <path d="M7.8 15.6A4.2 4.2 0 0012 17.5a4.2 4.2 0 004.2-1.9" />
      <path d="M15.6 7.8A4.2 4.2 0 0017.5 12a4.2 4.2 0 01-1.9 4.2" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}
