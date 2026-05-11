"use client";

import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard";
import type { PostListItem } from "@/sanity/lib/queries";

/**
 * P09-S04 Article Grid — 3-col masonry desktop / 2-col tablet / 1-col mobile.
 * CardGroupAttention via group-hover (CSS). Stagger-enter via parent variants.
 */
export default function ArticleGrid({ posts }: { posts: PostListItem[] }) {
  return (
    <section className="bg-white" style={{ paddingTop: "40px", paddingBottom: "120px" }}>
      <div className="container-editorial">
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] group/grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {posts.map((post) => (
            <ArticleCard key={post._id} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
