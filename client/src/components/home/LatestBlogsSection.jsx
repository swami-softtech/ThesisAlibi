import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URL } from "../../services/api";


const API_BASE_URL = `${API_URL}/api/blogs`;
const IMAGE_BASE_URL = `${API_URL}/uploads`;

export function LatestBlogsSection() {

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

    const recentBlogs = [...blogs]
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);


  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-gray-300 text-primary text-sm font-medium mb-4">
              Research Insights
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Latest from Our Blog
            </h2>
          </div>
          <Link to="/blog">
            <Button variant="outline">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog, index) => (

            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/blog/${blog._id}`}>
                <Card variant="feature" className="overflow-hidden p-0 h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={
                            blog.image
                              ? `${IMAGE_BASE_URL}/${blog.image}`
                              : "/placeholder.jpg"
                          }
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
                    <h3 className="font-serif text-lg font-semibold text-black mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                       {stripHtml(blog.content)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
