"use client";
import CardTweetDemo from "../dekstop-user/dekstop/components/HireCards";

export default function HomePage() {
  return (
    <div className="min-h-screen text-black flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row px-4 gap-4 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="">
          </div>

          <div className="flex-shrink-0">
            <CardTweetDemo/>
          </div>
        </div>
      </div>
    </div>
  );
}
