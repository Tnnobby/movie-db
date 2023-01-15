import NavBar from "@/ui/NavBar";
import NavItem from "@/ui/NavItem";

export default function Home() {
  

  return (
    <main>
      <NavBar className="mt-2">
        <NavItem href={'/'} label={"Home"} />
        <NavItem href={"/movies"} label={"Movies"} />
        <NavItem href={"/tv"} label={"TV Series"} />
      </NavBar>
    </main>
  );
}
