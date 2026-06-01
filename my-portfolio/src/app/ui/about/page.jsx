"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import devToqi from "../../../assets/toqi.png";
import { Button, Chip } from "@heroui/react";
import { CircleCheckFill, ArrowDownToSquare } from "@gravity-ui/icons";
import Link from "next/link";
const About = () => {
  const skills = [
    { name: "React" },
    { name: "| Next" },
    { name: "| Node.js" },
    { name: "| Express" },
    { name: "| MongoDB" },
  ];
  return (
    <motion.section
      id="about"
      className="min-h-screen flex items-center lg:w-9/12 md:w-11/12 sm:w-full mx-auto px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="backdrop-blur-xl w-full h-auto py-16 relative backdrop-opacity-80 border rounded-3xl">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 px-6">
          <motion.div
            className="flex-1"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Chip color="success">
              <CircleCheckFill />
              <Chip.Label>Open to opportunities</Chip.Label>
            </Chip>
            <div className="mt-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Full-Stack MERN Developer
              </h1>
              <Button variant="secondary" className="flex flex-wrap gap-2 mb-4 cursor-default">
                {skills.map((skill, index) => (
                  <div key={index} variant="secondary">
                    {skill.name}
                  </div>
                ))}
              </Button>
              <p className="text-gray-400 mb-4 text-justify">
                End-to-end web development with a focus on performance and user
                experience. I specialise in building robust APIs, dynamic
                front-ends, and reliable database architectures that scale with
                your business.
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <Link
              href= '/ui/projects'
              >
              <Button variant="secondary">View Projects</Button>
              </Link>
              <Link
              href="/resume.pdf"
              >
              <Button variant="outline">
              <ArrowDownToSquare></ArrowDownToSquare>
              Download Resume</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 flex justify-center md:justify-end"
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image
              src={devToqi}
              alt="Toqi Tahmid"
              className="rounded-3xl lg:w-[20vw] lg:h-[60vh] md:w-[30vw] w-[60vw] border object-cover"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
