"use client";

import { useState } from "react";
import BentoCard from "./BentoCard";
import { ArrowRight } from "../icons.tsx/ArrowRight";

export default function CuriousCard() {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      // Handle question submission here
      console.log("Question submitted:", question);
      setQuestion("");
    }
  };

  return (
    <BentoCard className="h-full w-full">
      <div className="flex h-full flex-col justify-between">
        <h2 className="text-2xl font-medium">Curious about me?</h2>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask Anything"
            className="border-bento-border placeholder:text-text-muted focus:ring-text-muted/30 w-full rounded-2xl border bg-transparent px-6 py-4 pr-14 text-base focus:ring-1 focus:outline-none"
          />
          <button
            type="submit"
            className="hover:bg-text-muted/10 absolute top-1/2 right-4 -translate-y-1/2 rounded-full p-2 transition-colors"
            aria-label="Submit question"
          >
            <ArrowRight className="h-5 w-5 rotate-270" />
          </button>
        </form>
      </div>
    </BentoCard>
  );
}
