import { useState } from "react";
import { GoAlert } from "react-icons/go";

interface Props {
  onClose: () => void;
}

const DemoModal = ({ onClose }: Props) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDontShowAgain(event.target.checked);
  };

  const handleSubmit = () => {
    if (dontShowAgain) localStorage.setItem("hideDemoModal", "true");
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col justify-center items-center gap-1">
        <div className="text-5xl text-amber-400">
          <GoAlert />
        </div>
        {/* <h3 className="text-neutral-600 font-semibold text-sm">ATTENTION</h3> */}
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
        <button
          type="submit"
          className={`py-2 px-6 font-medium text-white rounded w-fit bg-blue-800 cursor-pointer`}
        >
          Accept
        </button>
      </div>
    </form>
  );
};

export default DemoModal;