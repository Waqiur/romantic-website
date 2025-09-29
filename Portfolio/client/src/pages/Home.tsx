import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
    useState,
    useEffect,
    useRef,
    Suspense,
    lazy,
    useMemo,
    useCallback,
} from "react";

// Declare the window interface to include scrollToSection
declare global {
    interface Window {
        scrollToSection?: (sectionId: string) => void;
    }
}

// Lazy loaded components
const HeroSection = lazy(() => import("@/components/HeroSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const StarBackground = lazy(() => import("@/components/StarBackground"));

const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

// Enhanced scroll function with multiple approaches
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
        return;
    }
    try {
        const yOffset = -80; // Navbar height adjustment
        const y =
            element.getBoundingClientRect().top + window.scrollY + yOffset;
        element.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setTimeout(() => {
            window.scrollBy({
                top: yOffset,
                behavior: "smooth",
            });
        }, 100);
        setTimeout(() => {
            window.scrollTo({
                top: y,
                behavior: "smooth",
            });
        }, 200);
    } catch {
        try {
            const yOffset = -80;
            const y =
                element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo(0, y);
        } catch {
            // Handle fallback error
        }
    }
};

const Home = () => {
    const [activeSection, setActiveSection] = useState("hero");
    const mainRef = useRef<HTMLElement>(null);
    const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());

    // Expose the scrollToSection function globally
    useEffect(() => {
        // Make the scrollToSection function globally available
        window.scrollToSection = scrollToSection;

        return () => {
            // Clean up when component unmounts
            delete window.scrollToSection;
        };
    }, []);

    // On mount, store references to all sections
    useEffect(() => {
        // Cache section references
        if (mainRef.current) {
            const sectionElements = Array.from(
                mainRef.current.children
            ) as HTMLElement[];
            sectionElements.forEach((section) => {
                const id = section.getAttribute("id");
                if (id) {
                    sectionsRef.current.set(id, section);
                }
            });
        }

        // Initialize section scrolling for hash in URL, if any
        const hash = window.location.hash;
        if (hash && hash.length > 1) {
            const sectionId = hash.substring(1);
            // Delay to ensure component is fully mounted
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 500);
        }
    }, []);

    // Memoized scroll handler to detect active section
    const handleScroll = useCallback(() => {
        if (!mainRef.current) return;

        const sectionElements = Array.from(mainRef.current.children);
        const currentPosition = window.scrollY + window.innerHeight / 3;

        for (const section of sectionElements) {
            const sectionTop =
                section.getBoundingClientRect().top + window.scrollY;
            const sectionBottom =
                sectionTop + section.getBoundingClientRect().height;

            if (
                currentPosition >= sectionTop &&
                currentPosition < sectionBottom
            ) {
                const id = section.getAttribute("id");
                if (id && id !== activeSection) {
                    setActiveSection(id);
                }
                break;
            }
        }
    }, [activeSection]);

    // Handle scroll and update active section
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Memoized link click handler for smooth scrolling
    const handleLinkClick = useCallback((event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest("a");

        if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
            const targetId = anchor.getAttribute("href");
            if (targetId === "#") return;

            const sectionId = targetId!.substring(1);
            event.preventDefault();
            scrollToSection(sectionId);
        }
    }, []);

    // Setup smooth scrolling for any remaining links not handled by direct event handlers
    useEffect(() => {
        document.addEventListener("click", handleLinkClick);
        return () => document.removeEventListener("click", handleLinkClick);
    }, [handleLinkClick]);

    // Section loading fallback component - memoized to prevent re-creation on each render
    const SectionLoadingFallback = useMemo(() => {
        // Return a component factory function that takes props
        return ({ height = "min-h-screen" }: { height?: string }) => (
            <div
                className={`${height} w-full flex items-center justify-center bg-black/80`}
            >
                <div className="w-16 h-1 bg-indigo-500/30 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-loadingBar"></div>
                </div>
            </div>
        );
    }, []);

    return (
        <div className="font-roboto bg-dark-bg text-dark-text transition-colors duration-300">
            <NavBar />

            <main ref={mainRef} className="flex flex-col">
                <section id="hero" className="hero-section">
                    <Suspense fallback={<SectionLoadingFallback />}>
                        <StarBackground
                            count={150}
                            speed={0.7}
                            showShootingStars={true}
                            maxSize={3}
                        />
                        <HeroSection />
                    </Suspense>
                </section>

                <section
                    id="about"
                    className="bg-gradient-to-br from-slate-900 to-indigo-950"
                >
                    <Suspense fallback={<SectionLoadingFallback />}>
                        <AboutSection />
                    </Suspense>
                </section>

                <section
                    id="projects"
                    className="bg-gradient-to-br from-indigo-950 to-slate-900"
                >
                    <Suspense fallback={<SectionLoadingFallback />}>
                        <ProjectsSection />
                    </Suspense>
                </section>

                <section
                    id="skills"
                    className="bg-gradient-to-br from-slate-900 to-purple-950"
                >
                    <Suspense fallback={<SectionLoadingFallback />}>
                        <SkillsSection />
                    </Suspense>
                </section>

                <section
                    id="contact"
                    className="bg-gradient-to-br from-purple-950 to-slate-900"
                >
                    <Suspense fallback={<SectionLoadingFallback />}>
                        <ContactSection />
                    </Suspense>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Home;
