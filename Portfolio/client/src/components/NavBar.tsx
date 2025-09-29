import { useState } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { useNavigation } from "@/hooks/use-navigation";

const logo = "/assets/Logo.webp"; // Use public URL path

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [location] = useLocation();
    const { startNavigation } = useNavigation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const directScrollToSection = (sectionId: string) => {
        try {
            const element = document.getElementById(sectionId);
            if (!element) {
                return false;
            }

            try {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

                setTimeout(() => {
                    window.scrollBy({
                        top: -80,
                        behavior: "smooth",
                    });
                }, 100);

                return true;
            } catch {
                try {
                    const yOffset = -80;
                    const y =
                        element.getBoundingClientRect().top +
                        window.scrollY +
                        yOffset;

                    window.scrollTo({
                        top: y,
                        behavior: "smooth",
                    });

                    return true;
                } catch {
                    window.scrollTo(0, element.offsetTop - 80);
                    return true;
                }
            }
        } catch {
            return false;
        }
    };

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        sectionId: string
    ) => {
        e.preventDefault();

        if (location !== "/") {
            startNavigation(`/#${sectionId}`)
                .then(() => {
                    setTimeout(() => {
                        if (
                            window.scrollToSection &&
                            typeof window.scrollToSection === "function"
                        ) {
                            window.scrollToSection(sectionId);
                        } else {
                            directScrollToSection(sectionId);
                        }

                        setTimeout(() => {
                            if (window.scrollToSection) {
                                window.scrollToSection(sectionId);
                            } else {
                                directScrollToSection(sectionId);
                            }
                        }, 800);
                    }, 500);
                })
                .catch(() => {});
        } else {
            window.history.pushState({}, "", `/#${sectionId}`);

            if (
                window.scrollToSection &&
                typeof window.scrollToSection === "function"
            ) {
                window.scrollToSection(sectionId);

                setTimeout(() => {
                    if (window.scrollToSection) {
                        window.scrollToSection(sectionId);
                    } else {
                        directScrollToSection(sectionId);
                    }
                }, 200);
            } else {
                directScrollToSection(sectionId);
            }
        }

        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md transition-colors duration-300">
            <div className="container mx-auto px-6">
                <nav className="flex items-center justify-between">
                    <Link href="/" onClick={(e) => handleNavClick(e, "hero")}>
                        <div className="flex items-center">
                            <div className="relative group ml-2 md:ml-4">
                                <img
                                    src={logo}
                                    alt="WA Logo"
                                    className="w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                            </div>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <a
                            href="#about"
                            className="font-medium text-slate-200 hover:text-indigo-400 transition-colors"
                            onClick={(e) => handleNavClick(e, "about")}
                        >
                            About
                        </a>
                        <a
                            href="#projects"
                            className="font-medium text-slate-200 hover:text-blue-400 transition-colors"
                            onClick={(e) => handleNavClick(e, "projects")}
                        >
                            Projects
                        </a>
                        <a
                            href="#skills"
                            className="font-medium text-slate-200 hover:text-purple-400 transition-colors"
                            onClick={(e) => handleNavClick(e, "skills")}
                        >
                            Skills
                        </a>
                        <a
                            href="#contact"
                            className="font-medium text-slate-200 hover:text-cyan-400 transition-colors"
                            onClick={(e) => handleNavClick(e, "contact")}
                        >
                            Contact
                        </a>
                    </div>

                    <div className="flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="md:hidden p-2 rounded-full hover:bg-dark-surface transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            <MobileMenu
                isOpen={isMenuOpen}
                closeMenu={() => setIsMenuOpen(false)}
            />
        </header>
    );
};

export default NavBar;
