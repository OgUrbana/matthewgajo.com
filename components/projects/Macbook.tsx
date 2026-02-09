import { cn } from '@/lib/utils';
import BrowserToolbar from './BrowserToolbar';

const SCREEN_X = 110;
const SCREEN_Y = 11;
const SCREEN_W = 668;
const SCREEN_H = 445;
const TOOLBAR_ORIGINAL_W = 1440;
const TOOLBAR_ORIGINAL_H = 52;
const TOOLBAR_SCALE = SCREEN_W / TOOLBAR_ORIGINAL_W;
const TOOLBAR_HEIGHT = TOOLBAR_ORIGINAL_H * TOOLBAR_SCALE;

interface MacbookProps {
  image: string;
  className?: string;
  /** "cover" fills the screen (crop); "contain" fits the whole image inside (letterbox). Default cover. */
  imageFit?: "cover" | "contain";
  /** Browser toolbar above the image: "dark" | "light". Omit to hide. */
  toolbarVariant?: "dark" | "light";
  /** URL shown in the toolbar next to the lock icon (e.g. "hipnode.com") */
  url?: string;
}

export default function Macbook({ className, image, imageFit = "cover", toolbarVariant = "dark", url }: MacbookProps) {
  return (
    <svg
      width="888"
      height="515"
      viewBox="0 0 888 515"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn("w-full h-auto", className)}
    >
      <defs>
        <filter
          id="filter0_f_87_100"
          x="0"
          y="511"
          width="888"
          height="4"
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
            stdDeviation="0.5"
            result="effect1_foregroundBlur_87_100"
          />
        </filter>
        <linearGradient
          id="paint0_linear_87_100"
          x1="799.5"
          y1="510"
          x2="799.5"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.130273" />
          <stop offset="0.375191" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_87_100"
          x1="777"
          y1="512"
          x2="822"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.035499" stopOpacity="0" />
          <stop offset="0.183503" />
          <stop offset="0.398916" stopOpacity="0" />
          <stop offset="0.633378" stopOpacity="0" />
          <stop offset="0.837067" />
          <stop offset="0.970418" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_87_100"
          x1="774"
          y1="510"
          x2="824"
          y2="510"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0" />
          <stop offset="0.186299" />
          <stop offset="0.456756" stopOpacity="0" />
          <stop offset="0.546908" stopOpacity="0" />
          <stop offset="0.835968" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_87_100"
          x1="88.5"
          y1="510"
          x2="88.5"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.130273" />
          <stop offset="0.375191" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_87_100"
          x1="66"
          y1="512"
          x2="111"
          y2="512"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.035499" stopOpacity="0" />
          <stop offset="0.183503" />
          <stop offset="0.398916" stopOpacity="0" />
          <stop offset="0.633378" stopOpacity="0" />
          <stop offset="0.837067" />
          <stop offset="0.970418" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_87_100"
          x1="63"
          y1="510"
          x2="113"
          y2="510"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="0" />
          <stop offset="0.186299" />
          <stop offset="0.456756" stopOpacity="0" />
          <stop offset="0.546908" stopOpacity="0" />
          <stop offset="0.835968" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_87_100"
          x1="809"
          y1="504"
          x2="809"
          y2="506"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.444236" stopOpacity="0" />
          <stop offset="0.867408" />
        </linearGradient>
        <radialGradient
          id="paint7_radial_87_100"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(444 504) rotate(-180) scale(421 13633.9)"
        >
          <stop stopColor="#1A1C27" stopOpacity="0.5" />
          <stop offset="0.364583" stopColor="#1A1C27" stopOpacity="0" />
          <stop offset="0.703125" stopColor="#1A1C27" stopOpacity="0" />
          <stop offset="0.96875" stopColor="#1A1C27" />
          <stop offset="1" stopColor="#1A1C27" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint8_linear_87_100"
          x1="812"
          y1="478"
          x2="812"
          y2="504"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.102925" stopOpacity="0" />
          <stop offset="0.6646" />
          <stop offset="0.772607" />
          <stop offset="0.90268" stopOpacity="0.58" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_87_100"
          x1="517"
          y1="486"
          x2="388"
          y2="486"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8A8A8A" />
          <stop offset="0.203125" stopColor="#AAAAAA" stopOpacity="0" />
          <stop offset="0.8125" stopColor="#AAAAAA" stopOpacity="0" />
          <stop offset="1" stopColor="#8A8A8A" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_87_100"
          x1="517"
          y1="486"
          x2="388"
          y2="486"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F0F14" />
          <stop offset="0.203125" stopColor="#0F0F14" stopOpacity="0" />
          <stop offset="0.8125" stopColor="#0F0F14" stopOpacity="0" />
          <stop offset="1" stopColor="#0F0F14" />
        </linearGradient>
        <mask
          id="mask0_87_100"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="109"
          y="11"
          width="669"
          height="445"
        >
          <rect x="110" y="11" width="668" height="445" fill="white" />
        </mask>
      </defs>
      <g filter="url(#filter0_f_87_100)">
        <path
          d="M1 513C1 512.448 81.5257 512 83.1227 512H811.817C813.414 512 887 512.448 887 513C887 513.552 813.414 514 811.817 514H83.1227C81.5257 514 1 513.552 1 513Z"
          fill="black"
          fillOpacity="0.75"
        />
      </g>
      <path
        d="M822 510C820.719 511.281 818.983 512 817.172 512H781.829C780.017 512 778.281 511.281 777 510H822Z"
        fill="#1A1C27"
      />
      <path
        d="M822 510C820.719 511.281 818.983 512 817.172 512H781.829C780.017 512 778.281 511.281 777 510H822Z"
        fill="url(#paint0_linear_87_100)"
        fillOpacity="0.5"
      />
      <path
        d="M822 510C820.719 511.281 818.983 512 817.172 512H781.829C780.017 512 778.281 511.281 777 510H822Z"
        fill="url(#paint1_linear_87_100)"
        fillOpacity="0.8"
      />
      <path
        d="M774 506H825L822 510H777L774 506Z"
        fill="#1A1C27"
      />
      <path
        d="M774 506H825L822 510H777L774 506Z"
        fill="url(#paint2_linear_87_100)"
        fillOpacity="0.8"
      />
      <path
        d="M111 510C109.719 511.281 107.983 512 106.172 512H70.8285C69.0175 512 67.2806 511.281 66 510H111Z"
        fill="#1A1C27"
      />
      <path
        d="M111 510C109.719 511.281 107.983 512 106.172 512H70.8285C69.0175 512 67.2806 511.281 66 510H111Z"
        fill="url(#paint3_linear_87_100)"
        fillOpacity="0.5"
      />
      <path
        d="M111 510C109.719 511.281 107.983 512 106.172 512H70.8285C69.0175 512 67.2806 511.281 66 510H111Z"
        fill="url(#paint4_linear_87_100)"
        fillOpacity="0.8"
      />
      <path
        d="M63 506H114L111 510H66L63 506Z"
        fill="#1A1C27"
      />
      <path
        d="M63 506H114L111 510H66L63 506Z"
        fill="url(#paint5_linear_87_100)"
        fillOpacity="0.8"
      />
      <path
        d="M29 504C25.5 501.5 23 497.014 23 492.246V478.712C23.0002 478.319 23.3092 478 23.6904 478H864.31C864.691 478 865 478.319 865 478.712V492.246C865 497.014 862.5 501.5 859 504C856.543 505.253 853.371 506 850 506H38C34.6287 506 31.4568 505.253 29 504Z"
        fill="#1A1C27"
      />
      <path
        d="M38 506H850C853.371 506 856.543 505.253 859 504H29C31.4568 505.253 34.6287 506 38 506Z"
        fill="url(#paint6_linear_87_100)"
        fillOpacity="0.4"
      />
      <path
        d="M23.6906 478C23.3092 478 23 478.319 23 478.712V492.247C23 497.014 25.5 501.5 29 504H859C862.5 501.5 865 497.014 865 492.247V478.712C865 478.319 864.691 478 864.309 478H23.6906Z"
        fill="url(#paint7_radial_87_100)"
        fillOpacity="0.6"
      />
      <path
        d="M23.6906 478C23.3092 478 23 478.319 23 478.712V492.247C23 497.014 25.5 501.5 29 504H859C862.5 501.5 865 497.014 865 492.247V478.712C865 478.319 864.691 478 864.309 478H23.6906Z"
        fill="url(#paint8_linear_87_100)"
        fillOpacity="0.5"
      />
      <path
        d="M99 20C99 8.95432 107.954 0 119 0H769C780.046 0 789 8.9543 789 20V478H99L99 20Z"
        fill="black"
      />
      <g mask="url(#mask0_87_100)">
        {toolbarVariant && (
          <g transform={`translate(${SCREEN_X}, ${SCREEN_Y}) scale(${TOOLBAR_SCALE})`}>
            <BrowserToolbar idPrefix="macbook-toolbar" variant={toolbarVariant} url={url} />
          </g>
        )}
        <image
          x={SCREEN_X}
          y={SCREEN_Y + (toolbarVariant ? TOOLBAR_HEIGHT : 0)}
          width={SCREEN_W}
          height={SCREEN_H - (toolbarVariant ? TOOLBAR_HEIGHT : 0)}
          href={image}
          preserveAspectRatio={
            imageFit === "contain" ? "xMidYMin meet" : "xMidYMid slice"
          }
        />
      </g>
      <rect x="99" y="463" width="690" height="15" fill="#0F0F14" />
      <g opacity="0.8" style={{ mixBlendMode: "hard-light" }}>
        <path
          d="M388 478H517C517 483.833 511.444 486 507.074 486H397.926C393.556 486 388 483.833 388 478Z"
          fill="#1A1C27"
        />
        <path
          d="M388 478H517C517 483.833 511.444 486 507.074 486H397.926C393.556 486 388 483.833 388 478Z"
          fill="url(#paint9_linear_87_100)"
        />
      </g>
      <path
        d="M388 478H517C517 483.833 511.444 486 507.074 486H397.926C393.556 486 388 483.833 388 478Z"
        fill="#1A1C27"
      />
      <path
        d="M388 478H517C517 483.833 511.444 486 507.074 486H397.926C393.556 486 388 483.833 388 478Z"
        fill="url(#paint10_linear_87_100)"
      />
    </svg>
  );
}
