import { assets } from "@/assets/assets";
import Image from "next/image";

type BlogItemProps = {
  mongoId: string;
  title: string;
  author: string;
  author_img: string;
  date: string;
  deleteBlog: (id: string) => void; 
};

export default function BlogTableItem({ mongoId, author_img, author, title, date, deleteBlog }: BlogItemProps) {
  // Convert string to Date
  const blogDate = date ? new Date(date) : null;

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={author_img ? author_img : assets.profile_icon}
          width={40}
          height={40}
          alt="Author"
        />
        <p>{author ? author : "No author"}</p>
      </th>

      <td className="px-6 py-4">{title ? title : "No title"}</td>

      <td className="px-6 py-4">
        {blogDate ? blogDate.toDateString() : "01/01/2026"}
      </td>

      <td onClick={() => deleteBlog(mongoId)} className="px-6 py-4 cursor-pointer">
        x
      </td>
    </tr>
  );
}
