"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import devToqi from "../../../assets/toqi.png";
import { Button, Chip } from "@heroui/react";
import { CircleCheckFill, ArrowDownToSquare } from "@gravity-ui/icons";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const About = () => {
  const skills = [
    { name: "React" },
    { name: "| Next" },
    { name: "| Node.js" },
    { name: "| Express" },
    { name: "| MongoDB" },
  ];

  const socials = [
    {
      socialLink: "https://github.com/toqitahmid",
      label: "GitHub",
      icon: <FaGithub></FaGithub>,
    },
    {
      socialLink: "https://www.linkedin.com/in/toqi6t9/",
      label: "LinkedIn",
      icon: <FaLinkedin></FaLinkedin>,
    },
    {
      socialLink: "https://x.com/toqitah_mid",
      label: "Twitter / X",
      icon: <FaXTwitter></FaXTwitter>,
    },
    {
      socialLink: "https://www.facebook.com/mad.tahmid.6T9/",
      label: "Facebook",
      icon: <FaFacebook></FaFacebook>,
    },
    {
      socialLink: "https://www.instagram.com/mad_toqi/",
      label: "Instagram",
      icon: <FaInstagram></FaInstagram>,
    },
  ];
  return (
    <motion.section
      id="about"
      className="min-h-screen flex items-center   sm:px-6 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="backdrop-blur-xl lg:w-8/12 md:w-11/12 w-11/12 mx-auto h-auto py-10 sm:py-16 relative backdrop-opacity-80 border rounded-2xl sm:rounded-3xl">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 sm:gap-8 px-3 sm:px-6">
          <motion.div
            className="flex-1"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Chip color="success" className="text-sm sm:text-base">
              <CircleCheckFill />
              <Chip.Label>Open to opportunities</Chip.Label>
            </Chip>
            <div className="mt-4 sm:mt-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Full-Stack MERN Developer
              </h1>
              <Button
                variant="secondary"
                className="flex flex-wrap gap-1 sm:gap-2 mb-4 cursor-default text-sm sm:text-base"
              >
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    variant="secondary"
                    className="whitespace-nowrap"
                  >
                    {skill.name}
                  </div>
                ))}
              </Button>
              <p className="text-sm sm:text-base text-gray-400 mb-4 text-justify leading-6 sm:leading-7">
                Passionate Junior Web Developer with hands-on experience
                building full-stack web applications using React, Next.js, and
                Node.js. Eager to contribute to impactful products in a
                collaborative team environment. Comfortable working with REST
                APIs, modern JavaScript, and component-based UI architecture.
                Actively seeking an internship or junior developer role to grow
                professionally.
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 mt-4 flex-wrap">
              <Link href="/ui/projects">
                <Button variant="secondary" className="text-sm sm:text-base">
                  View Projects
                </Button>
              </Link>
              <Link href="https://drive.google.com/file/d/17jWGz5yjTjoiodrTBXdw93j82h5HPrI9/view?usp=drive_link">
                <Button variant="outline" className="text-sm sm:text-base">
                  <ArrowDownToSquare></ArrowDownToSquare>
                  Download Resume
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-3 mt-6 sm:mt-8">
              {socials.map(({ socialLink, label, icon }) => (
                <a
                  key={label}
                  href={socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border/20 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:scale-110 shadow-sm text-xl sm:text-2xl"
                >
                  {icon}
                </a>
              ))}
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
              className="rounded-2xl sm:rounded-3xl lg:w-[20vw] lg:h-[60vh] md:w-[30vw] w-[55vw] max-w-xs sm:max-w-none border object-cover"
              priority={true}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
