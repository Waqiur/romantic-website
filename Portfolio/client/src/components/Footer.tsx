import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative pt-16 pb-12 overflow-hidden">
            {/* Background gradient elements */}
            <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-indigo-600/5 rounded-full blur-3xl transform -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-purple-600/5 rounded-full blur-3xl transform translate-x-1/2"></div>

            {/* Actual footer content */}
            <div className="container mx-auto px-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Navigation Links */}
                    <div className="justify-items-center">
                        <div className="col-span-1 md:col-span-1 lg:col-span-1">
                            <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
                                Quick Links
                            </h3>
                            <ul className="space-y-2 text-center md:text-left">
                                <li>
                                    <a
                                        href="#hero"
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#about"
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                                    >
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#projects"
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                                    >
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#skills"
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                                    >
                                        Skills
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                                    >
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Projects Links */}
                    <div className="justify-items-center">
                        <div className="col-span-1 md:col-span-1 lg:col-span-1">
                            <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
                                Projects
                            </h3>
                            <ul className="space-y-2 text-center md:text-left">
                                <li>
                                    <a
                                        href="/web-projects"
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                                    >
                                        Web Development
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/app-projects"
                                        className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                                    >
                                        App Development
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1 justify-items-center">
                        <h3 className="text-xl font-semibold text-white mb-4 text-center md:text-left">
                            Connect
                        </h3>
                        <div className="flex justify-center md:justify-start space-x-4 mb-4">
                            <a
                                href="https://github.com/Waqiur"
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center border border-indigo-800/30 hover:bg-indigo-700/40 hover:border-indigo-600/40 transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-indigo-300"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/waqiuransari/"
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center border border-indigo-800/30 hover:bg-indigo-700/40 hover:border-indigo-600/40 transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-indigo-300"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a
                                href="https://leetcode.com/u/waqiur/"
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center border border-indigo-800/30 hover:bg-indigo-700/40 hover:border-indigo-600/40 transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="h-5 w-5 text-indigo-300"
                                    id="leetcode"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"
                                    ></path>
                                    <path
                                        fill="currentColor"
                                        d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"
                                    ></path>
                                </svg>
                            </a>
                            <a
                                href="#contact"
                                className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center border border-indigo-800/30 hover:bg-indigo-700/40 hover:border-indigo-600/40 transition-all duration-300"
                                aria-label="Email"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-indigo-300"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-10 pt-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-800/30 to-transparent"></div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>
                        &copy; {currentYear} Waqiur Ansari. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
