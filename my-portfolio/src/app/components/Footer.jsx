"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ListChecks, LogOut } from "lucide-react";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {data:session} = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    // if (email !== "abusamsarafofficial@gmail.com") {
    //   router.push("/");
    //   return;
    // } else if (password !== "@TOQI-99@") {
    //   router.push("/");
    //   return;
    // }
    const { data, error } = await authClient.signUp.email({
      name: 'Toqi Tahmid',
      email: email,
      password: password,
      rememberMe: true,
    });

    if (data) {
      router.push("/");
    } else if (error) {
      console.log(error);
    }
  };
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
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="relative border-t border-border/20 px-3 sm:px-6 py-4 sm:py-5 backdrop-blur-xl overflow-hidden box-border pt-10 lg:w-8/12 md:w-10/12 sm:w-11/12 mx-auto z-40"
    >
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-3 sm:gap-4">
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-start">
            <Modal>
              <Button variant="outline">Toqi Tahmid | Developer</Button>
              <Modal.Backdrop>
                <Modal.Container placement="auto">
                  <Modal.Dialog className="sm:max-w-md">
                    <Modal.Header>
                      <Modal.Heading className="text-red-400 text-center">
                        Only Developer Allowed
                      </Modal.Heading>
                    </Modal.Header>
                    <Modal.Body className="p-6">
                      <Surface variant="default">
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={onSubmit}
                        >
                          <TextField
                            isRequired={true}
                            className="w-full"
                            name="email"
                            type="email"
                            variant="secondary"
                          >
                            <Label>Email</Label>
                            <Input
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </TextField>
                          <TextField
                            isRequired={true}
                            className="w-full"
                            name="password"
                            type="password"
                            variant="secondary"
                          >
                            <Label>Password</Label>
                            <Input
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </TextField>
                          <Modal.Footer>
                            <Button slot="close" variant="outline">
                              Cancel
                            </Button>
                            <Button variant="secondary" type="submit">
                              Done
                            </Button>
                          </Modal.Footer>
                        </form>
                      </Surface>
                    </Modal.Body>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
          </p>
        </div>
        <div>
          {user && (
            <div className="flex">
              <button
                className="text-sm font-semibold text-red-400 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                onClick={() => authClient.signOut()}
              >
                <LogOut></LogOut>
              </button>
              <Link
                href="/ui/post"
                className="text-sm font-semibold text-yellow-400 hover:text-yellow-600 transition-colors duration-200 cursor-pointer ml-3"
              >
                {" "}
                <ListChecks />
              </Link>
            </div>
          )}
        </div>

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
