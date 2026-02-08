import { cn } from "@/lib/utils";
interface IphoneProps {
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Iphone({ image, children, className }: IphoneProps) {
  return (
    <svg
      width="441"
      height="898"
      viewBox="0 0 441 898"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn("w-full h-auto", className)}
    >
      <defs>
        <clipPath id="iphone-screen-clip">
          <rect
            x="10"
            y="7"
            width="421"
            height="884"
            rx="60"
          />
        </clipPath>
        <filter
          id="filter0_f_88_158"
          x="263.757"
          y="36.8194"
          width="4.48611"
          height="3.54178"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.590278"
            result="effect1_foregroundBlur_88_158"
          />
        </filter>
        <filter
          id="filter1_f_88_158"
          x="264.056"
          y="40.0556"
          width="3.88889"
          height="2.88889"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.472222"
            result="effect1_foregroundBlur_88_158"
          />
        </filter>
        <linearGradient
          id="paint0_linear_88_158"
          x1="220.5"
          y1="0"
          x2="220.5"
          y2="898"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#121212" />
          <stop offset="1" stopColor="#121212" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_88_158"
          x1="439.5"
          y1="287"
          x2="439.5"
          y2="393"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#141414" />
          <stop offset="0.0208333" stopColor="white" />
          <stop offset="0.046875" stopColor="#060606" />
          <stop offset="0.0677083" stopColor="#070707" />
          <stop offset="0.0885417" stopColor="#282828" />
          <stop offset="0.90625" stopColor="#2A2A2A" />
          <stop offset="0.927083" stopColor="#494949" />
          <stop offset="0.947917" stopColor="#3B3B3B" />
          <stop offset="0.96875" stopColor="#2F2F2F" />
          <stop offset="1" stopColor="#171717" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_88_158"
          x1="266"
          y1="32"
          x2="266"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0B0B0B" />
          <stop offset="1" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_88_158"
          x1="262"
          y1="37.5"
          x2="270"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#050505" />
          <stop offset="1" />
        </linearGradient>
      </defs>
      <g clipPath="url(#iphone-screen-clip)">
        {image ? (
          <image
            x="10"
            y="7"
            width="421"
            height="884"
            href={image}
            preserveAspectRatio="xMidYMid slice"
          />
        ) : children ? (
          <foreignObject x="10" y="7" width="421" height="884">
            <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
              {children}
            </div>
          </foreignObject>
        ) : null}
      </g>
      <path
        d="M70 3.5H371C406.07 3.5 434.5 31.9299 434.5 67V831C434.5 866.07 406.07 894.5 371 894.5H70C34.9299 894.5 6.5 866.07 6.5 831V67C6.5 31.9299 34.9299 3.5 70 3.5Z"
        stroke="url(#paint0_linear_88_158)"
        strokeWidth="7"
      />
      <rect
        x="13.25"
        y="10.25"
        width="414.5"
        height="877.5"
        rx="56.75"
        stroke="black"
        strokeWidth="6.5"
      />
      <rect x="3" y="93" width="7" height="5" fill="#1C1C1C" />
      <rect x="335" width="5" height="7" fill="#1C1C1C" />
      <rect x="431" y="83" width="7" height="5" fill="#1C1C1C" />
      <rect y="175" width="3" height="33" fill="#060606" />
      <rect y="241" width="3" height="66" fill="#191919" />
      <rect y="327" width="3" height="66" fill="#191919" />
      <path
        d="M438 287H440C440.552 287 441 287.448 441 288V392C441 392.552 440.552 393 440 393H438V287Z"
        fill="url(#paint1_linear_88_158)"
      />
      <rect
        x="156"
        y="24"
        width="128"
        height="33"
        rx="16.5"
        fill="black"
      />
      <circle
        cx="266"
        cy="40"
        r="8"
        fill="url(#paint2_linear_88_158)"
      />
      <circle
        cx="266"
        cy="40"
        r="4.5"
        fill="url(#paint3_linear_88_158)"
      />
      <circle cx="266" cy="40" r="3" fill="#060606" />
      <g filter="url(#filter0_f_88_158)">
        <ellipse
          cx="266"
          cy="38.5903"
          rx="1.0625"
          ry="0.590278"
          fill="#949494"
        />
      </g>
      <g filter="url(#filter1_f_88_158)">
        <ellipse cx="266" cy="41.5" rx="1" ry="0.5" fill="#2B2B2B" />
      </g>
    </svg>
  );
}
