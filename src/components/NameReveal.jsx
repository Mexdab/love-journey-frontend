import { motion } from "framer-motion";

export default function NameReveal({ name1, name2 }) {
  return (
    <div className="center">
      <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1 }}>
        {name1} ❤️ {name2}
      </motion.h1>
    </div>
  );
}
