"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
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
    <motion.footer
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="border-t border-border/20 px-3 sm:px-6 py-4 sm:py-5 backdrop-blur-xl overflow-x-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-3 sm:gap-4">
        <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-start">
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
              className="flex h-8 sm:h-9 w-8 sm:w-9 items-center justify-center rounded-md border border-border/20 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground text-sm sm:text-base"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <p className="mt-3 sm:mt-4 border-t border-border/20 pt-2 sm:pt-3 text-center text-[10px] sm:text-xs text-muted-foreground">
        © {new Date().getFullYear()} Toqi Tahmid. All rights reserved.
      </p>
    </motion.footer>
  );
};

export default Footer;
