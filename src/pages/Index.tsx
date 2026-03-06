import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import OpenAI from "openai";
import { ChatMessage, TypingIndicator, type Message } from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import BackgroundSettings from "@/components/BackgroundSettings";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o";

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hey there! 👋 I'm your AI assistant. Ask me anything and I'll do my best to help. You can also customize the background using the ⚙️ button in the top right!",
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [bgOpacity, setBgOpacity] = useState(0.3);
  const [bgBlur, setBgBlur] = useState(2);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: MODEL,
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
      });

      const assistantContent = response.choices[0].message.content ?? "No response received.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantContent,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background">
      {/* Background Image */}
      <AnimatePresence>
        {backgroundUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={backgroundUrl}
              alt=""
              className="h-full w-full object-cover"
              style={{ opacity: bgOpacity, filter: `blur(${bgBlur}px)` }}
            />
            <div className="absolute inset-0 bg-background/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings */}
      <BackgroundSettings
        backgroundUrl={backgroundUrl}
        opacity={bgOpacity}
        blur={bgBlur}
        onBackgroundChange={setBackgroundUrl}
        onOpacityChange={setBgOpacity}
        onBlurChange={setBgBlur}
      />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 flex items-center justify-center gap-2 py-4 border-b border-border/30"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-lg font-semibold text-foreground">AI Chat</h1>
        </div>
      </motion.header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto chat-scrollbar"
      >
        <div className="max-w-3xl mx-auto py-4 space-y-1">
          {messages.map((msg, i) => (
            <ChatMessage key={msg.id} message={msg} index={i} />
          ))}
          {isLoading && <TypingIndicator />}
        </div>
      </div>

      {/* Input */}
      <div className="relative z-10">
        <ChatInput onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
