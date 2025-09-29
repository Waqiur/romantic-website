import { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { webProjects, technologyIcons } from "../lib/data.tsx";
import NavBar from "../components/NavBar";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";
import * as SiIcons from "react-icons/si";

// Helper function to get icon for a technology
const getTechIcon = (techName: string) => {
    // Normalize the input
    const normalizedTechName = techName.toLowerCase();

    // Check for exact match
    if (normalizedTechName in technologyIcons) {
        // @ts-ignore - Accessing dynamically from SiIcons
        const IconComponent = SiIcons[technologyIcons[normalizedTechName]];
        if (IconComponent) {
            return <IconComponent className="h-5 w-5" />;
        }
    }

    // Check for partial match
    for (const [key, iconName] of Object.entries(technologyIcons)) {
        if (normalizedTechName.includes(key)) {
            // @ts-ignore - Accessing dynamically from SiIcons
            const IconComponent = SiIcons[iconName];
            if (IconComponent) {
                return <IconComponent className="h-5 w-5" />;
            }
        }
    }

    // No match found - return default code icon
    return (
        <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
        </svg>
    );
};

const WebProjectDetail = () => {
    const params = useParams<{ id: string }>();
    const projectId = params.id ? parseInt(params.id, 10) : 0;

    const project = webProjects.find((p) => p.id === projectId);

    useEffect(() => {
        // Set up carousel functionality with a truly circular motion
        const setupCarousel = () => {
            const carousel = document.querySelector(
                ".carousel-inner"
            ) as HTMLElement;
            const itemsNodeList = document.querySelectorAll(".carousel-item");
            const prevBtn = document.querySelector(".carousel-prev-btn");
            const nextBtn = document.querySelector(".carousel-next-btn");
            const indicatorsContainer = document.querySelector(
                ".carousel-indicators"
            );

            if (
                !carousel ||
                !prevBtn ||
                !nextBtn ||
                itemsNodeList.length === 0 ||
                !indicatorsContainer
            )
                return;

            const items = Array.from(itemsNodeList);
            console.log(items);
            const totalItems = items.length;

            // Setup CSS for smooth transitions
            carousel.style.transition = "transform 0.5s ease-in-out";

            // Remove any existing clones first to prevent duplicates
            document
                .querySelectorAll(".carousel-item.clone")
                .forEach((el) => el.remove());

            // Clone first and last items to create the circular effect
            if (totalItems > 1) {
                // Clone first and last items
                const firstItemClone = items[0].cloneNode(true) as HTMLElement;
                const lastItemClone = items[totalItems - 1].cloneNode(
                    true
                ) as HTMLElement;

                // Add class to identify clones
                firstItemClone.classList.add("clone");
                lastItemClone.classList.add("clone");

                // Append clones to create circular effect
                carousel.appendChild(firstItemClone);
                carousel.insertBefore(lastItemClone, carousel.firstChild);
            }

            // Clear existing indicators
            while (indicatorsContainer.firstChild) {
                indicatorsContainer.removeChild(indicatorsContainer.firstChild);
            }

            // Create new indicators based on original items (not clones)
            for (let i = 0; i < totalItems; i++) {
                const indicator = document.createElement("span");
                indicator.className = `carousel-indicator h-2 w-2 ${
                    i === 0 ? "bg-indigo-500 w-3" : "bg-indigo-400 w-2"
                } rounded-full shadow-lg cursor-pointer transition-all duration-300`;
                indicator.dataset.index = i.toString();
                indicatorsContainer.appendChild(indicator);
            }

            // Get the newly created indicators
            const indicators = document.querySelectorAll(".carousel-indicator");

            // Initialize state - start at position 1 (after the cloned last slide)
            let current = 1; // Position 1 is the first real slide
            let activeIndex = 0; // This is the active indicator (shows 0-based index)
            let isTransitioning = false;

            // Move to position 1 (first real slide) initially without transition
            carousel.style.transition = "none";
            carousel.style.transform = `translateX(-${current * 100}%)`;
            // Force reflow to ensure the "none" transition is applied
            carousel.offsetHeight;
            // Re-enable transitions
            setTimeout(() => {
                carousel.style.transition = "transform 0.5s ease-in-out";
            }, 10);

            // Update the indicators to show active slide
            // Update the indicators to show active slide
            function updateIndicators() {
                indicators.forEach((indicator, index) => {
                    if (index === activeIndex) {
                        indicator.classList.remove("bg-indigo-400");
                        indicator.classList.add("bg-indigo-500");
                        indicator.classList.remove("w-2");
                        indicator.classList.add("w-3");
                    } else {
                        indicator.classList.remove("bg-indigo-500");
                        indicator.classList.add("bg-indigo-400");
                        indicator.classList.add("w-2");
                        indicator.classList.remove("w-3");
                    }
                });
            }

            // Handle transition end event to create circular effect
            function handleTransitionEnd() {
                // If we're at a clone, jump to the corresponding real slide without animation
                if (current === 0) {
                    // We're at the clone of the last slide
                    carousel.style.transition = "none";
                    current = totalItems; // Position at the real last slide
                    carousel.style.transform = `translateX(-${current * 100}%)`;
                    activeIndex = totalItems - 1;
                } else if (current === totalItems + 1) {
                    // We're at the clone of the first slide
                    carousel.style.transition = "none";
                    current = 1; // Position at the real first slide
                    carousel.style.transform = `translateX(-${current * 100}%)`;
                    activeIndex = 0;
                }

                // Force browser reflow to make sure transition: none is respected
                carousel.offsetHeight;

                // Re-enable transitions after a brief delay
                setTimeout(() => {
                    carousel.style.transition = "transform 0.5s ease-in-out";
                    isTransitioning = false;
                }, 10);
            }

            // Clear any existing event listeners
            const newPrevBtn = prevBtn.cloneNode(true);
            const newNextBtn = nextBtn.cloneNode(true);
            prevBtn.parentNode?.replaceChild(newPrevBtn, prevBtn);
            nextBtn.parentNode?.replaceChild(newNextBtn, nextBtn);

            // Remove existing transitionend listeners
            carousel.removeEventListener("transitionend", handleTransitionEnd);
            // Add fresh transitionend listener
            carousel.addEventListener("transitionend", handleTransitionEnd);

            // Add event listeners to navigation buttons
            newPrevBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (isTransitioning) return;
                isTransitioning = true;

                current--;
                activeIndex = (activeIndex - 1 + totalItems) % totalItems;

                carousel.style.transform = `translateX(-${current * 100}%)`;
                updateIndicators();
            });

            newNextBtn.addEventListener("click", (e) => {
                e.preventDefault();
                if (isTransitioning) return;
                isTransitioning = true;

                current++;
                activeIndex = (activeIndex + 1) % totalItems;

                carousel.style.transform = `translateX(-${current * 100}%)`;
                updateIndicators();
            });

            // Set up indicator clicks
            indicators.forEach((indicator, index) => {
                indicator.addEventListener("click", () => {
                    if (isTransitioning || activeIndex === index) return;
                    isTransitioning = true;

                    // Calculate direction to determine whether to go left or right
                    const diff = index - activeIndex;
                    const direction =
                        Math.abs(diff) > totalItems / 2
                            ? -Math.sign(diff)
                            : Math.sign(diff);

                    // Update position
                    activeIndex = index;
                    current = index + 1; // +1 because we have a clone at the beginning

                    carousel.style.transform = `translateX(-${current * 100}%)`;
                    updateIndicators();
                });
            });

            // Auto-advance carousel every 5 seconds
            const autoAdvance = setInterval(() => {
                if (!isTransitioning) {
                    isTransitioning = true;
                    current++;
                    activeIndex = (activeIndex + 1) % totalItems;

                    carousel.style.transform = `translateX(-${current * 100}%)`;
                    updateIndicators();
                }
            }, 5000);

            // Stop auto-advance when user interacts
            newPrevBtn.addEventListener("mouseenter", () =>
                clearInterval(autoAdvance)
            );
            newNextBtn.addEventListener("mouseenter", () =>
                clearInterval(autoAdvance)
            );
            indicators.forEach((indicator) => {
                indicator.addEventListener("mouseenter", () =>
                    clearInterval(autoAdvance)
                );
            });

            // Clean up interval and event listeners when component unmounts
            return () => {
                clearInterval(autoAdvance);
                carousel.removeEventListener(
                    "transitionend",
                    handleTransitionEnd
                );
            };
        };

        // Run carousel setup after component mounts and whenever project changes
        const carouselSetup = setTimeout(setupCarousel, 300);
        return () => clearTimeout(carouselSetup);
    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen bg-black">
                <NavBar />
                <div className="container mx-auto px-6 pt-32">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-6">
                            Project Not Found
                        </h1>
                        <p className="text-gray-300 mb-8">
                            Sorry, the project you're looking for doesn't exist.
                        </p>
                        <Link
                            href="/web-projects"
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Back to Projects
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <NavBar />
            <div className="container mx-auto px-8 relative z-10 pt-28">
                {/* Navigation back */}
                <div className="mb-10 mt-2 ml-6">
                    <Link
                        href="/web-projects"
                        className="inline-flex items-center gap-2 text-indigo-300 hover:text-white transition-all text-lg"
                    >
                        <FaArrowLeft className="h-4 w-4" />
                        <span>Back to Web Projects</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Project Images - Left Column with Carousel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative overflow-hidden rounded-2xl bg-indigo-950/30 border border-indigo-900/50 shadow-xl h-[500px]"
                        style={{
                            boxShadow: "0 0 15px 5px rgba(99, 102, 241, 0.5)",
                        }}
                    >
                        {/* Gradient Background Elements */}
                        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-800/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-800/10 rounded-full blur-3xl"></div>

                        <div className="carousel relative w-full h-full overflow-hidden">
                            <div
                                className="carousel-inner flex w-full h-full transition-transform duration-700 ease-in-out"
                                style={{ transform: "translateX(0%)" }}
                            >
                                {project.carouselImages.map((image, index) => (
                                    <div
                                        key={index}
                                        className="carousel-item relative w-full h-full flex-shrink-0 p-1"
                                    >
                                        <div className="w-full h-full overflow-hidden rounded-lg">
                                            <img
                                                src={image}
                                                alt={`${
                                                    project.title
                                                } - screenshot ${index + 1}`}
                                                className="w-full h-full object-cover object-center"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Carousel Controls */}
                            <button className="carousel-prev-btn absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 transition-all z-10">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M19 12H5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 19L5 12L12 5"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            <button className="carousel-next-btn absolute right-6 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-400 transition-all z-10">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <path
                                        d="M5 12H19"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 5L19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {/* Carousel Indicators - Container only, indicators created in JS */}
                            <div className="carousel-indicators absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-10">
                                {/* Indicators will be dynamically created in JavaScript */}
                            </div>
                        </div>
                    </motion.div>

                    {/* Project Details - Right Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col px-4"
                    >
                        <h2 className="text-3xl font-bold mb-4 text-indigo-300">
                            {project.title}
                        </h2>

                        <p className="text-gray-300 mb-8 leading-relaxed">
                            {project.description}
                        </p>

                        {/* Key Features with Bullet Points */}
                        <div className="space-y-3 mb-8">
                            <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Key Features
                            </h3>

                            {project.keyFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
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
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-300">{feature}</p>
                                </div>
                            ))}
                        </div>

                        {/* Technology Stack with Icons */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                                Built with
                            </h3>

                            <div className="flex flex-wrap gap-3 mb-6">
                                {project.technologies.map((tech, index) => {
                                    // Get icon using our helper function
                                    const techIcon = getTechIcon(tech);

                                    // Set default colors based on tech category
                                    let bgColor = "bg-blue-800";
                                    let textColor = "text-blue-100";

                                    return (
                                        <motion.div
                                            key={tech}
                                            className={`${bgColor} px-3 py-2 rounded-lg relative overflow-hidden transition-all duration-300 hover:shadow-lg group`}
                                            whileHover={{
                                                y: -3,
                                                scale: 1.05,
                                                transition: { duration: 0.2 },
                                            }}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: index * 0.05,
                                            }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div
                                                className={`flex items-center gap-2 ${textColor} relative z-10`}
                                            >
                                                {techIcon}
                                                <span className="text-xs font-medium">
                                                    {tech}
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Project Links */}
                            <div className="flex flex-wrap items-center gap-4 mt-8">
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-colors"
                                >
                                    <FaExternalLinkAlt className="h-4 w-4" />
                                    <span>View Live</span>
                                </a>

                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition-colors"
                                    >
                                        <FaGithub className="h-5 w-5" />
                                        <span>View Code</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WebProjectDetail;
