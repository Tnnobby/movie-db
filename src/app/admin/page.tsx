import Button from "@/ui/Button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-row justify-end">
      <Link href="/admin/new">
        <Button>Add Movie</Button>
      </Link>
    </div>
  );
};

export default Page;
