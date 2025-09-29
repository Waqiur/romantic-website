import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import {
    programmingSkills,
    frameworkSkills,
    toolSkills,
} from "../lib/data.tsx";
import * as SiIcons from "react-icons/si";

interface Skill {
    name: string;
    icon: string;
    color: string;
    textColor: string;
    bgColor: string;
}

// Function to dynamically get icon component from string name
const getIconComponent = (iconName: string) => {
    // @ts-ignore - Accessing dynamically from SiIcons
    const IconComponent = SiIcons[iconName];
    if (IconComponent) {
        return <IconComponent size={22} />;
    }
    return null;
};

// Memoized SkillBadge component to prevent unnecessary re-renders
const SkillBadge = memo(
    ({ skill, index = 0 }: { skill: Skill; index?: number }) => {
        // Memoize icon component to prevent re-generation on each render
        const iconComponent = useMemo(
            () => getIconComponent(skill.icon),
            [skill.icon]
        );

        return (
            <motion.div
                className={`${skill.bgColor} p-3 rounded-lg group relative overflow-hidden transition-all duration-300 hover:shadow-lg h-20`}
                whileHover={{
                    y: -5,
                    scale: 1.03,
                    transition: { duration: 0.2 },
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                    duration: 0.3,
                    delay: index * 0.05, // staggered animation based on index
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                {/* Background gradient on hover */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    {/* Icon */}
                    <div
                        className={`${skill.textColor} group-hover:text-white transition-colors duration-300 mb-2`}
                    >
                        {iconComponent}
                    </div>

                    {/* Name */}
                    <span
                        className={`text-gray-200 group-hover:text-white font-medium text-xs sm:text-sm text-center transition-colors duration-300 w-full line-clamp-2`}
                    >
                        {skill.name}
                    </span>
                </div>
            </motion.div>
        );
    }
);

const SkillsSection = () => {
    // Section Header
    const SectionHeader = useMemo(
        () => (
            <motion.div
                className="text-center max-w-3xl mx-auto mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold font-inter mb-6 bg-gradient-to-r from-purple-400 to-blue-300 bg-clip-text text-transparent">
                    Technical Skills
                </h2>
                <p className="text-gray-300 text-lg">
                    My expertise spans across multiple technologies, programming
                    languages, and tools.
                </p>
            </motion.div>
        ),
        []
    );

    // Programming Languages Header
    const ProgrammingHeader = useMemo(
        () => (
            <motion.h3
                className="text-2xl md:text-3xl font-bold mb-8 font-inter text-center bg-gradient-to-r from-red-400 to-amber-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                }}
            >
                Programming Languages
            </motion.h3>
        ),
        []
    );

    // Frameworks Header
    const FrameworksHeader = useMemo(
        () => (
            <motion.h3
                className="text-2xl md:text-3xl font-bold mb-8 font-inter text-center bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                }}
            >
                Frameworks & Libraries
            </motion.h3>
        ),
        []
    );

    // Tools Header
    const ToolsHeader = useMemo(
        () => (
            <motion.h3
                className="text-2xl md:text-3xl font-bold mb-8 font-inter text-center bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                }}
            >
                Tools & Technologies
            </motion.h3>
        ),
        []
    );

    // Programming Skills Grid
    const ProgrammingSkillsGrid = useMemo(
        () => (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {programmingSkills.map((skill, index) => (
                    <div key={skill.name} className="p-1.5">
                        <SkillBadge skill={skill} index={index} />
                    </div>
                ))}
            </div>
        ),
        []
    );

    // Framework Skills Grid
    const FrameworkSkillsGrid = useMemo(
        () => (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {frameworkSkills.map((skill, index) => (
                    <div key={skill.name} className="p-1.5">
                        <SkillBadge skill={skill} index={index} />
                    </div>
                ))}
            </div>
        ),
        []
    );

    // Tool Skills Grid
    const ToolSkillsGrid = useMemo(
        () => (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                {toolSkills.map((skill, index) => (
                    <div key={skill.name} className="p-1.5">
                        <SkillBadge skill={skill} index={index} />
                    </div>
                ))}
            </div>
        ),
        []
    );

    return (
        <div className="min-h-screen flex flex-col justify-start relative overflow-hidden transition-colors duration-300 pt-10 pb-20">
            {/* Background gradients */}
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-bl from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 pt-24 relative z-10 w-full">
                {SectionHeader}

                {/* Programming Languages */}
                <div className="mb-16">
                    {ProgrammingHeader}
                    <div className="max-w-6xl mx-auto">
                        {ProgrammingSkillsGrid}
                    </div>
                </div>

                {/* Frameworks & Libraries */}
                <div className="mb-16">
                    {FrameworksHeader}
                    <div className="max-w-6xl mx-auto">
                        {FrameworkSkillsGrid}
                    </div>
                </div>

                {/* Tools & Technologies */}
                <div className="mb-12">
                    {ToolsHeader}
                    <div className="max-w-6xl mx-auto">{ToolSkillsGrid}</div>
                </div>
            </div>
        </div>
    );
};

export default SkillsSection;
