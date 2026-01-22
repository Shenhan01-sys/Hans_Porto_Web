import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeInVariants, staggerContainer } from "@/lib/animations";
import { Calendar, ExternalLink, Newspaper } from "lucide-react";

// Declare Twitter, Instagram, and TikTok widget types
declare global {
    interface Window {
        twttr?: {
            widgets: {
                load: (element?: HTMLElement) => void;
            };
        };
        instgrm?: {
            Embeds: {
                process: (element?: HTMLElement) => void;
            };
        };
        TikTok?: {
            init: () => void;
        };
    }
}

interface TwitterEmbed {
    type: "twitter";
    tweetHtml: string; // Raw HTML blockquote from Twitter
    date: string; // Date for sorting (format: "YYYY-MM-DD")
}

interface YouTubeEmbed {
    type: "youtube";
    videoId: string;
    title: string;
    startTime?: number; // Start time in seconds
}

interface InstagramEmbed {
    type: "instagram";
    postUrl: string; // Instagram post URL
    embedHtml?: string; // Optional: Raw HTML blockquote from Instagram
    date: string; // Date for sorting (format: "YYYY-MM-DD")
}

interface LinkedInEmbed {
    type: "linkedin";
    postUrn: string; // LinkedIn post URN (e.g., "urn:li:ugcPost:7417940591713443840")
    title?: string; // Optional title for the post
    date: string; // Date for sorting (format: "YYYY-MM-DD")
}

interface TikTokEmbed {
    type: "tiktok";
    videoId: string; // TikTok video ID
    username: string; // TikTok username (without @)
    date: string; // Date for sorting (format: "YYYY-MM-DD")
}

interface CustomNews {
    type: "custom";
    title: string;
    description: string;
    date: string; // Date for sorting (format: "YYYY-MM-DD") and display
    image?: string;
    link?: string;
    tags?: string[];
}

type NewsItem = TwitterEmbed | YouTubeEmbed | InstagramEmbed | LinkedInEmbed | TikTokEmbed | CustomNews;

// News data - add new items here
const newsItems: NewsItem[] = [
    {
        type: "youtube",
        videoId: "NTkOHlZ3-Jc",
        title: "Pilmapres award ceremony at Universitas Kristen Duta Wacana🏆",
        startTime: 15204,
    },
    {
        type: "youtube",
        videoId: "dXo618X13Yk",
        title: "UKDW Signs MoU with Coaches & Student-Athletes as a Commitment to Develop Student Activity Units🏀",
        startTime: 73,
    },
    {
        type: "instagram",
        postUrl: "https://www.instagram.com/p/DTuce7zEw_b/",
        date: "2026-01-21",
    },
    {
        type: "instagram",
        postUrl: "https://www.instagram.com/p/DPibpu4EgUO/",
        date: "2025-10-08",
    },
    {
        type: "instagram",
        postUrl: "https://www.instagram.com/reel/DLjsVoXvwW3/",
        date: "2025-07-01",
    },
    {
        type: "instagram",
        postUrl: "https://www.instagram.com/p/C_8f3ZtTYyf/",
        date: "2024-09-20",
    },
    {
        type: "instagram",
        postUrl: "https://www.instagram.com/p/DCHfEK2z786/",
        date: "2024-09-15",
    },
    {
        type: "linkedin",
        postUrn: "urn:li:ugcPost:7417940591713443840",
        title: "LinkedIn Update",
        date: "2026-01-16",
    },
    {
        type: "tiktok",
        videoId: "7481493441654836485",
        username: "pmbukdw",
        date: "2025-03-14",
    },
    {
        type: "twitter",
        tweetHtml: `<blockquote class="twitter-tweet" data-media-max-width="560">
            <p lang="en" dir="ltr">
                The achievements of the participants of the Sui dev workshop at
                Gadjah Mada University were very great. <br /><br />They have
                built many build on sui product innovations This project has
                clear real-world benefits. <br /><br />Try here<br />• Sui
                Freelance marketplace by brother Daniko…
                <a href="https://t.co/6razUfPe9M">https://t.co/6razUfPe9M</a>
                <a href="https://t.co/dkl5vDSUoN">pic.twitter.com/dkl5vDSUoN</a>
            </p>
            &mdash; cokri.btc (@Moving_03)
            <a href="https://twitter.com/Moving_03/status/2013842227274108993?ref_src=twsrc%5Etfw">January 21, 2026</a>
        </blockquote>`,
        date: "2026-01-21",
    },
    {
        type: "custom",
        title: "🎉 Payshield - Progressive Escrow Launched!",
        description:
            "Successfully deployed Payshield, a milestone-based payment platform powered by Sui blockchain. Features include secure escrow, privy authentication, and progressive payment releases.",
        date: "2026-01-20",
        image: "/images/EscrowProfilePicture.png",
        link: "https://pixel-perfect-hans.vercel.app/",
        tags: ["Blockchain", "Sui", "Web3", "DeFi"],
    },
    {
        type: "custom",
        title: "📚 SmartDev Academic LMS Update",
        description:
            "Major update to SmartDev Academic LMS with new features including real-time notifications, enhanced grading system, and parent dashboard improvements.",
        date: "2025-12-15",
        image: "/images/SmartDevAcademic-profile.png",
        link: "https://github.com/Shenhan01-sys/Project_lmsRPL3_SmartDev-Academic?tab=readme-ov-file#-smartdev-academic-lms",
        tags: ["Laravel", "LMS", "Education"],
    },
];

