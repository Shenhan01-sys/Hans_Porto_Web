import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
    role: "user" | "assistant";
    parts: string;
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            parts: "Hello! 👋 I'm the AI assistant for Hans Gunawan's portfolio. Feel free to ask me anything about Hans! 😊",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-resize textarea
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            parts: inputValue.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }

        try {
            // Prepare history (exclude current message)
            const history = messages.map((msg) => ({
                role: msg.role,
                parts: msg.parts,
            }));

            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage.parts,
                    history,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get response");
            }

            // Handle SSE stream
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let fullResponse = "";

            // Add placeholder message
            const aiMessageIndex = messages.length + 1;
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    parts: "",
                    timestamp: new Date(),
                },
            ]);

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value);
                    const lines = chunk.split("\n");

                    for (const line of lines) {
                        if (line.startsWith("data: ")) {
                            try {
                                const data = JSON.parse(line.slice(6));
                                if (data.chunk) {
                                    fullResponse += data.chunk;
                                    // Update message with accumulated response
                                    setMessages((prev) => {
                                        const newMessages = [...prev];
                                        newMessages[aiMessageIndex] = {
                                            role: "assistant",
                                            parts: fullResponse,
                                            timestamp: new Date(),
                                        };
                                        return newMessages;
                                    });
                                } else if (data.done) {
                                    // Response complete
                                    break;
                                } else if (data.error) {
                                    throw new Error(data.error);
                                }
                            } catch (e) {
                                console.error("Parse error:", e);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    parts: "Sorry, an error occurred. Please try again. 😔",
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9999] bg-primary text-primary-foreground rounded-full p-4 shadow-2xl hover:shadow-primary/50 transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <MessageCircle size={24} />
                            <motion.span
                                className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed bottom-24 right-6 z-[9998] w-[95vw] sm:w-96 h-[500px] bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                                        <Sparkles size={20} className="text-primary-foreground" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">Hans AI Assistant</h3>
                                    <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted text-foreground"
                                            }`}
                                    >
                                        <div
                                            className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-headings:text-inherit prose-p:text-inherit prose-strong:text-inherit prose-li:text-inherit prose-a:text-inherit"
                                            style={{ color: msg.role === "user" ? "black" : "white" }}
                                        >
                                            <ReactMarkdown>{msg.parts}</ReactMarkdown>
                                        </div>
                                        <span className="text-xs opacity-60 mt-1 block">
                                            {msg.timestamp.toLocaleTimeString("id-ID", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-muted rounded-2xl px-4 py-2">
                                        <div className="flex gap-1">
                                            <motion.span
                                                className="w-2 h-2 bg-foreground/40 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                            />
                                            <motion.span
                                                className="w-2 h-2 bg-foreground/40 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                            />
                                            <motion.span
                                                className="w-2 h-2 bg-foreground/40 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-border bg-card/50 backdrop-blur">
                            <div className="flex gap-2 items-end">
                                <textarea
                                    ref={textareaRef}
                                    value={inputValue}
                                    onChange={handleTextareaChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask about Hans..."
                                    disabled={isLoading}
                                    className="flex-1 bg-muted border border-border rounded-xl px-4 py-2 text-sm resize-none max-h-24 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                                    rows={1}
                                />
                                <motion.button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isLoading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-primary text-primary-foreground p-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={18} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
