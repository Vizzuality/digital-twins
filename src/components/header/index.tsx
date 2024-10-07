import HoverRepeatAnimation from "@/components/animations/hover-repeat";

export default function Header() {
  const MenuButton = () => (
    <button className="h-10 px-4 py-3 border-2 border-light-green justify-center items-center gap-2.5 inline-flex">
      <HoverRepeatAnimation>
        <div className="text-light-green text-sm font-medium uppercase">MENU</div>
      </HoverRepeatAnimation>
      <img alt="Menu button" className="w-4 h-4" src="/icons/menu.svg" />
    </button>
  );

  return (
    <div className="fixed inset-0 w-full h-[90px] py-6 bg-blue-800 flex">
      <div className="container flex justify-between items-center">
        <img alt="Logo" className="w-60 h-10" src="/logo.svg" />
        <MenuButton />
      </div>
    </div>
  );
};