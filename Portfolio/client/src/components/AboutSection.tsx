import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
    {
        year: "Jan 2024 - Present",
        title: "Web Developer",
        company: "Ansari Corporate Advisors",
        description: [
            "Developing enterprise-grade web applications with scalable architectures and intuitive user experiences.",
            "Integrating Microsoft Graph API to enable seamless synchronization with Outlook, Calendar, and Todo services.",
            "Building real-time collaboration tools, including chat systems, meeting schedulers, and automated reporting.",
            "Enhancing application performance, reducing load times by 30%, and implementing robust authentication systems.",
        ],
    },
];

// Animation variants for experience items
const experienceVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

// Animation variants for the dot indicators
const dotVariants = {
    inactive: {
        scale: 1,
        boxShadow: "0px 0px 0px 0px rgba(99, 102, 241, 0.5)",
    },
    active: {
        scale: 1.3,
        boxShadow: "0px 0px 10px 2px rgba(99, 102, 241, 0.7)",
        transition: { duration: 0.5 },
    },
};

const AboutSection = () => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const experienceRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [activeIndex, setActiveIndex] = useState(-1);

    // Main timeline progress
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 0.5", "end 1"],
    });

    // Setup scroll detection for individual experience items
    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;

            // Find which experience is currently most visible in the viewport
            const experienceElements = experienceRefs.current;
            let mostVisibleIndex = -1;
            let maxVisibility = 0;

            experienceElements.forEach((el, index) => {
                if (!el) return;

                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                // Calculate how much of the element is visible in the viewport
                const visibleHeight =
                    Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
                const visibility =
                    visibleHeight > 0 ? visibleHeight / rect.height : 0;

                if (visibility > maxVisibility) {
                    maxVisibility = visibility;
                    mostVisibleIndex = index;
                }
            });

            setActiveIndex(mostVisibleIndex);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <div className="relative min-h-screen h-full flex items-center overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 text-white">
            <div className="container mx-auto px-6 py-24">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold font-inter mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                About Me
                            </h2>

                            <div className="space-y-6 text-slate-200 text-lg md:text-xl">
                                <p className="leading-relaxed">
                                    Hi, I'm{" "}
                                    <span className="font-semibold text-indigo-400">
                                        Waqiur
                                    </span>
                                    , a full-stack developer passionate about
                                    building high-performance web and mobile
                                    applications. I specialize in React,
                                    Next.js, Node.js, .NET, and Flutter,
                                    crafting seamless and scalable digital
                                    experiences.
                                </p>

                                <p className="leading-relaxed">
                                    With expertise in AI integration, enterprise
                                    solutions, and API development, I create
                                    intelligent applications that enhance
                                    workflows and user interactions, from
                                    real-time collaboration tools to dynamic
                                    dashboards.
                                </p>

                                <p className="leading-relaxed">
                                    Constantly exploring new technologies, I
                                    strive to push boundaries and develop
                                    efficient, future-ready solutions. Let’s
                                    build something impactful together!
                                </p>
                            </div>
                        </div>

                        <div className="md:w-1/2">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl md:text-3xl font-bold font-inter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                    Professional Journey
                                </h3>

                                {/* Scroll progress percentage */}
                                <motion.div
                                    className="text-sm font-mono bg-indigo-900/40 px-3 py-1 rounded-md border border-indigo-800/50"
                                    style={{
                                        opacity: useTransform(
                                            scrollYProgress,
                                            [0, 0.1],
                                            [0, 1]
                                        ),
                                    }}
                                >
                                    <motion.span>
                                        {useTransform(
                                            scrollYProgress,
                                            (value) =>
                                                `${Math.round(value * 100)}%`
                                        )}
                                    </motion.span>
                                </motion.div>
                            </div>

                            <div
                                ref={timelineRef}
                                className="relative pl-12 space-y-10"
                            >
                                {/* Background line (lighter, full height) */}
                                <div
                                    className="absolute top-0 bottom-0 w-1.5 bg-indigo-600/20 h-full rounded-full"
                                    style={{ left: "1.5rem" }}
                                />

                                {/* Progress indicator line that grows downward as you scroll */}
                                <motion.div className="absolute top-0 w-1.5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />

                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative ml-1"
                                        ref={(el) =>
                                            (experienceRefs.current[index] = el)
                                        }
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            once: false,
                                            margin: "-100px",
                                        }}
                                        variants={experienceVariants}
                                    >
                                        {/* Timeline dot indicator */}
                                        <motion.div
                                            className="absolute w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg z-10"
                                            variants={dotVariants}
                                            animate={
                                                activeIndex >= index
                                                    ? "active"
                                                    : "inactive"
                                            }
                                            transition={{ duration: 0.4 }}
                                            style={{
                                                left: "-2.45rem",
                                                transform: "translateX(-50%)",
                                            }}
                                        >
                                            <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                        </motion.div>

                                        <div className="mb-2 flex items-center">
                                            <motion.span
                                                className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                                                    activeIndex >= index
                                                        ? "bg-indigo-800/70 text-indigo-200 border-indigo-700"
                                                        : "bg-indigo-900/50 text-indigo-300 border-indigo-800/50"
                                                } border transition-colors duration-500`}
                                            >
                                                {exp.year}
                                            </motion.span>
                                        </div>

                                        <h4 className="text-xl font-bold text-white mb-1">
                                            {exp.title}
                                        </h4>
                                        <p className="text-purple-300 mb-2 text-lg">
                                            {exp.company}
                                        </p>
                                        {exp.description.map((desc, i) => (
                                            <div
                                                className="flex items-start gap-3 my-1"
                                                key={i}
                                            >
                                                <div className="text-blue-400 mt-1">
                                                    <svg
                                                        className="h-4 w-4"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12 2L4.5 12H9.5V22L19.5 12H14.5V2L12 2Z"
                                                            fill="currentColor"
                                                        ></path>
                                                    </svg>
                                                </div>
                                                <p className="text-gray-300">
                                                    {desc}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
