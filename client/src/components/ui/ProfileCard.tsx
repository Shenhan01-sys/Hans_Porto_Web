import { useEffect, useRef, useState } from "react";

// Tech stack data
const techStackOuter = [
  { id: "react", icon: "⚛️", title: "React", color: "#61dafb", rotation: 0 },
  { id: "laravel", icon: "🔺", title: "Laravel", color: "#ff2d20", rotation: 51 },
  { id: "next", icon: "▲", title: "Next.js", color: "#ffffff", rotation: 102 },
  { id: "dotnet", icon: "🔷", title: ".NET", color: "#512bd4", rotation: 153 },
  { id: "chatbot", icon: "🤖", title: "AI/ChatBot", color: "#10b981", rotation: 204 },
  { id: "database", icon: "🗄️", title: "Database", color: "#f59e0b", rotation: 255 },
  { id: "web3", icon: "⛓️", title: "Web3", color: "#627eea", rotation: 306 },
];

const techStackInner = [
  { id: "typescript", icon: "📘", title: "TypeScript", color: "#3178c6", rotation: 0 },
  { id: "python", icon: "🐍", title: "Python", color: "#3776ab", rotation: 72 },
  { id: "docker", icon: "🐳", title: "Docker", color: "#2496ed", rotation: 144 },
  { id: "blockchain", icon: "🔗", title: "Blockchain", color: "#f7931a", rotation: 216 },
  { id: "vue", icon: "💚", title: "Vue.js", color: "#42b983", rotation: 288 },
];

const techMessages: Record<string, string[]> = {
  react: ["⚛️ React magic!", "🔄 Component power!", "⚛️ State & Props!"],
  laravel: ["🐘 Laravel flow!", "✨ Elegant code!", "🔐 Secure backend!"],
  next: ["▶️ Next.js fast!", "⚡ SSR power!", "🎯 Full-stack!"],
  dotnet: ["🔷 .NET strength!", "💪 Enterprise!", "🏗️ Solid foundation!"],
  chatbot: ["🤖 AI chat!", "💬 Smart talk!", "🧠 Learning mode!"],
  database: ["🗄️ Data storage!", "📊 DB power!", "🔗 Queries fast!"],
  web3: ["⛓️ Web3 power!", "🔗 Decentralized!", "💎 Blockchain!"],
  vue: ["💚 Vue smooth!", "🎨 Beautiful UI!", "⚡ Reactive!"],
  typescript: ["📘 Type safe!", "✅ No bugs!", "🛡️ Type guard!"],
  python: ["🐍 Python power!", "🎨 ML magic!", "🔬 Data science!"],
  docker: ["🐳 Container magic!", "📦 Deployment!", "🔧 DevOps!"],
  blockchain: ["⛓️ Blockchain!", "🔐 Secure!", "💰 Crypto!"],
};

interface SpeakBubble {
  id: number;
  message: string;
  x: number;
  y: number;
}

interface ProfileCardProps {
  imageSrc: string;
  name: string;
}

