import BlogItem from "./BlogItem";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import BlogSkeleton from "./BlogSkeleton";

interface Blog {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  author_img: string;
  date: string;
  __v: number;
}

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog");
      const result = response.data.blogs || [];
      setBlogs(result);
    } catch (err) {
      console.error("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Derive categories dynamically from blogs
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogs.map(b => b.category)));
    return ["All", ...uniqueCategories];
  }, [blogs]);

  // Filter blogs based on menu
  const filteredBlogs = useMemo(() => {
    if (menu === "All") return blogs;
    return blogs.filter(b => b.category === menu);
  }, [blogs, menu]);

  const skeletons = Array.from({ length: 4 }, (_, idx) => idx);

  return (
    <>
      <div className="flex justify-center gap-6 my-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            aria-pressed={menu === cat}
            className={`py-1 px-4 rounded-sm transition-colors duration-200
              ${menu === cat ? "bg-white text-black" : "text-white hover:bg-white hover:text-black"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {skeletons.map((s) => (
            <BlogSkeleton key={s} />
          ))}
        </div>
      ): filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-300 my-10">No blogs found in this category.</p>
      ) : (
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16">
          {filteredBlogs.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default BlogList;
