import { motion } from "framer-motion";
import { webProjects, technologyIcons } from "../lib/data.tsx";
import { Link, useLocation } from "wouter";
import NavBar from "../components/NavBar";
import { FaArrowLeft } from "react-icons/fa";
import { useState, useEffect, Suspense, lazy } from "react";
import { useNavigation } from "../hooks/use-navigation";
import * as SiIcons from "react-icons/si";

// Lazy loaded component
const LoadingScreen3D = lazy(() => import("../components/LoadingScreen3D"));

interface Project {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    demoUrl: string;
    githubUrl?: string;
}

// Helper function to get technology icons
const getTechIcon = (techName: string) => {
    // Normalize the input
    const normalizedTechName = techName.toLowerCase();

    // Check for exact match
    if (normalizedTechName in technologyIcons) {
        // @ts-ignore - Accessing dynamically from SiIcons
        const IconComponent = SiIcons[technologyIcons[normalizedTechName]];
        if (IconComponent) {
            return <IconComponent className="h-3.5 w-3.5 mr-1" />;
        }
    }

    // Check for partial match
    for (const [key, iconName] of Object.entries(technologyIcons)) {
        if (normalizedTechName.includes(key)) {
            // @ts-ignore - Accessing dynamically from SiIcons
            const IconComponent = SiIcons[iconName];
            if (IconComponent) {
                return <IconComponent className="h-3.5 w-3.5 mr-1" />;
            }
        }
    }

    // Default icon if no match found
    return (
        <svg
            className="h-3.5 w-3.5 mr-1"
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

const WebProjects = () => {
    const [, setLocation] = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (in production, this would be based on actual data loading)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    const { startNavigation } = useNavigation();

    const handleProjectClick = (projectId: number) => {
        startNavigation(`/web-project/${projectId}`);
    };

    // Loading fallback component
    const SimpleLoadingFallback = () => (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center animate-fadeIn">
            <div className="w-20 h-1 bg-blue-500/30 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 animate-loadingBar"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">
            <Suspense fallback={<SimpleLoadingFallback />}>
                <LoadingScreen3D isLoading={isLoading} />
            </Suspense>
            <NavBar />
            <div className="container mx-auto px-6 relative z-10 pt-28 pb-20">
                {/* Navigation back */}
                <div className="mb-10 mt-2 ml-6">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-all text-lg"
                    >
                        <FaArrowLeft className="h-4 w-4" />
                        <span>Back to Home</span>
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl font-bold font-inter mb-6 bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent">
                        Web Development Projects
                    </h1>
                    <p className="text-gray-300 max-w-3xl mx-auto">
                        Explore my web development projects featuring responsive
                        design, interactive animations, and immersive 3D
                        elements.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {webProjects.map((project: Project, index: number) => (
                        <motion.div
                            key={project.id}
                            className="card-3d rounded-xl overflow-hidden bg-black/40 shadow-xl backdrop-blur-sm border border-indigo-900/60 cursor-pointer transition-all hover:scale-105 hover:shadow-indigo-500/20 hover:border-indigo-800/60"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onClick={() => handleProjectClick(project.id)}
                            whileHover={{ y: -5 }}
                        >
                            <div className="card-inner relative flex flex-col h-full">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/20 to-blue-800/10 z-0"></div>
                                <div className="relative h-56 z-10">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end">
                                        <div className="p-5 text-white">
                                            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-300 to-blue-200 bg-clip-text text-transparent">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-gray-300 mt-1">
                                                {project.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 relative z-10 flex-1 flex flex-col">
                                    <p className="text-gray-300 mb-6 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map(
                                            (tech: string) => (
                                                <span
                                                    key={tech}
                                                    className="inline-flex items-center px-3 py-1 bg-indigo-800/30 text-indigo-200 rounded-full text-xs font-medium border border-indigo-700/30"
                                                >
                                                    {getTechIcon(tech)}
                                                    {tech}
                                                </span>
                                            )
                                        )}
                                    </div>

                                    <div className="mt-auto flex justify-between items-center">
                                        <div className="text-indigo-300 text-sm">
                                            View details &rarr;
                                        </div>
                                        <div className="flex space-x-1">
                                            {project.technologies
                                                .slice(0, 3)
                                                .map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="h-6 w-6 rounded-full bg-indigo-900/60 flex items-center justify-center text-indigo-200"
                                                    >
                                                        {getTechIcon(tech)}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WebProjects;
