import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <main className="flex justify-center px-16 flex-col py-12 lg:py-16 lg:px-24">
      <div className="w-3/4 py-6 flex flex-row items-center">
        <ClipLoader size={35} color={"black"} />
      </div>
    </main>
  );
}
