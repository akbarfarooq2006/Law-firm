"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Bot, MessageCircle, Scale, X } from "lucide-react";
import Link from "next/link";
import { CHAT_OPEN_EVENT } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Assalam-o-Alaikum. I'm the Karachi Legal AI assistant of Rizvi Law Associates.\n\nI can explain procedures for property transfers, Khula, succession certificates, bail, FBR notices and more — and help you book a consultation with our advocates.",
};

const QUICK_PROMPTS = [
  "What documents are needed for property transfer in Karachi?",
  "How do I file for a succession certificate?",
  "Consultation fees & office location",
  "How long does a Khula case take?",
];

const DISCLAIMER =
  "Informational guidance only — not attorney-client privilege. Book a consultation for formal representation.";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const KEY = "klaw-session-id";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const sessionIdRef = useRef<string>("");
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize session id
  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  // Listen for "open chat" requests (hero CTA)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(CHAT_OPEN_EVENT, handler);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, handler);
  }, []);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setInput("");

      const history = messages.filter((m) => m !== GREETING || true).map((m) => ({
        role: m.role,
        content: m.content,
      }));
      history.push({ role: "user", content: trimmed });

      setMessages((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: "" },
      ]);
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current?.abort();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.slice(-12),
            session_id: sessionIdRef.current || undefined,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const delta = decoder.decode(value, { stream: true });
          if (!delta) continue;
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant") {
              next[next.length - 1] = { ...last, content: last.content + delta };
            }
            return next;
          });
        }
      } catch (err) {
        if ((err as Error)?.name !== "AbortError") {
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last?.role === "assistant" && !last.content) {
              next[next.length - 1] = {
                ...last,
                content:
                  "Sorry — I'm having trouble connecting right now. Please call us at +92 21 3583 1234 or try again shortly.",
              };
            }
            return next;
          });
        }
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming]
  );

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        aria-label={open ? "Close AI legal assistant" : "Open AI legal assistant"}
        onClick={() => {
          setOpen((v) => !v);
          setSeen(true);
        }}
        className="fixed bottom-5 right-5 z-[70] grid size-14 cursor-pointer place-items-center rounded-full bg-navy-950 text-gold-400 shadow-xl shadow-navy-950/40 ring-1 ring-white/10 transition-transform hover:scale-105 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -60, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 60, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? (
              <X className="size-6" />
            ) : (
              <MessageCircle className="size-6" />
            )}
          </motion.span>
        </AnimatePresence>
        {!open && !seen && (
          <span className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full bg-gold-400 ring-2 ring-white" />
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-[5.5rem] right-5 z-[70] flex h-[min(72vh,620px)] w-[min(92vw,402px)] flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl shadow-navy-950/25"
            role="dialog"
            aria-label="Karachi Legal AI assistant"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-navy-950 px-4 py-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-gold-400">
                <Bot className="size-5" />
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-sm font-bold text-white">Karachi Legal AI</p>
                <p className="flex items-center gap-1.5 text-[11px] text-navy-300">
                  <span className="inline-block size-1.5 rounded-full bg-emerald-400" />
                  Rizvi Law Associates · Online
                </p>
              </div>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="hidden shrink-0 rounded-full bg-gold-500 px-3 py-1.5 text-[11px] font-bold text-navy-950 hover:bg-gold-400 sm:block"
              >
                Book Consultation
              </Link>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-navy-50/60 px-3.5 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-end gap-2",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {m.role === "assistant" && (
                    <span className="mb-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-navy-950 text-gold-400">
                      <Scale className="size-3.5" />
                    </span>
                  )}
                  <div
                    className={cn(
                      "max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-sm bg-navy-950 text-white"
                        : "rounded-tl-sm border border-navy-100 bg-white text-navy-900 shadow-sm"
                    )}
                  >
                    {m.content || (
                      <span className="flex gap-1 py-1" aria-label="Assistant is typing">
                        {[0, 150, 300].map((d) => (
                          <span
                            key={d}
                            className="size-1.5 animate-bounce rounded-full bg-navy-300"
                            style={{ animationDelay: `${d}ms` }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Quick prompts */}
              {messages.length === 1 && !streaming && (
                <div className="flex flex-wrap gap-2 pt-2 pl-9">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void send(q)}
                      className="cursor-pointer rounded-full border border-gold-500/40 bg-gold-100/50 px-3 py-1.5 text-left text-[11.5px] font-medium text-gold-800 transition-colors hover:bg-gold-200/60"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="border-t border-navy-100 bg-white px-4 py-1.5 text-center text-[10px] leading-snug text-navy-400">
              {DISCLAIMER}
            </p>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2 border-t border-navy-100 bg-white p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  streaming ? "Assistant is replying…" : "Ask about your legal matter…"
                }
                disabled={streaming}
                maxLength={2000}
                className="h-11 flex-1 rounded-full border border-navy-200 bg-navy-50/50 px-4 text-sm text-navy-950 placeholder:text-navy-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={streaming || !input.trim()}
                className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-gold-500 text-navy-950 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowUp className="size-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
