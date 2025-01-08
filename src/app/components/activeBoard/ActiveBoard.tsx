import Link from "next/link";
import Group from "../group/Group";
import "./activeBoard.scss";

export default function ActiveBoard(props: any) {
  const { groups } = props;

  return (
    <div className="groups">
      {groups.map((group: any) => {
        return (
          <Group group={group} />
        )
      })}
    </div>
  );
};