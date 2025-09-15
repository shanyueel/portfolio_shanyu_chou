"use client";

import blog from "@/data/blog";
import projects from "@/data/projects";
import work from "@/data/work";
import WorkItem from "@/components/features/WorkItem";
import ProjectTile from "@/components/features/ProjectTile";
import BlogPost from "@/components/features/BlogPost";
import ViewAllHeader from "@/components/layout/ViewAllHeader";
import {motion} from "framer-motion";
import {
    FaMapMarkerAlt, FaLanguage,
    FaGamepad, FaUniversity,
    FaTableTennis, FaBuilding, FaTools
} from "react-icons/fa";

/**
 * Home component that serves as the main landing page for the portfolio.
 * This is accessed at the root URL ("/") of the application.
 */
export default function Home() {

    const getTimeSafe = (dateStr: string | undefined) => {
        const date = new Date(dateStr ?? '');
        return isNaN(date.getTime()) ? 0 : date.getTime();
    };

    return (
        <section className="px-4 max-w-4xl mx-auto">

            {/* Intro Section */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                viewport={{once: true}}
                className="text-center mt-2"
            >
                {/* Introductory Text */}
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Hi, I&#39;m Shan-Yu Chou 👋
                </h1>

                <h2 className="text-2xl italic">
                    &quot;Focus on the user and all else will follow.&quot; <span className="text-lg">— Google</span>
                </h2>

                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left mb-6 mt-6">
                    A collaborative and detail-oriented Front-End Engineer with 3+ years of professional experience,
                    including 2 years in a dynamic e-commerce team at Wabow Information Inc. 
                </p>

                {/* Current Work Description or other highlights */}
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-left">
                    Leverages a background in Industrial Design to build intuitive and engaging user experiences with Typescript, Vue, and React. A quick learner adept at writing clean, robust, and maintainable code to solve complex problems and deliver high-quality web applications.
                </p>


                {/* Quick Facts Section */}
                <div className="mt-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Quick & Fun Facts</h2>

                    <div className="flex flex-wrap justify-center gap-3 px-4 max-w-4xl mx-auto">
                        {[
                            {icon: FaBuilding, label: "Wabow Information Inc"},
                            {icon: FaUniversity, label: "CS Student @ Oregon State Univ."},
                            {icon: FaMapMarkerAlt, label: "Taipei City, Taiwan"},
                            {icon: FaLanguage, label: "ZH-Native | EN-Fluent"},
                            {icon: FaTools, label: "Front-End Dev"},
                            {icon: FaGamepad, label: "Sci-fi Fan"},
                            {icon: FaTableTennis, label: "Table Tennis Enthusiast"},
                        ].map((fact, i) => {
                            const Icon = fact.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800
                                    text-sm text-gray-700 dark:text-gray-300 rounded-full shadow-md transition"
                                >
                                    <Icon className="text-blue-500 dark:text-blue-400 text-base"/>
                                    <span>{fact.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </motion.div>

            {/* Recent Work */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                viewport={{once: true}}
                className="mt-16"
            >
                <ViewAllHeader title="Work Experience" pageUrl="/work" itemCount={work.length}/>
                <div className="grid gap-4">
                    {work.slice(0, 3).map((job, i) => (
                        <motion.div
                            key={i}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            viewport={{once: true}}
                        >
                            <WorkItem {...job} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Recent Projects */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                viewport={{once: true}}
                className="mt-16"
            >
                <ViewAllHeader title="Recent Projects" pageUrl="/projects" itemCount={projects.length}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {projects.slice(0, 4).map((proj) => (
                        <motion.div
                            key={proj.slug}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 1}}
                            viewport={{once: true}}
                        >
                            <ProjectTile key={proj.slug} {...proj} />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Recent Blog Posts */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                viewport={{once: true}}
                className="mt-16 mb-12"
            >
                <ViewAllHeader title="Recent Blog Posts" pageUrl="/blog" itemCount={blog.length}/>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {blog
                        .slice()
                        .sort((a, b) => getTimeSafe(b.date) - getTimeSafe(a.date))
                        .slice(0, 3)
                        .map((post) => (
                            <motion.div
                                key={post.slug}
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 1}}
                                viewport={{once: true}}
                            >
                                <BlogPost {...post} />
                            </motion.div>
                        ))}
                </div>
            </motion.div>

        </section>
    )
}

