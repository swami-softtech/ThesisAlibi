import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { API_URL } from "../../services/api";
import SEO from "../../components/SEO";

const API_BASE_URL = `${API_URL}/api/blogs`;
const IMAGE_BASE_URL = `${API_URL}/uploads`;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const data = await res.json();
        console.log(data)
        setBlogs(data);
      } catch (err) {
        setError("Unable to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (

    <>
      <SEO
        title="Blog"
        description="Explore expert insights, academic tips, and in-depth guides on thesis writing, research methods, and student success. Stay informed with the latest from ThesisAlibi."
        keywords="thesis writing blog, academic tips, research methodology guides, student success, thesis help articles, academic writing resources, ThesisAlibi blog"
      />
      <Layout>
        {/* Page Header */}
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-secondary mb-4">
                Research Insights & Blog
              </h1>
              <p className="text-gray-100 max-w-2xl mx-auto text-lg">
                Expert advice, tips, and guides to help you navigate your doctoral journey successfully.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">

            {/* Loading */}
            {loading && (
              <p className="text-center text-gray-600">Loading blogs...</p>
            )}

            {/* Error */}
            {error && (
              <p className="text-center text-red-500">{error}</p>
            )}

            {!loading && !error && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${blog._id}`}>
                      <Card variant="feature" className="overflow-hidden h-full group">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={
                              blog.image
                                ? `${IMAGE_BASE_URL}/${blog.image}`
                                : "/placeholder.jpg"
                            }
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="gold">{blog.category}</Badge>

                            <span className="flex items-center gap-1 text-xs text-gray-600">
                              <Calendar className="h-3 w-3" />
                              {new Date(blog.date).toLocaleDateString()}
                            </span>
                          </div>

                          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors">
                            {blog.title}
                          </h3>

                          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                            {stripHtml(blog.content)}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-800">
                              {blog.author}
                            </span>

                            <Button variant="link" className="p-0 h-auto text-amber-500">
                              Read More <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>

  );
};

export default Blog;
