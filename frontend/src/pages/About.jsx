import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

const Aboutme = () => {
  return (
    <section className="min-h-screen bg-neutral-950 text-white px-6 py-16 ">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-violet-400">
          About Me
        </h1>

        {/* Intro */}
        <div className="text-lg text-gray-300 leading-relaxed">
          <p>
            Hey, I'm <span className="text-white font-semibold">Jaivardhan Singh</span> — a passionate{" "}
            <span className="text-blue-400 font-medium"> MERN Stack Developer</span>. I’ve spent the last 6+ months diving deep into full-stack development, building real-world projects, and pushing my skills every day.
          </p>

        </div>

        {/* Skills */}
        <div>
          <h2 className="text-2xl font-semibold text-violet-300 mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300">
            <span className="bg-neutral-800 px-3 py-1 rounded-full">MongoDB</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">Express.js</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">React.js</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">Node.js</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">Redux Toolkit</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">JWT</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">Tailwind CSS</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">Git & GitHub</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">REST APIs</span>
            <span className="bg-neutral-800 px-3 py-1 rounded-full">Netlify / Vercel / Render</span>
          </div>
        </div>

        {/* Motivation */}
        <div className="text-gray-300">
          <h2 className="text-2xl font-semibold text-violet-300 mb-3">Why I Code</h2>
          <p>
            I love building things that matter — apps that solve problems, teach people, or just make life easier. Coding is my way of creating impact while constantly leveling up my skills.
          </p>
        </div>

        {/* Personal Details */}
<div className="text-gray-300">
  <h2 className="text-2xl font-semibold text-violet-300 mb-3">Contact Info</h2>
  <ul className="space-y-1">
    <li>
      <span className="font-medium text-white">Email:</span>{" "}
      <a
        href="mailto:jaivardhansinghrathore17@gmail.com"
        className="text-blue-400 hover:underline"
      >
        jaivardhansinghrathore17@gmail.com
      </a>
    </li>
    <li>
      <span className="font-medium text-white">Phone:</span>{" "}
      <a
        href="tel:+916377469206"
        className="text-blue-400 hover:underline"
      >
        +91 6377469206
      </a>
    </li>
    <li>
      <span className="font-medium text-white">Location:</span>{" "}
      Rajpura, Patiala, Punjab, India
    </li>
  </ul>
</div>


        {/* Social Links */}
        <div className="flex justify-center gap-6 pt-4">
          <a
            href="https://github.com/Jaivardhan7773"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition hover:scale-110 duration-200"
          >
            <Github className="size-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/jaivardhan7773"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition hover:scale-110 duration-200"
          >
            <Linkedin className="size-6" />
          </a>
          <a
            href="https://www.instagram.com/jaivardhan7773_/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition hover:scale-110 duration-200"
          >
            <Instagram className="size-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Aboutme;
