import { motion } from "framer-motion";
import { Button } from "../components/ui/button";

const variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 0,
    transition: {
      ease: "easeOut",
    },
  },
};

const Banner = () => {
	return (
		<motion.section
      className="w-full h-full flex flex-col gap-4 md:gap-6 py-6"
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        Welcome to Shinigami
      </h4>
      <p className="text-sm text-neutral-300 md:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quam eius consequuntur excepturi obcaecati magnam fugit illum nisi numquam tempore reiciendis deserunt praesentium enim eum ipsa modi totam, rem ullam?
      </p>

			<p className="text-sm text-neutral-300 md:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quam eius consequuntur excepturi obcaecati magnam fugit illum nisi numquam tempore reiciendis deserunt praesentium enim eum ipsa modi totam, rem ullam?
      </p>

			<p className="text-sm text-neutral-300 md:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quam eius consequuntur excepturi obcaecati magnam fugit illum nisi numquam tempore reiciendis deserunt praesentium enim eum ipsa modi totam, rem ullam?
      </p>

    </motion.section>
	);
};

export default Banner;
