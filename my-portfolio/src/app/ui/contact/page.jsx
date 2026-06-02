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
        setFormData({ name: "", email: "", message: "" });
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
      className="flex flex-col sm:flex-row items-center lg:w-8/12 md:w-full mx-auto min-h-screen justify-around backdrop-blur-sm border gap-5 px-6 sm:px-16 py-10"
    >
      {/* ── Left side ── */}
      <div className="flex flex-col items-center sm:items-start space-y-4 sm:flex-1">
        <Avatar className="rounded-full size-24 sm:size-30">
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
          className="text-yellow-400 text-xs sm:text-sm"
        >
          <Brain className="w-4 h-4" />
          <span className="hidden sm:inline">
            Contact us now to turn your ideas into reality.
          </span>
          <span className="sm:hidden">Lets talk!</span>
        </Button>
      </div>

      {/* ── Right side ── */}
      <div className="w-full sm:flex-1 sm:max-w-md">
        <Form onSubmit={handleSubmit} className="border p-4 rounded-3xl">
          <Fieldset>
            <Fieldset.Group>
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3)
                    return "Name must be at least 3 characters";
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
                  if (value.length < 10)
                    return "Message must be at least 10 characters";
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
                disabled={status === "loading"}
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
