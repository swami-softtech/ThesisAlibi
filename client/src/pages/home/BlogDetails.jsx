import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft } from "lucide-react";

const API_BASE = import.meta.env.VITE_BASE_URI;
const IMAGE_BASE = `${API_BASE}/uploads`;

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${id}`);
        if (!res.ok) throw new Error("Failed to load blog");

        const data = await res.json();
        setBlog(data);

        // Fetch related blogs (same category)
        const relRes = await fetch(`${API_BASE}/api/blogs`);
        const allBlogs = await relRes.json();

        setRelated(
          allBlogs.filter(
            (b) => b._id !== data._id && b.category === data.category
          )
        );
      } catch (err) {
        setError("Unable to load blog details");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="py-32 text-center text-muted-foreground">
          Loading blog...
        </div>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout>
        <div className="py-32 text-center text-red-500">
          {error || "Blog not found"}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HERO */}
      <section className="relative">
        <div className="aspect-[3/1] overflow-hidden">
          <img
            src={blog.image ? `${IMAGE_BASE}/${blog.image}` : "/placeholder.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 pb-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/blog">
                <Button variant="ghost" className="text-white mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>

              <Badge variant="gold" className="mb-4">
                {blog.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-secondary max-w-4xl">
                {blog.title}
              </h1>

              <div className="flex items-center gap-6 mt-6 text-white">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {blog.author}
                </span>

                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(blog.date).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-2 prose prose-lg max-w-none"
            >
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </motion.article>


            {/* SIDEBAR */}
            <aside>
              <Card variant="feature" className="sticky top-24">
                <CardContent className="p-6">
                  <h4 className="font-serif text-lg font-semibold mb-4">
                    About the Author
                  </h4>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-gold/20 flex items-center justify-center">
                      <User className="h-8 w-8 text-gold-dark" />
                    </div>
                    <div>
                      <p className="font-semibold">{blog.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {blog.authorRole}
                      </p>
                    </div>
                  </div>

                  {related.length > 0 && (
                    <>
                      <h4 className="font-serif text-lg font-semibold mb-4">
                        Related Articles
                      </h4>

                      <div className="space-y-4">
                        {related.map((item) => (
                          <Link key={item._id} to={`/blog/${item._id}`}>
                            <div className="flex gap-3 group">
                              <img
                                src={
                                  item.image
                                    ? `${IMAGE_BASE}/${item.image}`
                                    : "/placeholder.jpg"
                                }
                                alt={item.title}
                                className="w-20 h-14 object-cover rounded"
                              />
                              <div>
                                <p className="text-sm font-medium group-hover:text-gold transition-colors line-clamp-2">
                                  {item.title}
                                </p>
                                <Badge variant="gold" className="mt-1 text-xs">
                                  {item.category}
                                </Badge>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
