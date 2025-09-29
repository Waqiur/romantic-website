import { FC } from "react";
import { useLocation } from "wouter";
import { useNavigation } from "@/hooks/use-navigation";

interface MobileMenuProps {
    isOpen: boolean;
    closeMenu: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, closeMenu }) => {
    const [location] = useLocation();
    const { startNavigation } = useNavigation();

    const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        if (href && href.startsWith("#")) {
            const targetId = href.substring(1);

            // Close the mobile menu first
            closeMenu();

            // Helper function to scroll to specific section - simplified for better accuracy
            const scrollToSection = () => {
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const yOffset = -80; // Navbar height adjustment
                    const y =
                        targetElement.getBoundingClientRect().top +
                        window.scrollY +
                        yOffset;

                    window.scrollTo({
                        top: y,
                        behavior: "smooth",
                    });
                    return true;
                } else {
                    return false;
                }
            };

            // If we're not on the home page, navigate to the home page first
            if (location !== "/") {
                try {
                    // Use await to ensure navigation completes before scrolling
                    await startNavigation("/");

                    // Wait for DOM to be ready after navigation
                    setTimeout(() => {
                        scrollToSection();

                        // Try again after a bit longer
                        setTimeout(() => {
                            scrollToSection();
                        }, 500);
                    }, 300);
                } catch (error) {
                    // Handle navigation error
                }
            } else {
                // If already on home page, just scroll directly
                scrollToSection();
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="md:hidden">
            <div className="px-6 py-5 border-t border-gray-700 bg-gradient-to-b from-slate-800 to-slate-900">
                <div className="flex flex-col space-y-5">
                    <a
                        href="#about"
                        className="font-medium py-3 px-4 rounded-md hover:bg-indigo-900/30 text-slate-200 hover:text-indigo-400 transition-colors"
                        onClick={handleLinkClick}
                    >
                        <span className="inline-flex items-center">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                            About
                        </span>
                    </a>
                    <a
                        href="#projects"
                        className="font-medium py-3 px-4 rounded-md hover:bg-blue-900/30 text-slate-200 hover:text-blue-400 transition-colors"
                        onClick={handleLinkClick}
                    >
                        <span className="inline-flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                            Projects
                        </span>
                    </a>
                    <a
                        href="#skills"
                        className="font-medium py-3 px-4 rounded-md hover:bg-purple-900/30 text-slate-200 hover:text-purple-400 transition-colors"
                        onClick={handleLinkClick}
                    >
                        <span className="inline-flex items-center">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                            Skills
                        </span>
                    </a>
                    <a
                        href="#contact"
                        className="font-medium py-3 px-4 rounded-md hover:bg-cyan-900/30 text-slate-200 hover:text-cyan-400 transition-colors"
                        onClick={handleLinkClick}
                    >
                        <span className="inline-flex items-center">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                            Contact
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
