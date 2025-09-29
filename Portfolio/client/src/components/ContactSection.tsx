import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);

        try {
            const result = await emailjs.send(
                "service_q6t0e56",
                "template_qbeulrn",
                {
                    from_name: data.name,
                    from_email: data.email,
                    subject: data.subject,
                    message: data.message,
                },
                "tgCX_F43lbkiDpRKA"
            );

            if (result.text === "OK") {
                toast({
                    title: "Message sent!",
                    description:
                        "Thank you for your message. I'll get back to you soon.",
                });
                form.reset();
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            toast({
                title: "Error sending message",
                description:
                    "There was a problem sending your message. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center py-12 lg:py-0 bg-gradient-to-br from-blue-950 via-black to-indigo-950 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-6 pt-24 relative z-10">
                <motion.div
                    className="text-center max-w-3xl mx-auto mb-8 lg:mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-inter mb-4 lg:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Get In Touch
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                        Interested in working together or have a project in
                        mind? I'd love to hear from you!
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                        <motion.div
                            className="lg:col-span-2 flex flex-col justify-center"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="space-y-6 lg:space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold mb-3 lg:mb-4 font-inter bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                        Contact Information
                                    </h3>
                                    <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                                        Feel free to reach out through the form
                                        or via the contact details below.
                                    </p>
                                </div>

                                <div className="space-y-4 lg:space-y-5">
                                    <div className="flex items-start space-x-4 group">
                                        <div className="p-2 lg:p-3 bg-blue-900/30 rounded-full text-blue-400 mt-1 group-hover:bg-blue-900/50 transition-colors">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 lg:h-6 lg:w-6"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-300 text-base lg:text-lg mb-1">
                                                Email
                                            </h4>
                                            <a
                                                href="mailto:waqiur.ansari@example.com"
                                                className="text-gray-300 hover:text-blue-400 transition-colors text-base lg:text-lg"
                                            >
                                                waqiuransari@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4 group">
                                        <div className="p-2 lg:p-3 bg-blue-900/30 rounded-full text-blue-400 mt-1 group-hover:bg-blue-900/50 transition-colors">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 lg:h-6 lg:w-6"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-300 text-base lg:text-lg mb-1">
                                                Location
                                            </h4>
                                            <p className="text-gray-300 text-base lg:text-lg">
                                                Mumbai, IN
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-3 lg:mb-4 font-inter bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Connect With Me
                                    </h3>
                                    <div className="flex space-x-4">
                                        <a
                                            href="https://github.com/Waqiur"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 lg:p-3 bg-gray-800/80 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110"
                                            aria-label="Github"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 lg:h-7 lg:w-7"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://www.linkedin.com/in/waqiuransari/"
                                            target="_blank"
                                            className="p-2 lg:p-3 bg-gray-800/80 rounded-lg text-gray-300 hover:text-blue-500 hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110"
                                            aria-label="LinkedIn"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 lg:h-7 lg:w-7"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                        <a
                                            href="https://leetcode.com/u/waqiur/"
                                            target="_blank"
                                            className="p-2 lg:p-3 bg-gray-800/80 rounded-lg text-gray-300 hover:text-blue-400 hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-110"
                                            aria-label="Leetcode"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                className="h-6 w-6 lg:h-7 lg:w-7"
                                                id="leetcode"
                                            >
                                                <path
                                                    fill="#B3B1B0"
                                                    d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"
                                                ></path>
                                                <path
                                                    fill="#E7A41F"
                                                    d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"
                                                ></path>
                                                <path
                                                    fill="#ffffff"
                                                    d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"
                                                ></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="lg:col-span-3"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="card-3d rounded-xl shadow-xl p-6 lg:p-8 backdrop-blur-sm border border-gray-700/50 bg-black/30 relative overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10"></div>
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                                <div className="relative z-10">
                                    <h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 font-inter bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        Send Me a Message
                                    </h3>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-4 lg:space-y-6"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="block text-sm font-medium mb-1 lg:mb-2 text-gray-200"
                                                >
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    {...form.register("name")}
                                                    className="w-full px-4 py-2 lg:py-3 rounded-lg border border-gray-700 bg-slate-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 hover:border-gray-600"
                                                    placeholder="Your name"
                                                />
                                                {form.formState.errors.name && (
                                                    <p className="mt-1 text-sm text-red-400">
                                                        {
                                                            form.formState
                                                                .errors.name
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium mb-1 lg:mb-2 text-gray-200"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    {...form.register("email")}
                                                    className="w-full px-4 py-2 lg:py-3 rounded-lg border border-gray-700 bg-slate-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 hover:border-gray-600"
                                                    placeholder="Your email"
                                                />
                                                {form.formState.errors
                                                    .email && (
                                                    <p className="mt-1 text-sm text-red-400">
                                                        {
                                                            form.formState
                                                                .errors.email
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="block text-sm font-medium mb-1 lg:mb-2 text-gray-200"
                                            >
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                {...form.register("subject")}
                                                className="w-full px-4 py-2 lg:py-3 rounded-lg border border-gray-700 bg-slate-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 hover:border-gray-600"
                                                placeholder="What's this about?"
                                            />
                                            {form.formState.errors.subject && (
                                                <p className="mt-1 text-sm text-red-400">
                                                    {
                                                        form.formState.errors
                                                            .subject.message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="message"
                                                className="block text-sm font-medium mb-1 lg:mb-2 text-gray-200"
                                            >
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                rows={3}
                                                {...form.register("message")}
                                                className="w-full px-4 py-2 lg:py-3 rounded-lg border border-gray-700 bg-slate-800/70 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 resize-none hover:border-gray-600"
                                                placeholder="Tell me about your project..."
                                            ></textarea>
                                            {form.formState.errors.message && (
                                                <p className="mt-1 text-sm text-red-400">
                                                    {
                                                        form.formState.errors
                                                            .message.message
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full px-6 py-3 lg:py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base lg:text-lg font-medium rounded-lg transform hover:scale-105 transition-all shadow-lg hover:shadow-blue-500/30 disabled:opacity-70 disabled:hover:scale-100"
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg
                                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            ></circle>
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            ></path>
                                                        </svg>
                                                        Sending...
                                                    </span>
                                                ) : (
                                                    "Send Message"
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
