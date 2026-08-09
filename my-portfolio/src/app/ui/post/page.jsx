"use client";

import { Button, Input, Label, TextField } from "@heroui/react";
import { useState } from "react";

const ProjectPostingPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [features, setFeatures] = useState("");
  const [challenges, setChallenges] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTechnologies("");
    setFeatures("");
    setChallenges("");
    setLiveUrl("");
    setGithubUrl("");
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    setIsSubmitting(true);

    try {
      const res = await fetch(`${apiUrl}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          technologies,
          features,
          challenges,
          liveUrl,
          githubUrl,
          imageUrl,
        }),
      });

      const responseText = await res.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        alert("Server returned an unexpected response.");
        return;
      }

      if (!res.ok) {
        alert(data.error || "Something went wrong.");
        return;
      }

      alert("Project submitted successfully!");
      resetForm();
    } catch (error) {
      alert(
        "Could not reach the server. Make sure your backend server is running.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Add New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <TextField isRequired className="w-full">
            <Label>Title</Label>
            <Input
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </TextField>

          <TextField isRequired className="w-full">
            <Label>Description</Label>
            <Input
              placeholder="Write about your project"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </TextField>

          <TextField isRequired className="w-full">
            <Label>Technologies</Label>
            <Input
              placeholder="React, Express, MongoDB"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />
          </TextField>

          <TextField isRequired className="w-full">
            <Label>Features</Label>
            <Input
              placeholder="Authentication, Dark Mode, Payment Gateway"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </TextField>

          <TextField isRequired className="w-full">
            <Label>Challenges</Label>
            <Input
              placeholder="API integration, Authentication, Deployment"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
            />
          </TextField>

          <div className="flex flex-col gap-5 md:flex-row">
            <TextField isRequired className="w-full">
              <Label>Image URL</Label>
              <Input
                type="url"
                placeholder="https://imgbb.com/project"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </TextField>
            <TextField isRequired className="w-full">
              <Label>GitHub URL</Label>
              <Input
                type="url"
                placeholder="https://github.com/username/project"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </TextField>

            <TextField isRequired className="w-full">
              <Label>Live URL</Label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
              />
            </TextField>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" isDisabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Done"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectPostingPage;
