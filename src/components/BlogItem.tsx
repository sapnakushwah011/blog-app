import Image from "next/image";
import Link from "next/link";

type BlogItemProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string; 
};

export default function BlogItem({
  id,
  title,
  description,
  category,
  image,
}: BlogItemProps) {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-[#4a7a99] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group">
      {/* Image with hover zoom effect */}
      <Link href={`/blogs/${id}`} className="block overflow-hidden">
        <div className="relative w-full h-48 sm:h-40">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Category badge */}
      <p className="ml-5 mt-3 px-3 py-1 inline-block bg-[#0f1d3f] rounded-2xl text-white text-sm font-medium">
        {category}
      </p>

      {/* Content */}
      <div className="p-5">
        <h5 className="mb-2 text-lg font-semibold text-white line-clamp-2">
          {title}
        </h5>
        <p
          className="mb-4 text-sm text-slate-200 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>

        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center gap-1 text-white font-semibold hover:text-gray-200 transition-colors"
        >
          Read More
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
