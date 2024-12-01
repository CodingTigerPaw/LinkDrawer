import List from "../components/List/List";
export default function Home() {
  return (
    <>
      <div className="text-center bg-slate-400">
        <h1 className="text-xl">Link Drawer</h1>
        <h2 className="text-bold">
          Dragable and recursive list for storing interesting url Links
        </h2>
      </div>
      <List />
    </>
  );
}
