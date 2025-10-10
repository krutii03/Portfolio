"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  resumeHref: string;
};

export default function Hero({ resumeHref }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-2xl p-6 md:p-10"
      style={{
        background:
          "linear-gradient(135deg, #F9F3EF, #D2C1B6 25%, #F9F3EF 80%)",
      }}
    >
      <div className="mx-auto max-w-5xl grid md:grid-cols-[260px,1fr] gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center md:justify-start"
        >
          <div
            className="relative w-[240px] h-[240px] rounded-full overflow-hidden border-4"
            style={{
              borderColor: "#D2C1B6",
              boxShadow: "0 10px 30px rgba(27,60,83,0.15)",
            }}
          >
            <Image
              src="/kp.jpg"
              alt="Kruti Patel"
              fill
              priority
              sizes="240px"
              className="object-cover"
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold" style={{ color: "#1B3C53" }}>
            👋 Hi, I’m Kruti Patel
          </h1>
          <p className="text-lg" style={{ color: "#456882" }}>
            Full-Stack Developer · Creative Technologist
          </p>
          <p className="max-w-2xl leading-relaxed" style={{ color: "#1B3C53" }}>
            I build intuitive, scalable applications where clean design meets smart engineering.
            Passionate about transforming ideas into functional, human-centered software — one thoughtful line of code at a time.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/projects" className="px-5 py-2 rounded-full text-white" style={{ background: "#1B3C53" }}>
              View My Projects
            </Link>
            <Link href="/contact" className="px-5 py-2 rounded-full border" style={{ borderColor: "#456882", color: "#456882" }}>
              Let’s Connect
            </Link>
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline underline-offset-4"
              style={{ color: "#456882" }}
            >
              Resume ↗
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