// Helper function to format date for display
function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Get non-YouTube items sorted by date (newest first)
function getSortedNonYouTubeItems(): NewsItem[] {
    return newsItems
        .filter(item => item.type !== 'youtube')
        .sort((a, b) => {
            const dateA = 'date' in a ? new Date(a.date).getTime() : 0;
            const dateB = 'date' in b ? new Date(b.date).getTime() : 0;
            return dateB - dateA; // Newest first
        });
}

// TikTok Embed Component
function TikTokCard({ video }: { video: TikTokEmbed }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load TikTok embed script
        const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
        
        if (!existingScript) {
            const script = document.createElement("script");
            script.src = "https://www.tiktok.com/embed.js";
            script.async = true;
            document.body.appendChild(script);
        } else if (window.TikTok) {
            // Script already loaded, reinitialize
            window.TikTok.init();
        }
    }, [video.videoId]);

    const embedHtml = `<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@${video.username}/video/${video.videoId}" data-video-id="${video.videoId}" style="max-width: 605px; min-width: 325px;"><section><a target="_blank" title="@${video.username}" href="https://www.tiktok.com/@${video.username}?refer=embed">@${video.username}</a></section></blockquote>`;

    return (
        <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>TikTok</span>
                <span className="mx-1">•</span>
                <Calendar size={14} />
                <span>{formatDate(video.date)}</span>
            </div>
            <div
                ref={containerRef}
                className="tiktok-embed-container [&_.tiktok-embed]:!mx-auto [&_.tiktok-embed]:!my-0"
                dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
        </motion.div>
    );
}

// Twitter Embed Component
function TwitterCard({ tweet }: { tweet: TwitterEmbed }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Twitter widget script if not loaded
        if (!window.twttr) {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charset = "utf-8";
            document.body.appendChild(script);

            script.onload = () => {
                if (window.twttr && containerRef.current) {
                    window.twttr.widgets.load(containerRef.current);
                }
            };
        } else {
            // Script already loaded, just reload widgets
            if (containerRef.current) {
                window.twttr.widgets.load(containerRef.current);
            }
        }
    }, [tweet.tweetHtml]);

    return (
        <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>X / Twitter</span>
                <span className="mx-1">•</span>
                <Calendar size={14} />
                <span>{formatDate(tweet.date)}</span>
            </div>
            <div
                ref={containerRef}
                className="twitter-embed-container [&_.twitter-tweet]:!mx-auto [&_.twitter-tweet]:!my-0"
                dangerouslySetInnerHTML={{ __html: tweet.tweetHtml }}
            />
        </motion.div>
    );
}

// Instagram Embed Component
function InstagramCard({ post }: { post: InstagramEmbed }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load Instagram embed script if not loaded
        if (!window.instgrm) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (window.instgrm && containerRef.current) {
                    window.instgrm.Embeds.process(containerRef.current);
                }
            };
        } else {
            // Script already loaded, just process embeds
            if (containerRef.current) {
                window.instgrm.Embeds.process(containerRef.current);
            }
        }
    }, [post.postUrl]);

    // Generate embed HTML from URL if not provided
    const embedHtml = post.embedHtml || `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="${post.postUrl}?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%;"><div style="padding:16px;"><a href="${post.postUrl}?utm_source=ig_embed&amp;utm_campaign=loading" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"><div style="display: flex; flex-direction: row; align-items: center;"><div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div><div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"><div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div><div style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div><div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"><div style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div></a></div></blockquote>`;

    return (
        <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
                <span className="mx-1">•</span>
                <Calendar size={14} />
                <span>{formatDate(post.date)}</span>
            </div>
            <div
                ref={containerRef}
                className="instagram-embed-container [&_.instagram-media]:!mx-auto [&_.instagram-media]:!my-0 [&_.instagram-media]:!max-w-full"
                dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
        </motion.div>
    );
}

