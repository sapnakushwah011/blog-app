import BlogItem from "./BlogItem"
import { useEffect, useState } from "react"
import axios from "axios";

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
  const [menu , setMenu] = useState("All");
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blog");
      const result = response.data.blogs || [];
      setBlogs(result);
      setLoading(false);
    } catch(error) {
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
    
  return (
    <>
      <div className="flex justify-center gap-6 my-10">
        <button onClick={() => setMenu("All")} className={menu === "All" ? `bg-white text-black py-1 px-4 rounded-sm` : "text-white"}>All</button>
        <button onClick={() => setMenu("Technology")} className={menu === "Technology" ? `bg-white text-black py-1 px-4 rounded-sm` : "text-white"}>Technology</button>
        <button onClick={() => setMenu("Startup")} className={menu === "Startup" ? `bg-white text-black py-1 px-4 rounded-sm` : "text-white"}>Startup</button>
        <button onClick={() => setMenu("Lifestyle")} className={menu === "Lifestyle" ? `bg-white text-black py-1 px-4 rounded-sm` : "text-white"}>Lifestyle</button>
      </div>

      {loading ? (
        <div className="text-2xl text-white text-center">Loading....</div>
      ) : (
        <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:max-24">
          {blogs.filter((i) => menu === "All" ? true : i.category === menu).map((item) => {
            return <BlogItem  key={item._id} id={item._id}  image={item.image} title={item.title} description={item.description} category={item.category} />
          })}
        </div>
      )}
    </>
  )
}

export default BlogList