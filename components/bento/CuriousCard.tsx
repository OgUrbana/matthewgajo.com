"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import BentoCard from "./BentoCard";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { IMsgSend } from "../Icons";
import { cn } from "@/lib/utils";
import * as motion from "motion/react-client";

type Message = {
  id: string;
  text: string;
  from: "me" | "matthew";
  timestamp?: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "curious about anything? text me here",
    from: "matthew",
  },
  {
    id: "2",
    text: "sounds good!",
    from: "me",
  },
];


const MESSAGE_ENTER = { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] as const };
const RESPONSE_START_DELAY_MS = 1000;

export default function CuriousCard() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isAwaitingResponse]);

  useEffect(() => {
    if (lastAddedId === null) return;
    const t = setTimeout(() => setLastAddedId(null), 400);
    return () => clearTimeout(t);
  }, [lastAddedId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isAwaitingResponse) return;
    const userMessageId = crypto.randomUUID();

    setMessages((prev) => [
      ...prev,
      { id: userMessageId, text, from: "me" },
    ]);
    setLastAddedId(userMessageId);
    setInput("");

    await new Promise((resolve) => setTimeout(resolve, RESPONSE_START_DELAY_MS));
    setIsAwaitingResponse(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data: { reply?: string; error?: string } = await res.json().catch(() => ({}));
      let replyText = data.reply?.trim();

      if (!res.ok) {
        if (res.status === 429) {
          replyText = "getting a lot of texts rn, give me a sec and try again";
        } else if (data.error) {
          replyText = data.error;
        } else {
          replyText = "something broke on my end, try sending that again";
        }
      }

      if (!replyText) {
        replyText = "my bad, i could not get that response out";
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), text: replyText, from: "matthew" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: "network issue on my side, try one more time",
          from: "matthew",
        },
      ]);
    } finally {
      setIsAwaitingResponse(false);
    }
  };

  return (
    <BentoCard className="max-h-[275px] md:max-h-[530px] flex min-h-0 w-full flex-col overflow-hidden font-sf">
      {/* Chat messages with top fade */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div
          ref={scrollRef}
          className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-y-auto overflow-x-hidden px-4 pt-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {messages.map((msg) =>
            msg.from !== "me" ? (
              <motion.div
                key={msg.id}
                layout
                className="flex items-end gap-2"
                transition={MESSAGE_ENTER}
              >
                <div className="bg-linear-to-r from-emerald-500 to-blue-500 rounded-full p-1">
                  <Image
                    src="/memoji.png"
                    alt="Matthew"
                    width={32}
                    height={32}
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                </div>
                <div className="flex min-w-0 max-w-[85%] flex-col">
                  <span className="mb-2 pl-1 text-xs text-text-muted">
                    Matthew Gajo
                  </span>
                  <div className="relative wrap-break-word rounded-2xl rounded-bl-md bg-[#E8E8ED] px-4 py-2.5 pl-4 text-[15px] text-[#1d1d1f] dark:bg-[#2c2c2e] dark:text-[#e5e5e7]">
                    <span
                      className="absolute -left-1.5 bottom-3 h-0 w-0 border-[6px] border-transparent border-r-[#E8E8ED] dark:border-r-[#2c2c2e]"
                    />
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={msg.id}
                layout
                className="flex justify-end"
                transition={MESSAGE_ENTER}
              >
                <motion.div
                  layout
                  className="relative min-w-0 max-w-[85%] wrap-break-word rounded-2xl rounded-br-md bg-[#007AFF] px-4 py-2.5 pr-4 text-[15px] text-white"
                  initial={msg.id === lastAddedId ? { opacity: 0, y: 14, scale: 0.96 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={MESSAGE_ENTER}
                >
                  <span
                    className="absolute -right-1.5 bottom-3 h-0 w-0 border-[6px] border-transparent"
                    style={{ borderLeftColor: "#007AFF" }}
                  />
                  {msg.text}
                </motion.div>
              </motion.div>
            )
          )}

          {isAwaitingResponse ? (
            <motion.div
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-2"
              transition={MESSAGE_ENTER}
            >
              <div className="bg-linear-to-r rounded-full from-emerald-500 to-blue-500 p-1">
                <Image
                  src="/memoji.png"
                  alt="Matthew"
                  width={32}
                  height={32}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
              </div>
              <div className="flex min-w-0 max-w-[85%] flex-col">
                <span className="mb-2 pl-1 text-xs text-text-muted">
                  Matthew Gajo
                </span>
                <div className="relative rounded-2xl rounded-bl-md bg-[#E8E8ED] px-4 py-2.5 text-[15px] text-[#1d1d1f] dark:bg-[#2c2c2e] dark:text-[#e5e5e7]">
                  <span className="absolute -left-1.5 bottom-3 h-0 w-0 border-[6px] border-r-[#E8E8ED] border-transparent dark:border-r-[#2c2c2e]" />
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-2.5 w-2.5 rounded-full bg-[#b5b5b8] dark:bg-[#7b7b80]"
                        animate={{ opacity: [0.35, 1, 0.35], y: [0, -1, 0] }}
                        transition={{
                          duration: 0.9,
                          delay: dot * 0.16,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
        {/* Top fade overlay - matches card background */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-14 bg-linear-to-b from-bento-bg to-bento-bg/0"
          aria-hidden
        />
      </div>

      {/* Input bar */}
      <div className="shrink-0 bg-bento-bg/80 px-3 py-2.5">
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-full bg-[#E8E8ED]/80 px-2 py-1.5 dark:bg-[#2c2c2e]/80"
        >
          <div className="flex shrink-0 items-center gap-1">
            <Link
              href="mailto:hello@matthewgajo.com"
              className="rounded-full p-2 text-text-muted transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
              aria-label="Email"
            >
              <EnvelopeIcon className="h-5 w-5" />
            </Link>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="iMessage"
            className="min-w-0 items-center justify-between flex-1 bg-transparent px-2 py-1.5 placeholder:text-text-muted focus:outline-none"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center justify-center transition-opacity hover:opacity-90 disabled:hover:opacity-70"
            aria-label="Send"
            disabled={!input.trim() || isAwaitingResponse}
          >
            <IMsgSend
              disabled={!input.trim() || isAwaitingResponse}
              className={cn(
                "size-7",
                !input.trim() || isAwaitingResponse ? "opacity-50" : "cursor-pointer"
              )}
            />
          </button>
        </form>
      </div>
    </BentoCard>
  );
}
