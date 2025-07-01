import { useState } from "react";
import { FormItems } from "@/app/page";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormWrapper from "./FormWrapper";
import qrisImg from "../public/assets/qris.svg";
import danaImg from "../public/assets/dana.svg";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

type Method = "qris" | "dana";

const PaymentMethod = ({ paymentMethod, method, updateForm }: stepProps) => {

	const [methodSelected, setMethodSelected] = useState<Method>(method!);

  const handleValueChange = (methodSelected: Method) => {
    if (methodSelected) {
      setMethodSelected(methodSelected);
      updateForm({ method: methodSelected });
    }
  };

  return (
    <FormWrapper
      title="Pick a payment method"
      description="We accept QRIS and DANA, choose one of them."
    >
      <div className="flex flex-col gap-3">
				<RadioGroup value={methodSelected} onValueChange={handleValueChange}>
					{paymentMethod.map((payment) => (
						<div
							className={`border border-neutral-600 flex items-center gap-3 p-3 rounded-md ${
								payment.id ? "border-[#77f6aa] bg-neutral-900" : ""
							} focus:border-[#77f6aa] outline-none hover:border-[#77f6aa] md:gap-5 md:p-5`}
							key={payment.id}
						>
							<RadioGroupItem value={payment.value} id={`payment-${payment.id}`} />
							<div className="w-full flex items-center justify-between">
								<div className="flex flex-col">
									<label
										htmlFor={`payment-${payment.id}`}
										className="text-white font-semibold"
									>
										{payment.title}
									</label>
									<p className="text-sm">{payment.subtitle}</p>
								</div>
								<Image src={payment.value === "qris" ? qrisImg : danaImg} alt={payment.title} width="40" height="40" />
							</div>
						</div>
					))}
				</RadioGroup>
      </div>
    </FormWrapper>
  );
};

export default PaymentMethod;