export default function ProfileCard({ imageSrc, name }: ProfileCardProps) {
  const [bubbles, setBubbles] = useState<SpeakBubble[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleIdRef = useRef(0);

  const showBubble = (techId: string, element: HTMLElement) => {
    const messages = techMessages[techId] || ["Tech Stack!"];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      
      const newBubble: SpeakBubble = {
        id: bubbleIdRef.current++,
        message: randomMsg,
        x: elementRect.left - containerRect.left + elementRect.width / 2,
        y: elementRect.top - containerRect.top - 50,
      };
      
      setBubbles(prev => [...prev, newBubble]);
      
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 2500);
    }
  };

  // Auto speak effect
  useEffect(() => {
    const interval = setInterval(() => {
      const logos = containerRef.current?.querySelectorAll(".tech-logo");
      if (logos && logos.length > 0) {
        const randomLogo = logos[Math.floor(Math.random() * logos.length)] as HTMLElement;
        const techId = randomLogo.dataset.tech;
        if (techId) {
          showBubble(techId, randomLogo);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm mx-auto lg:mx-0">
      {/* Speak Bubbles */}
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute z-50 pointer-events-none animate-speak"
          style={{
            left: bubble.x,
            top: bubble.y,
            transform: "translateX(-50%)",
          }}
        >
          <div className="bg-gradient-to-r from-cyan-400 to-violet-500 text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg shadow-cyan-500/50">
            {bubble.message}
            <div className="absolute w-2 h-2 bg-cyan-400 rounded-full -bottom-1 left-1/2 -translate-x-1/2" />
          </div>
        </div>
      ))}

      {/* Profile Card */}
      <div className="profile-card relative aspect-[3/4] rounded-2xl overflow-visible animate-border-glow">
        {/* Card Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0f0a1a] rounded-2xl z-[1]" />
        
        {/* Glowing Border */}
        <div className="absolute inset-0 rounded-2xl z-[2] pointer-events-none border-2 border-transparent bg-gradient-to-br from-cyan-400 via-violet-500 to-cyan-400 bg-clip-border" 
          style={{
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "2px",
          }}
        />
        
        {/* Scan Effect */}
        <div className="absolute w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan z-[5]" />

        {/* Orbit Container - Outer */}
        <div className="absolute inset-0 z-[1] overflow-visible">
          <div 
            className="absolute w-[280px] h-[280px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit"
            style={{ animationDuration: "20s" }}
          >
            {techStackOuter.map(tech => (
              <div
                key={tech.id}
                data-tech={tech.id}
                className="tech-logo absolute w-10 h-10 -left-5 -top-5 bg-gradient-to-br from-cyan-400/15 to-violet-500/15 border-2 border-cyan-400/40 rounded-xl flex items-center justify-center text-lg cursor-pointer transition-all duration-300 hover:scale-125 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] backdrop-blur-sm animate-glow-tech"
                style={{
                  transform: `rotate(${tech.rotation}deg) translateX(140px) rotate(-${tech.rotation}deg)`,
                }}
                title={tech.title}
                onClick={(e) => showBubble(tech.id, e.currentTarget)}
                onMouseEnter={(e) => {
                  setTimeout(() => {
                    if (e.currentTarget.matches(":hover")) {
                      showBubble(tech.id, e.currentTarget);
                    }
                  }, 300);
                }}
              >
                <span>{tech.icon}</span>
              </div>
            ))}
          </div>

          {/* Inner Orbit - Reverse */}
          <div 
            className="absolute w-[200px] h-[200px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit-reverse"
            style={{ animationDuration: "25s" }}
          >
            {techStackInner.map(tech => (
              <div
                key={tech.id}
                data-tech={tech.id}
                className="tech-logo absolute w-8 h-8 -left-4 -top-4 bg-gradient-to-br from-cyan-400/15 to-violet-500/15 border-2 border-cyan-400/40 rounded-lg flex items-center justify-center text-sm cursor-pointer transition-all duration-300 hover:scale-125 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] backdrop-blur-sm animate-glow-tech"
                style={{
                  transform: `rotate(${tech.rotation}deg) translateX(100px) rotate(-${tech.rotation}deg)`,
                }}
                title={tech.title}
                onClick={(e) => showBubble(tech.id, e.currentTarget)}
                onMouseEnter={(e) => {
                  setTimeout(() => {
                    if (e.currentTarget.matches(":hover")) {
                      showBubble(tech.id, e.currentTarget);
                    }
                  }, 300);
                }}
              >
                <span>{tech.icon}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Content */}
        <div className="relative w-full h-full flex flex-col justify-end z-[3] overflow-hidden rounded-2xl">
          {/* Photo Area */}
          <div className="absolute inset-0 flex items-center justify-center animate-glow-pulse">
            <img
              src={imageSrc}
              alt={name}
              className="w-full h-full object-cover object-center"
              data-testid="profile-image"
            />
          </div>
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-[4]" />
          
          {/* Title Section */}
          <div className="relative z-[5] p-6 text-center">
            <h3 
              className="font-bold text-xl md:text-2xl text-cyan-400 tracking-wider uppercase animate-neon-text"
              style={{ fontFamily: "'Orbitron', 'Poppins', sans-serif" }}
            >
              {name}
            </h3>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes orbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes orbit-reverse {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(calc(100% * 4 / 3 * 100)); opacity: 0; }
        }
        
        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(0, 255, 255, 0.5); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.1);
          }
          50% { 
            box-shadow: inset 0 0 40px rgba(0, 255, 255, 0.2);
          }
        }
        
        @keyframes glow-tech {
          0%, 100% {
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.4), 0 0 20px rgba(0, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4);
          }
        }
        
        @keyframes neon-text {
          0%, 100% {
            text-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5), 0 0 60px rgba(139, 92, 246, 0.3);
          }
        }
        
        @keyframes speak {
          0% { opacity: 0; transform: translateX(-50%) scale(0.8) translateY(10px); }
          10% { opacity: 1; transform: translateX(-50%) scale(1) translateY(0px); }
          90% { opacity: 1; transform: translateX(-50%) scale(1) translateY(0px); }
          100% { opacity: 0; transform: translateX(-50%) scale(0.8) translateY(10px); }
        }
        
        .animate-orbit {
          animation: orbit linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse linear infinite;
        }
        
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
        
        .animate-border-glow {
          animation: border-glow 4s ease-in-out infinite;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 4s ease-in-out infinite;
        }
        
        .animate-glow-tech {
          animation: glow-tech 3s ease-in-out infinite;
        }
        
        .animate-neon-text {
          animation: neon-text 3s ease-in-out infinite;
        }
        
        .animate-speak {
          animation: speak 2.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
