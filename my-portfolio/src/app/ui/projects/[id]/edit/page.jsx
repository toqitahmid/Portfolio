"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditProjectPage({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    githubUrl: "",
    liveUrl: "",
    technologies: "",
    features: "",
    challenges: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch initial project data
  useEffect(() => {
    const fetchProject = async () => {
     const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";;
      try {
        const res = await fetch(`${apiUrl}/api/projects/${id}`);
        if (!res.ok) throw new Error("Failed to fetch project");
        const json = await res.json();
        const data = json.data;

        setFormData({
          title: data.title || "fsfsf",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          githubUrl: data.githubUrl || "",
          liveUrl: data.liveUrl || "",
          technologies: Array.isArray(data.technologies)
            ? data.technologies.join(", ")
            : "",
          features: Array.isArray(data.features)
            ? data.features.join("\n")
            : "",
          challenges: Array.isArray(data.challenges)
            ? data.challenges.join("\n")
            : "",
        });
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      features: formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      challenges: formData.challenges
        .split("\n")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${apiUrl}/api/projects/${id}`, {
        method: "PATCH", // or 'PATCH' depending on API setup
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push(`/ui/projects/${id}`);
        router.refresh();
      } else {
        alert("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <div className="p-8 text-center">Loading project data...</div>;

  return (
    <section className="py-10 px-4 min-h-screen max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-transparent border-foreground/20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-md bg-transparent border-foreground/20"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-transparent border-foreground/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">GitHub URL</label>
            <input
              type="text"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-transparent border-foreground/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Live URL</label>
            <input
              type="text"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              className="w-full p-2 border rounded-md bg-transparent border-foreground/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Technologies (comma separated)
          </label>
          <input
            type="text"
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            className="w-full p-2 border rounded-md bg-transparent border-foreground/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Features (one per line)
          </label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded-md bg-transparent border-foreground/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Challenges (one per line)
          </label>
          <textarea
            name="challenges"
            value={formData.challenges}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border rounded-md bg-transparent border-foreground/20"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href={`/projects/${id}`}
            className="px-4 py-2 border border-foreground/20 rounded-lg hover:border-foreground/40"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
