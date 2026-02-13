import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import Step7 from "./steps/Step7";
import Step8 from "./steps/Step8";

/*
Form Data Structure
*/
const initialData = {
  relationship: "",
  yourName: "",
  showYourName: true,
  partnerName: "",
  feelings: [],
  memoryEnabled: false,
  memoryType: "",
  memoryText: "",
  appreciation: "",
  appreciationCustom: "",
  future: "",
  tone: "",
  photo: null,
};

export default function LoveForm({ gender }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialData);

  const next = () => setStep((s) => Math.min(s + 1, 8));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const progress = (step / 8) * 100;

  return (
    <div className="fade-in-up" style={{ width: "100%" }}>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      {/* STEP SWITCH */}
      {step === 1 && <Step1 form={form} update={update} next={next} />}
      {step === 2 && <Step2 form={form} update={update} next={next} back={back} />}
      {step === 3 && <Step3 form={form} update={update} next={next} back={back} />}
      {step === 4 && <Step4 form={form} update={update} next={next} back={back} />}
      {step === 5 && <Step5 form={form} update={update} next={next} back={back} />}
      {step === 6 && <Step6 form={form} update={update} next={next} back={back} />}
      {step === 7 && <Step7 form={form} update={update} next={next} back={back} />}
      {step === 8 && <Step8 form={form} update={update} back={back} />}

    </div>
  );
}
