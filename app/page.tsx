"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMultiplestepForm } from "hooks/useMultiplestepForm";
import { AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";
import UserInfoForm from "@/components/UserInfoForm";
import SupportMessage from "@/components/SupportMessage";
import Summary from "@/components/Summary";
import SuccessMessage from "@/components/SuccessMessage";
import SideBar from "@/components/SideBar";
import Banner from "@/components/Banner";
import PaymentMethod from "@/components/PaymentMethod";

interface AddOn {
  id: number;
  checked: boolean;
  title: string;
  subtitle: string;
  price: number;
}

interface PaymentMethod {
	id: number;
	title: string;
	subtitle: string;
	value: string;
}

export type FormItems = {
  name: string;
  email: string;
	userId: string;
  plan?: "arcade" | "advanced" | "pro";
	method?: 'qris' | 'dana';
	addOns?: AddOn[];
	yearly?: boolean
  paymentMethod: PaymentMethod[];
	message: string
};

export type Payment = {
	checkout_url: string
	payment_id: string
}

type ResponseData = {
	success: boolean
	message: string
  data?: Payment
}

const initialValues: FormItems = {
  name: "",
  email: "",
	userId: "",
  paymentMethod: [
    {
      id: 1,
			title: "QRIS",
			subtitle: "Use QRIS for your payment",
			value: "qris",
    },
    {
      id: 2,
			title: "DANA",
			subtitle: "Use DANA for your payment",
			value: "dana",
    },
  ],
	message: "-",
	method: 'qris',
};

export default function Home() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
	const [paymentData, setPaymentData] = useState<Payment>({ checkout_url: '', payment_id: '' });

	const [mail, setMail] = useState('');
	const [loading, setLoading] = useState(false);

  const {
    previousStep,
    nextStep,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    steps,
    goTo,
    showSuccessMsg,
  } = useMultiplestepForm(5);

  function updateForm(fieldToUpdate: Partial<FormItems>) {
    const { name, email } = fieldToUpdate;
		setMail(email!);

    if (name && name.trim().length < 3) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be at least 3 characters long",
      }));
    } else if (name && name.trim().length > 15) {
      setErrors((prevState) => ({
        ...prevState,
        name: "Name should be no longer than 15 characters",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        name: "",
      }));
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,
        email: "",
      }));
    }

    setFormData({ ...formData, ...fieldToUpdate });
  }

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

		try {
			setLoading(true)
			e.preventDefault();
			if (Object.values(errors).some((error) => error)) {
				return;
			}

			if(currentStepIndex === 1) {
				const response = await fetch(`https://api.shngm.io/v1/sys/get-user-by-email?email=${mail}`)
				const json = await response.json()
				
				if(response.status === 404) {
					setErrors((prevState) => ({
						...prevState,
						email: "Silakan masukkan email yang valid dan sudah terdaftar di platform kami.",
					}));
					return
				}

				setFormData((prev) => ({
					...prev,
					userId: json.data.user_id
				}))
			}

			if(isLastStep) {
				const request = await fetch(`/api/confirm`, { method: 'POST', body: JSON.stringify(formData) })
				if(request.status !== 200) {
					setErrors((prevState) => ({
						...prevState,
						confirmError: "Oh no, something went wrong. Please try again.",
					}));
					return
				} else {
					setErrors((prevState) => ({
						...prevState,
						confirmError: "",
					}));
				}

				const json: ResponseData = await request.json()
				setPaymentData({
					...json.data!
				})
			}

			nextStep();
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
    
  };

  return (
    <div
      className={`flex justify-between ${
        currentStepIndex === 1 ? "min-h-[600px] md:min-h-[500px]" : "min-h-[500px]"
      } w-11/12 max-w-4xl relative m-1 rounded-lg border border-neutral-700 bg-[#262626] p-4`}
    >
      {showSuccessMsg || currentStepIndex === 0 ? (
        ""
      ) : (
        <SideBar currentStepIndex={currentStepIndex} goTo={goTo} />
      )}
      <main
        className={`${showSuccessMsg || currentStepIndex === 0 ? "w-full" : "w-full md:mt-5 md:w-[65%]"}`}
      >
        {showSuccessMsg ? (
          <AnimatePresence mode="wait">
            <SuccessMessage {...paymentData} />
          </AnimatePresence>
        ) : (
          <form
            onSubmit={handleOnSubmit}
            className="w-full flex flex-col justify-between h-full"
          >
            <AnimatePresence mode="wait">
							{currentStepIndex === 0 && (
								<Banner
									key="step1"
								/>
							)}
              {currentStepIndex === 1 && (
                <UserInfoForm
                  key="step2"
                  {...formData}
                  updateForm={updateForm}
                  errors={errors}
                />
              )}
              {currentStepIndex === 2 && (
                <SupportMessage key="step3" {...formData} updateForm={updateForm} />
              )}
              {currentStepIndex === 3 && (
                <PaymentMethod key="step4" {...formData} updateForm={updateForm} />
              )}
              {currentStepIndex === 4 && (
                <Summary key="step5" {...formData} goTo={goTo} />
              )}
            </AnimatePresence>
            <div className="w-full items-center flex justify-between">
              <div className="">
                <Button
                  onClick={previousStep}
                  type="button"
                  variant="ghost"
                  className={`${
                    isFirstStep
                      ? "invisible"
                      : "visible p-0 text-neutral-200 hover:text-white"
                  }`}
                >
                  Go Back
                </Button>
              </div>
              <div className="flex items-center">
                <div className="relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
                  <Button
										disabled={loading || (isLastStep && (formData.name === "" || formData.email === "" || formData.userId === ""))}
                    type="submit"
                    className="relative text-neutral-200 bg-neutral-900 border border-black/20 shadow-input shadow-black/10 rounded-xl hover:text-white"
                  >
										{loading ? 
											<Loader className="w-6 h-6 animate-spin" /> : 
                    		isLastStep ? "Confirm" : "Next Step"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
