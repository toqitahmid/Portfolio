"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  const socials = [
    {
      socialLink: "https://github.com/yourusername",
      label: "GitHub",
      icon: <FaGithub></FaGithub>,
    },
    {
      socialLink: "https://linkedin.com/in/yourusername",
      label: "LinkedIn",
      icon: <FaLinkedin></FaLinkedin>,
    },
    {
      socialLink: "https://twitter.com/yourusername",
      label: "Twitter / X",
      icon: <FaXTwitter></FaXTwitter>,
    },
    {
      socialLink: "https://facebook.com/yourusername",
      label: "Facebook",
      icon: <FaFacebook></FaFacebook>,
    },
    {
      socialLink: "https://instagram.com/yourusername",
      label: "Instagram",
      icon: <FaInstagram></FaInstagram>,
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="border-t border-border/20 px-6 py-5 backdrop-blur-xl"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Toqi Tahmid</span>
        </p>

        <div className="flex items-center gap-2">
          {socials.map(({ socialLink, label, icon }) => (
            <a
              key={label}
              href={socialLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border/20 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-4 border-t border-border/20 pt-3 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Toqi Tahmid. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
