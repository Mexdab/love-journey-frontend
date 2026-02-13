import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
  const nav = useNavigate();

  return (
    <div className="center">
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        How far will you go for love?
      </motion.h1>

      <button onClick={() => nav("/create")}>Create Your Page</button>
    </div>
  );
}