// LinkedIn Embed Component
function LinkedInCard({ post }: { post: LinkedInEmbed }) {
    const embedUrl = `https://www.linkedin.com/embed/feed/update/${post.postUrn}?collapsed=1`;

    return (
        <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-4 hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
                <span className="mx-1">•</span>
                <Calendar size={14} />
                <span>{formatDate(post.date)}</span>
            </div>
            <div className="relative w-full overflow-hidden rounded-lg" style={{ minHeight: '400px' }}>
                <iframe
                    src={embedUrl}
                    className="w-full h-full absolute inset-0"
                    style={{ minHeight: '400px' }}
                    frameBorder="0"
                    allowFullScreen
                    title={post.title || "LinkedIn Post"}
                />
            </div>
        </motion.div>
    );
}

// YouTube Embed Component
function YouTubeCard({ video }: { video: YouTubeEmbed }) {
    const embedUrl = video.startTime
        ? `https://www.youtube.com/embed/${video.videoId}?start=${video.startTime}`
        : `https://www.youtube.com/embed/${video.videoId}`;

    return (
        <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    src={embedUrl}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>YouTube</span>
                </div>
                <h3 className="text-base font-semibold text-foreground">
                    {video.title}
                </h3>
            </div>
        </motion.div>
    );
}

// Custom News Card Component
function CustomNewsCard({ news }: { news: CustomNews }) {
    return (
        <motion.div
            className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            whileHover={{ y: -5 }}
        >
            {news.image && (
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
            )}

            <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(news.date)}</span>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-3">
                    {news.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                    {news.description}
                </p>

                {news.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {news.tags.map((tag) => (
                            <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {news.link && (
                    <motion.a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        whileHover={{ x: 5 }}
                    >
                        <span>View More</span>
                        <ExternalLink size={14} />
                    </motion.a>
                )}
            </div>
        </motion.div>
    );
}

export default function NewsSection() {
    return (
        <section id="news" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-16"
                        variants={fadeInVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Newspaper className="w-8 h-8 text-primary" />
                            <h2 className="heading-font text-4xl md:text-5xl font-bold gradient-text">
                                Latest News & My updates
                            </h2>
                        </div>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Stay updated with my latest activities, achievements, and project
                            launches. Follow my journey in tech! 🚀
                        </p>
                    </motion.div>

                    {/* Featured YouTube Videos */}
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {newsItems.map((item, index) =>
                            item.type === "youtube" ? (
                                <motion.div key={`yt-${index}`} variants={fadeInVariants}>
                                    <YouTubeCard video={item} />
                                </motion.div>
                            ) : null
                        )}
                    </motion.div>

                    {/* Other News - Masonry Layout */}
                    <motion.div
                        className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {getSortedNonYouTubeItems().map((item, index) =>
                            item.type === "twitter" ? (
                                <motion.div
                                    key={`tw-${index}`}
                                    variants={fadeInVariants}
                                    className="break-inside-avoid"
                                >
                                    <TwitterCard tweet={item} />
                                </motion.div>
                            ) : item.type === "instagram" ? (
                                <motion.div
                                    key={`ig-${index}`}
                                    variants={fadeInVariants}
                                    className="break-inside-avoid"
                                >
                                    <InstagramCard post={item} />
                                </motion.div>
                            ) : item.type === "linkedin" ? (
                                <motion.div
                                    key={`li-${index}`}
                                    variants={fadeInVariants}
                                    className="break-inside-avoid"
                                >
                                    <LinkedInCard post={item} />
                                </motion.div>
                            ) : item.type === "tiktok" ? (
                                <motion.div
                                    key={`tt-${index}`}
                                    variants={fadeInVariants}
                                    className="break-inside-avoid"
                                >
                                    <TikTokCard video={item} />
                                </motion.div>
                            ) : item.type === "custom" ? (
                                <motion.div
                                    key={`custom-${index}`}
                                    variants={fadeInVariants}
                                    className="break-inside-avoid"
                                >
                                    <CustomNewsCard news={item} />
                                </motion.div>
                            ) : null
                        )}
                    </motion.div>

                    {/* Social Follow CTA */}
                    <motion.div
                        className="mt-16 text-center"
                        variants={fadeInVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <p className="text-muted-foreground mb-4">
                            Want more updates? Follow me on social media!
                        </p>
                        <div className="flex justify-center gap-4">
                            <motion.a
                                href="https://x.com/HGunawan07"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-full hover:bg-[#1DA1F2]/20 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                                <span>Follow on X</span>
                            </motion.a>
                            <motion.a
                                href="https://www.instagram.com/shen_han01/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F77737]/10 text-[#E1306C] rounded-full hover:from-[#833AB4]/20 hover:via-[#FD1D1D]/20 hover:to-[#F77737]/20 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                <span>Follow on Instagram</span>
                            </motion.a>
                            <motion.a
                                href="https://www.linkedin.com/in/hans-gunawan01/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 bg-[#0A66C2]/10 text-[#0A66C2] rounded-full hover:bg-[#0A66C2]/20 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                                <span>Connect on LinkedIn</span>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
