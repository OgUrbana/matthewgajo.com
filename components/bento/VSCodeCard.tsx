import Link from "next/link";
import {
  Files,
  Search,
  GitBranch,
  DebugAll,
  Extensions,
  Account,
  SettingsGear,
  GoToFile,
  FolderOpened,
  CloseX,
  VSCode,
} from "../Icons";

export default function VSCodeCard() {
  return (
    <div className="card relative h-full w-full overflow-hidden rounded-xl">
      <div className="relative z-10 h-full w-full overflow-hidden rounded-[10px] bg-[#080F0F]">
        {/* Top Bar with macOS controls */}
        <div className="flex h-6 w-full items-center bg-[#141C1C] px-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-[#EF414C]" />
            <div className="h-3 w-3 rounded-full bg-[#F7AE2D]" />
            <div className="h-3 w-3 rounded-full bg-[#31DB3D]" />
          </div>
        </div>

        <div className="flex h-[calc(100%-24px)]">
          {/* Left Sidebar */}
          <div className="flex w-10 flex-col items-center justify-between bg-[#141C1C] py-2">
            {/* Top Icons */}
            <div className="flex flex-col items-center gap-5">
              <Files className="h-6 w-6 text-[#6D6D6D]" />
              <Search className="h-6 w-6 text-[#6D6D6D]" />
              <GitBranch className="h-6 w-6 text-[#6D6D6D]" />
              <DebugAll className="h-6 w-6 text-[#6D6D6D]" />
              <Extensions className="h-6 w-6 text-[#6D6D6D]" />
            </div>

            {/* Bottom Icons */}
            <div className="flex flex-col items-center gap-3">
              <Account className="h-6 w-6 text-[#6D6D6D]" />
              <SettingsGear className="h-6 w-6 text-[#6D6D6D]" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Tab Bar */}
            <div className="flex h-10 items-center bg-[#0E1414]">
              <div className="flex items-center gap-2 border-t border-[#108781] bg-[#080F0F] px-3 py-2">
                <VSCode className="h-4 w-4" />
                <span className="text-sm text-white italic">
                  Welcome to my portfolio!
                </span>
                <CloseX className="ml-2 h-3 w-3 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Title and Tagline */}
              <div className="mb-4">
                <h2 className="mb-1 text-lg font-normal text-[#CCCCCC] md:text-xl">
                  Hey 👋, I&apos;m Matthew Gajo, a Software Engineer!
                </h2>
                <p className="text-xs text-[#9D9D9B]">
                  Built different - Urbana, MD
                </p>
              </div>

              {/* Start Section */}
              <div className="mb-6">
                <h3 className="mb-2 text-xs text-[#CCCCCC]">Start</h3>
                <div className="flex flex-col gap-2">
                  {/* Open Resume */}
                  <Link
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1 text-left transition-opacity hover:opacity-70"
                  >
                    <GoToFile className="h-4 w-4 text-[#108781]" />
                    <span className="text-xs text-[#108781]">
                      Open Resume...
                    </span>
                  </Link>

                  {/* Open Projects */}
                  <button className="inline-flex w-fit items-center gap-1 text-left transition-opacity hover:opacity-70">
                    <FolderOpened className="h-4 w-4 text-[#108781]" />
                    <span className="text-xs text-[#108781]">
                      Open Projects...
                    </span>
                  </button>

                  {/* Open GitHub */}
                  <Link
                    href="https://github.com/ogurbana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1 text-left transition-opacity hover:opacity-70"
                  >
                    <GitBranch className="h-4 w-4 text-[#108781]" />
                    <span className="text-xs text-[#108781]">
                      Open GitHub...
                    </span>
                  </Link>
                </div>
              </div>

              {/* Recent Section */}
              <div>
                <h3 className="mb-1 text-xs text-[#CCCCCC]">Recent</h3>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-[#108781]">debloat buddy</span>
                  <span className="text-[#CCCCCC]">
                    ~/case-study/debloat-buddy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
