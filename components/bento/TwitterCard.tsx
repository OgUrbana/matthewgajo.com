import Image from "next/image";
import BentoCard from "./BentoCard";
import Link from "next/link";

export default function TwitterCard() {
  return (
    <BentoCard className="twitter-mid-bento h-full">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-1.5 mb-7">
          <Image
            src="/memoji.png"
            alt="memoji of me in a bowtie. brown hair and brown eyes"
            width={48}
            height={48}
            className="object-cover"
          />
          <div className="flex flex-col">
            <p>Matthew Gajo</p>
            <p className="text-text-muted text-sm leading-3">@matthewgajo</p>
          </div>
        </div>
        <p className="flex-1 pb-8">
          &ldquo;I like to call it R&D instead of &lsquo;i have no idea what
          i&rsquo;m doing!&rsquo;&rdquo;
        </p>
        <div className="relative z-0 mt-auto w-full">
          <Link
            href="https://x.com/matthewgajo"
            target="_blank"
            rel="noopener noreferrer"
            className="mid-tweets-btn relative block w-full"
          >
            <span
              className="mid-tweets-pill relative z-20 isolate block w-full overflow-hidden rounded-full border border-[#1e3a3a] bg-bento-bg py-3 text-center font-medium text-foreground transition-[border-color,box-shadow,color] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500/60"
            >
              <span className="mid-tweets-fill pointer-events-none z-0" aria-hidden>
                <svg
                  className="absolute inset-0 h-[200%] w-full"
                  viewBox="0 0 400 180"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="tw-pill-fill-grad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                      <stop offset="55%" stopColor="#0ea5e9" stopOpacity="1" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#tw-pill-fill-grad)"
                    d="M0,0H400V62C372,55,348,88,310,80C270,72,240,125,200,132C160,125,128,70,90,80C55,88,32,55,0,63V0Z"
                  />
                </svg>
              </span>
              <span className="relative z-10">Read mid tweets</span>
            </span>
          </Link>
        </div>
      </div>
    </BentoCard>
  );
}
