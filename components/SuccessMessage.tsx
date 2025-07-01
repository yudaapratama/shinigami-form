import Image from "next/image";
import { motion } from "framer-motion";
import successIcon from "../public/assets/success.png";
import { Payment } from "@/app/page";
import { useEffect, useState } from "react";

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

type StepProps = Payment ;

const SuccessMessage = ({payment_id, checkout_url}: StepProps) => {
	const [seconds, setSeconds] = useState(5);

	useEffect(() => {
    if (seconds <= 0) {
			window.location.href = checkout_url;
		}

    const timer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, checkout_url]);

  return (
    <motion.section
      className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-2 text-center"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <Image
        src={successIcon}
        width="150"
        height="150"
        alt="Success Icon"
        className="md:mb-4"
      />
      <h4 className="text-2xl font-semibold text-white md:text-3xl">
        Thank you!
      </h4>
      <p className="text-sm max-w-md text-neutral-300 md:text-base">
        Thanks for confirming! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@shinigami.asia
      </p>
      <div className="flex items-center mt-6">
					<p>You will be redirected to the payment page in a few seconds, please wait ({seconds})</p>
      </div>
    </motion.section>
  );
};

export default SuccessMessage;
