import {blogs} from "@/.velite/generated";
import HomeCoverSection from "../components/Home/HomeCoverSection";
import FeaturedPosts from "../components/Home/FeaturedPosts";
import RecentPosts from "../components/Home/RecentPosts";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HomeCoverSection blogs={blogs} /> {/*blog 0 by date */}
      <FeaturedPosts blogs={blogs} /> {/* blogs 1-3 by date */}
      <RecentPosts blogs={blogs} /> {/* blogs 4+ by date */}
    </main>
  )
}
