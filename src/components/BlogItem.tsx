import Image from "next/image";
import { assets } from "@/assets/assets";
import Link from "next/link";

type BlogItemProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: any;
};

export default function BlogItem({
  id,
  title,
  description,
  category,
  image,
}: BlogItemProps) {
  return (
    <div
      className="max-w-[330px] sm:max-w-[300px] bg-[#4a7a99] rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt=""
          width={400}
          height={400}
        />
      </Link>
      <p className="ml-5 mt-5 px-2 py-1 inline-block bg-[#0f1d3f] rounded-2xl text-white text-sm">
        {category}
      </p>

      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p
          className="mb-3 text-sm tracking-tight text-slate-200"
          dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
        ></p>
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center py-2 font-semibold text-center text-white"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}
