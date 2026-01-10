import { TrashIcon } from "@heroicons/react/24/solid";

type EmailItemProps = {
  mongoId: string;
  email: string;
  date: string;
  deleteEmail: (id: string) => void; 
};

export default function SubsTableItem({ mongoId, email, date, deleteEmail }: EmailItemProps) {
  // Convert string to Date
  const subscriptionDate = date ? new Date(date) : null;

  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {email ? email : "No Email"}
      </th>

      <td className="px-6 py-4 hidden sm:block">
        {subscriptionDate ? subscriptionDate.toDateString() : null}
      </td>

      <td onClick={() => deleteEmail(mongoId)} className="px-6 py-4 cursor-pointer">
        <TrashIcon className="w-6 h-6 text-red-500" />
      </td>
    </tr>
  );
}
