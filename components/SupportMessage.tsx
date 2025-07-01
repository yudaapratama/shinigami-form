import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "@/components/ui/label";
import { FormItems } from "../app/page";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const SupportMessage = ({
  message,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Support message"
      description="Input your message here."
    >
      <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="message">Message</Label>
					<Textarea 
						autoFocus 
						name="message" 
						id="message"
						placeholder="e.g. Shinigami is the best!" 
						value={message} 
						onChange={(e) => updateForm({ message: e.target.value })} 
						className="w-full" 
					/>
        </div>
      </div>
    </FormWrapper>
  );
};

export default SupportMessage;
