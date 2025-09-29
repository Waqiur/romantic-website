import { useRef, useEffect } from "react";
const profileImage = "/assets/Profile.webp"; // Use public URL path

const HeroSection = () => {
    const profileContainerRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // Create dynamic particles
    useEffect(() => {
        if (!profileContainerRef.current) return;

        const container = profileContainerRef.current;
        const particleCount = 8;
        const particles: HTMLDivElement[] = [];

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";

            // Random position around the container
            const angle = Math.random() * Math.PI * 2; // Random angle
            const distance = 70 + Math.random() * 60; // Random distance from center (between 70-130px)

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            // Random size
            const size = 2 + Math.random() * 4;

            // Apply styles
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `calc(50% + ${x}px)`;
            particle.style.top = `calc(50% + ${y}px)`;

            // Random color
            const hue = 220 + Math.random() * 60; // Blue to purple range
            particle.style.backgroundColor = `hsl(${hue}, 100%, 75%)`;

            // Random animation
            const animDuration = 3 + Math.random() * 6;
            particle.style.animation = `float-particle ${animDuration}s ease-in-out infinite alternate`;
            particle.style.animationDelay = `-${Math.random() * animDuration}s`;

            container.appendChild(particle);
            particles.push(particle);
        }

        return () => {
            particles.forEach((p) => p.remove());
        };
    }, []);
    return (
        <div className="relative flex flex-col items-center justify-start overflow-hidden">
            {/* Fallback Background */}
            <div className="absolute inset-0 z-0">
                <FallbackBackground />
            </div>

            <div className="container mx-auto px-4 z-10 text-center w-full">
                <div className="max-w-3xl mx-auto">
                    {/* Profile Image - Smaller and better positioned for mobile */}
                    <div className="flex items-center justify-center mb-6 mt-16 sm:mt-10">
                        <div
                            ref={profileContainerRef}
                            className="h-40 w-40 xs:h-44 xs:w-44 sm:h-48 sm:w-48 md:h-56 md:w-56 relative perspective profile-wrapper"
                        >
                            <div className="absolute inset-0 rounded-full opacity-90 bg-gradient-to-r from-purple-600 via-blue-500 to-violet-700 animate-spin-slow"></div>
                            <div
                                className="absolute inset-1 bg-slate-900 rounded-full overflow-hidden flex items-center justify-center"
                                style={{
                                    transformStyle: "preserve-3d",
                                    transition: "transform 0.3s ease-out",
                                    boxShadow:
                                        "inset 0 0 20px rgba(123, 97, 255, 0.3)",
                                }}
                            >
                                <div
                                    ref={profileRef}
                                    className="profile-3d-container overflow-hidden w-full h-full rounded-full"
                                    style={{
                                        transition: "transform 0.3s ease-out",
                                    }}
                                >
                                    <img
                                        src={profileImage}
                                        alt="Waqiur Ansari"
                                        className="object-cover w-full h-full profile-image"
                                        loading="eager"
                                        fetchpriority="high"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Name - Increased size on mobile for better visibility */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-inter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                        Waqiur Ansari
                    </h1>

                    {/* Title - Adjusted for better visibility on small screens */}
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 text-white">
                        <span className="font-bold">Full-Stack Developer</span>
                    </p>

                    {/* Bio - Increased text size for better readability */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 md:mb-8 max-w-2xl mx-auto">
                        Building high-performance MERN & .NET applications with
                        AI-driven automation and enterprise-grade integrations.
                    </p>

                    {/* Call to action buttons - Improved for mobile */}
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
                        <a
                            href="#projects"
                            className="w-full max-w-xs sm:w-auto px-6 py-3 text-base sm:text-base font-medium gradient-purple-blue text-white rounded-lg transform hover:scale-105 transition-all shadow-lg hover:shadow-indigo-500/50"
                        >
                            View My Work
                        </a>
                        <a
                            href="#contact"
                            className="w-full max-w-xs sm:w-auto px-6 py-3 text-base sm:text-base font-medium bg-slate-800 bg-opacity-70 border border-indigo-400 text-white hover:bg-slate-700 rounded-lg transform hover:scale-105 transition-all"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Fallback while Three.js loads
const FallbackBackground = () => {
    return (
        <div className="canvas-placeholder absolute inset-0">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-10 gap-8 opacity-30">
                    {Array(50)
                        .fill(null)
                        .map((_, i) => (
                            <div
                                key={i}
                                className={`w-1 h-1 ${
                                    i % 3 === 0
                                        ? "skill-primary"
                                        : i % 3 === 1
                                        ? "skill-accent"
                                        : "skill-secondary"
                                } rounded-full animate-pulse-slow`}
                                style={{ animationDelay: `calc(0.05s * ${i})` }}
                            ></div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
