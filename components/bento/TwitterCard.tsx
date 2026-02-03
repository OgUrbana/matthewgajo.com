import Image from "next/image";
import BentoCard from "./BentoCard";
import Link from "next/link";

export default function TwitterCard() {
  return (
    <BentoCard className="h-full">
      <div className="flex flex-col">
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
        <p className="pb-12">
          &ldquo;I like to call it R&D instead of &lsquo;i have no idea what
          i&rsquo;m doing!&rsquo;&rdquo;
        </p>
        <Link
          href="https://x.com/matthewgajo"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-2.5 font-medium border border-[#162323] rounded-full"
        >
          Read mid tweets
        </Link>
      </div>
    </BentoCard>
  );
}
