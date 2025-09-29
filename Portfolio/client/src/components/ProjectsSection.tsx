import { motion } from "framer-motion";
import { useNavigation } from "@/hooks/use-navigation";

interface ProjectCardProps {
    title: string;
    description: string;
    gradient: string;
    textGradient: string;
    path: string;
    icon: React.ReactNode;
}

const ProjectCard = ({
    title,
    description,
    gradient,
    textGradient,
    path,
    icon,
}: ProjectCardProps) => {
    const { startNavigation } = useNavigation();

    return (
        <motion.div
            className={`rounded-xl overflow-hidden ${gradient} p-0.5 shadow-xl transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-slate-900 rounded-[0.7rem] p-8 h-full flex flex-col relative overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>

                <div className="mb-6 text-5xl relative">{icon}</div>

                <h3
                    className={`text-2xl md:text-3xl font-bold mb-4 ${textGradient} bg-clip-text text-transparent relative`}
                >
                    {title}
                </h3>

                <p className="text-gray-300 mb-8 flex-grow text-lg leading-relaxed relative">
                    {description}
                </p>

                <button
                    className="inline-flex items-center gap-2 text-gray-200 hover:text-white transition-colors mt-auto cursor-pointer relative bg-white/5 hover:bg-white/10 px-5 py-3 rounded-lg group w-fit"
                    onClick={() => startNavigation(path)}
                >
                    <span className="text-lg">View Projects</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transform transition-transform group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

const ProjectsSection = () => {
    return (
        <div className=" min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-gradient-to-br from-blue-500/10 to-purple-500/20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-2/3 h-1/3 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-tr from-purple-500/20 to-pink-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-bl from-cyan-500/10 to-blue-500/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10 py-24">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent pb-1 leading-tight">
                        Project Categories
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                        Explore my projects across different development
                        domains, from web applications to mobile experiences.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <ProjectCard
                        title="Web Development"
                        description="Creating responsive, interactive web applications with modern frameworks, real-time features, and clean design."
                        gradient="bg-gradient-to-br from-indigo-500/50 to-blue-500/50"
                        textGradient="bg-gradient-to-r from-indigo-300 to-blue-300"
                        path="/web-projects"
                        icon={
                            <div className="w-16 h-16 rounded-full bg-indigo-950/50 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-indigo-400"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        width="18"
                                        height="18"
                                        x="3"
                                        y="3"
                                        rx="2"
                                        ry="2"
                                    ></rect>
                                    <line x1="3" x2="21" y1="9" y2="9"></line>
                                    <line x1="9" x2="9" y1="21" y2="9"></line>
                                </svg>
                            </div>
                        }
                    />

                    <ProjectCard
                        title="App Development"
                        description="​Cross-platform mobile applications and interactive tools designed to deliver seamless user experiences across various devices and operating systems."
                        gradient="bg-gradient-to-br from-purple-500/50 to-pink-500/50"
                        textGradient="bg-gradient-to-r from-purple-300 to-pink-300"
                        path="/app-projects"
                        icon={
                            <div className="w-16 h-16 rounded-full bg-purple-950/50 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-purple-400"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect
                                        width="14"
                                        height="20"
                                        x="5"
                                        y="2"
                                        rx="2"
                                        ry="2"
                                    ></rect>
                                    <line
                                        x1="12"
                                        x2="12.01"
                                        y1="18"
                                        y2="18"
                                    ></line>
                                </svg>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectsSection;
