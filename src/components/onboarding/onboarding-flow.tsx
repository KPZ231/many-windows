import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RADIO_CLASSNAME =
  "peer absolute inset-0 h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-black transition-colors";

const RADIO_DOT_CLASSNAME =
  "pointer-events-none absolute h-2.5 w-2.5 scale-0 rounded-full bg-black transition-transform duration-200 ease-out peer-checked:scale-100";

const SOURCES = ["Github", "Instagram", "TikTok", "Other"];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

function OnboardingFlow() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(false);

  const goToNextPage = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex w-full max-w-md flex-col items-center gap-6 mx-auto"
    >
      <h2 className="text-3xl text-black text-center">
        Where did you hear about us?
      </h2>
      <motion.ul
        className="flex w-full flex-col gap-4"
        initial="hidden"
        animate="visible"
        variants={listVariants}
      >
        {SOURCES.map((source) => {
          const id = `form-${source.toLowerCase()}`;
          return (
            <motion.li
              key={id}
              variants={itemVariants}
              className="flex flex-row items-center gap-3"
            >
              <div className="relative flex h-5 w-5 items-center justify-center">
                <input
                  type="radio"
                  name="form"
                  id={id}
                  className={RADIO_CLASSNAME}
                  onChange={() => setSelected(true)}
                />
                <span className={RADIO_DOT_CLASSNAME} />
              </div>
              <label htmlFor={id}>{source}</label>
            </motion.li>
          );
        })}
      </motion.ul>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="bg-black text-white rounded-xl px-8 py-2"
        onClick={goToNextPage}
      >
        {!selected ? "Skip" : "Complete"}
      </motion.button>
    </motion.div>
  );
}

export default OnboardingFlow;
