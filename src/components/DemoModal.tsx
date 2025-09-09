import { useState } from "react";
import { GoAlert } from "react-icons/go";
import { ActionButton } from "./ui/ActionButtonComponent";

interface Props {
  action: () => void;
}

const DemoModal = ({ action }: Props) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDontShowAgain(event.target.checked);
  };

  const handleSubmit = () => {
    if (dontShowAgain) localStorage.setItem("hideDemoModal", "true");
    action();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="text-5xl text-amber-400">
          <GoAlert />
        </div>
        <h2 className='text-2xl text-center font-semibold text-black'>DEMO MODE</h2>
      </div>
      <div className="space-y-4 text-gray-600">
        <p>This is a <span className="text-black font-semibold">trial version</span> of an expense management app.</p>
        <p>The data you see is fictitious and stored locally in your browser (not on servers).</p>
        <p> Please feel free to discover all its features and create and interact with current data. </p>
      </div>
      <div className="flex justify-center">
        <input
          type="checkbox"
          id="dontShowAgain"
          checked={dontShowAgain}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="dontShowAgain" className="ml-2 " >
          Do not show this message again
        </label>
      </div>

      <div className='flex justify-center gap-2'>
        <ActionButton label="Accept"/>
      </div>
    </form>
  );
};

export default DemoModal;