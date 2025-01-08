import Link from "next/link";
import './item.scss';
import { useParams } from "next/navigation";

interface ItemProps {
  index: string;
  item: {
    name: string;
    itemId: string;
  }
}

export default function Item(props: ItemProps) {
  const { id } = useParams();
  const { name, itemId } = props.item;

  return (
    <Link
      className="py-3 px-8 boards--board border  block border-slate-200 border-solid board-item"
      href={`/boards/${id}/item/${itemId}`}
      key={`link_${props.index}`}
    >
      {name}
    </Link>
  );
};