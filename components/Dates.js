import { v4 as uuidv4 } from 'uuid';
export default function Dates() {
    const id = uuidv4().slice(0, 12);
    const date = new Date();

  return (
    <>
      <article className="mt-10 mb-14 flex items-end justify-end">
        <ul>
          <li className="p-1 ">
            <span className="font-bold">Invoicer number:</span> {id}
          </li>
          <li className="p-1 bg-gray-100">
            <span className="font-bold">Invoice date:</span> {date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()}
          </li>
          <li className="p-1 ">
            <span className="font-bold">Due date:</span> {date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()}
          </li>
        </ul>
      </article>
    </>
  );
}
