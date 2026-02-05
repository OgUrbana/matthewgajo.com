"use client";

import { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

const AUTO_DISMISS_MS = 3000;

export default function WipNotification() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 right-4 z-50 rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-sm sm:left-auto sm:right-4 sm:max-w-sm"
        >
          <p className="font-medium">Notice</p>
          <p className="text-muted-foreground mt-0.5">This website is still WIP</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
