"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What has Andrei built with AI?",
  "Which stack does he use most?",
  "How does he handle security?",
  "Tell me about the monitoring system",
];

function Rich({ text }: { text: string }) {
  // Tiny renderer: "- " lines become a list, everything else a paragraph.
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={blocks.length} className="my-1.5 list-disc space-y-1 pl-4 marker:text-brand-text">
        {list.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>,
    );
    list = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\*\*/g, "").trim();
    if (/^[-•*]\s+/.test(line)) list.push(line.replace(/^[-•*]\s+/, ""));
    else {
      flush();
      if (line) blocks.push(<p key={blocks.length} className="my-1">{line}</p>);
    }
  }
  flush();
  return <>{blocks}</>;
}

type Icons = Record<"send" | "stop" | "spark" | "user" | "reset" | "close" | "chat", ReactNode>;

function Chat({ icons, open, onClose }: { icons: Icons; open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abort = useRef<AbortController | null>(null);
  const log = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTo({ top: el.scrollHeight });
  }, [messages]);

  useEffect(() => () => abort.current?.abort(), []);

  useEffect(() => {
    if (open) field.current?.focus();
  }, [open]);

  async function send(text: string) {
    const q = text.trim().slice(0, 500);
    if (!q || busy) return;
    setError("");
    setInput("");
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    const ctrl = new AbortController();
    abort.current = ctrl;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-6) }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "The assistant is unavailable right now.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("No answer came back. Please try again.");
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        setError((e as Error).message);
        setMessages(history);
      }
    } finally {
      setBusy(false);
      abort.current = null;
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div
      id="chat-panel"
      role="dialog"
      aria-labelledby="chat-title"
      data-open={open}
      className="chat-panel card fixed bottom-20 right-4 z-50 flex h-[min(36rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden shadow-[var(--shadow)] md:bottom-24 md:right-6"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="text-brand-text">{icons.spark}</span>
        <div>
          <p id="chat-title" className="text-sm font-medium leading-tight">Ask Andrei&apos;s resume</p>
          <p className="text-[0.6875rem] text-subtle">Answers only from his resume</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto order-last grid size-7 place-items-center rounded-md text-muted hover:bg-surface-2 hover:text-fg"
          aria-label="Close chat"
        >
          {icons.close}
        </button>
        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => {
              abort.current?.abort();
              setMessages([]);
              setError("");
            }}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted hover:bg-surface-2 hover:text-fg"
            aria-label="Start a new chat"
          >
            {icons.reset} New chat
          </button>
        )}
      </div>

      <div
        ref={log}
        role="log"
        aria-live="polite"
        aria-busy={busy}
        aria-label="Conversation"
        className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 text-sm leading-relaxed"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col justify-end">
            <p className="text-muted">
              Ask anything about Andrei&apos;s experience, projects or skills. Answers come only from his resume.
            </p>
            <div className="mt-4 grid gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-left text-[0.8125rem] text-muted transition-colors hover:border-brand/60 hover:text-fg"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className="flex gap-3">
              <span
                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border ${
                  m.role === "user" ? "border-line bg-surface-2 text-muted" : "border-brand/40 bg-brand-soft text-brand-text"
                }`}
              >
                {m.role === "user" ? icons.user : icons.spark}
              </span>
              <div className="min-w-0 flex-1">
                <p className="sr-only">{m.role === "user" ? "You said:" : "Assistant:"}</p>
                {m.content ? (
                  m.role === "user" ? <p className="my-1 text-fg">{m.content}</p> : <div className="text-fg/90"><Rich text={m.content} /></div>
                ) : (
                  <span className="dots mt-2 inline-block text-subtle" aria-label="Thinking">
                    <span /><span /><span />
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {error && (
        <p role="alert" className="border-t border-line bg-surface-2 px-4 py-2 text-xs text-[#c2410c] dark:text-[#fb923c]">
          {error}
        </p>
      )}

      <form onSubmit={onSubmit} className="border-t border-line p-3">
        <label htmlFor="chat-input" className="sr-only">
          Ask about Andrei&apos;s resume
        </label>
        <div className="flex items-end gap-2 rounded-lg border border-line bg-surface-2 p-1.5 focus-within:border-brand/60">
          <textarea
            id="chat-input"
            ref={field}
            rows={1}
            value={input}
            maxLength={500}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Ask about experience, stack, projects…"
            className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-fg outline-none placeholder:text-subtle"
          />
          {busy ? (
            <button
              type="button"
              onClick={() => abort.current?.abort()}
              className="btn btn-ghost size-9 shrink-0 px-0"
              aria-label="Stop generating"
            >
              {icons.stop}
            </button>
          ) : (
            <button type="submit" className="btn btn-primary size-9 shrink-0 px-0" aria-label="Send question" disabled={!input.trim()}>
              {icons.send}
            </button>
          )}
        </div>
        <p className="mt-2 px-1 text-[0.6875rem] text-subtle">
          <span className="kbd">Enter</span> to send · <span className="kbd">Shift</span>+<span className="kbd">Enter</span> for a new line
        </p>
      </form>
    </div>
  );
}

// Floating launcher (bottom-right). Anything with [data-open-chat] opens it, as does "/".
export function ChatWidget({ icons }: { icons: Icons }) {
  const [open, setOpen] = useState(false);
  const fab = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element).closest("[data-open-chat]")) setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as Element).closest("input, textarea, [contenteditable]");
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") {
        setOpen((was) => {
          if (was) fab.current?.focus();
          return false;
        });
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <Chat
        icons={icons}
        open={open}
        onClose={() => {
          setOpen(false);
          fab.current?.focus();
        }}
      />
      <button
        ref={fab}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close resume assistant" : "Open resume assistant"}
        title="Ask my resume ( / )"
        className="btn btn-primary fixed bottom-4 right-4 z-50 size-12 rounded-full p-0 shadow-[var(--shadow)] md:bottom-6 md:right-6"
      >
        {open ? icons.close : icons.chat}
      </button>
    </>
  );
}
