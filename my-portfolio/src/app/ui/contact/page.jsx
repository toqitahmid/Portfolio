"use client";
import { motion } from "framer-motion";
import { FloppyDisk } from "@gravity-ui/icons";
import { Brain } from "lucide-react";
import { useState } from "react";
import {
  Avatar,
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
const Contact = () => {
  const [status, setStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // form clear
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center lg:justify-evenly items-center min-h-screen sm:flex-row flex-col backdrop-blur-sm backdrop-grayscale-30 border gap-4 sm:gap-8 px-3 sm:px-6 py-6 overflow-x-hidden"
    >
      <div className="space-y-3 flex-shrink-0">
        <Avatar className="sm:flex justify-self-center rounded-full size-24 sm:size-30">
          <Avatar.Image
            alt="Toqi Tahmid"
            src="https://i.ibb.co.com/ycV78Pzt/professional.png"
          />
          <Avatar.Fallback></Avatar.Fallback>
        </Avatar>
        <h1 className="lg:text-5xl md:text-4xl text-2xl sm:text-3xl font-semibold text-center sm:text-start">
          Hey, I am Toqi Tahmid
        </h1>
        <Button
          variant="secondary"
          className="text-yellow-400 text-xs sm:text-sm w-full sm:w-auto"
        >
          <Brain className="w-4 h-4"></Brain>
          <span className="hidden sm:inline">
            Contact us now to turn your ideas into reality.
          </span>
          <span className="sm:hidden">Let's talk!</span>
        </Button>
      </div>
      <div className="w-full sm:w-auto lg:w-[25vw] md:w-[40vw] max-w-sm mx-auto">
        <Form
          onSubmit={handleSubmit}
          className="border p-3 sm:p-4 rounded-2xl sm:rounded-3xl"
        >
          <Fieldset>
            <Fieldset.Group>
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label>Name</Label>
                <Input
                  placeholder="John Doe"
                  variant="secondary"
                  value={formData.name}
                  onChange={handleChange}
                />
                <FieldError />
              </TextField>
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input
                  placeholder="john@example.com"
                  variant="secondary"
                  value={formData.email}
                  onChange={handleChange}
                />
                <FieldError />
              </TextField>
              <TextField
                isRequired
                name="message"
                validate={(value) => {
                  if (value.length < 10) {
                    return "Bio must be at least 10 characters";
                  }
                  return null;
                }}
              >
                <Label>Message</Label>
                <TextArea
                  placeholder="Tell us about your thought..."
                  variant="secondary"
                  value={formData.message}
                  onChange={handleChange}
                />
                <FieldError />
              </TextField>
            </Fieldset.Group>
            {/* ✅ Status Messages */}
            {status === "loading" && (
              <p className="text-yellow-400 text-sm">Sending...</p>
            )}
            {status === "success" && (
              <p className="text-green-400 text-sm">
                ✅ Message sent successfully!
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm">
                ❌ Something went wrong. Try again.
              </p>
            )}
            <Fieldset.Actions>
              <Button
                variant="secondary"
                type="submit"
                className="text-yellow-400"
                disabled={status === "loading"} // ✅ loading এ disable
              >
                <FloppyDisk />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
              <Button type="reset" variant="tertiary">
                Cancel
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </div>
    </motion.div>
  );
};

export default Contact;
