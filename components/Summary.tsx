"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import FormWrapper from "./FormWrapper";
import { Separator } from "@/components/ui/separator";
import { FormItems } from "@/app/page";
import qrisImg from "../public/assets/qris.svg";
import danaImg from "../public/assets/dana.svg";

type StepProps = FormItems & {
  goTo: (index: number) => void;
};

const FinalStep = ({ name, email, userId, message, paymentMethod, method }: StepProps) => {

  return (
    <FormWrapper
      title="Finishing Up"
      description="Double-check everything looks OK before confirming."
    >
      <div className="">
        <div className="bg-neutral-900 p-4 mt-2 rounded-md border border-neutral-700">
          <div className="flex justify-between items-center">
						<h4 className="font-semibold text-white">
							Name
						</h4>
            <p className="text-white text-sm">{name}</p>
          </div>
          <Separator className="my-4" />
					<div className="flex justify-between items-center">
						<h4 className="font-semibold text-white">
							Email
						</h4>
            <p className="text-white text-sm">{email}</p>
          </div>
          <Separator className="my-4" />
					<div className="flex justify-between items-center">
						<h4 className="font-semibold text-white">
							User ID
						</h4>
            <p className="text-white text-sm">{userId}</p>
          </div>
          <Separator className="my-4" />
					<div className="flex justify-between items-center">
						<h4 className="font-semibold text-white">
							Pesan
						</h4>
            <p className="text-white text-sm max-w-sm text-end ">
							{message === "" ? "-" : message}
						</p>
          </div>
          <Separator className="my-4" />
					<div className="flex justify-between items-center">
						<h4 className="font-semibold text-white">
							Metode Pembayaran
						</h4>
            <div className="flex flex-row gap-4 items-center">
							<Image src={method === "qris" ? qrisImg : danaImg} alt={method!} width="40" height="40" />
						</div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
};

export default FinalStep;
