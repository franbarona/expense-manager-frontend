import { useState } from "react";
import { ActionButton } from "./ui/ActionButtonComponent";
import { Link } from "react-router-dom";

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
        <h3 className="text-xl text-amber-400">Important</h3>
        <h1 className='text-4xl text-center font-semibold text-primary'>Demo Mode.</h1>
      </div>
      <div className="space-y-4 text-secondary text-center">
        <p> This is a <span className="text-primary font-semibold">trial version</span> of an expense management app developed by
          <Link to="https://www.franbarona.dev" target="_blank" rel="noopener noreferrer" className="underline"> ©franbarona.dev</Link> </p>
        <p> The data you see is fictitious and stored locally in your browser (not on servers).</p>
        <p> Feel free to explore all its features.</p>
        <p> You can create, update, or delete transactions and categories, and interact freely with the existing data.</p>
        <p> The app full responsive and can be used on different screen sizes, but it's primarily designed for desktop use.</p>
      </div>
      <div className="flex justify-center mt-15">
        <input
          type="checkbox"
          id="dontShowAgain"
          checked={dontShowAgain}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="dontShowAgain" className="ml-2 text-[var(--color-text-secondary)]" >
          Do not show this message again
        </label>
      </div>

      <div className='flex justify-center gap-2'>
        <ActionButton label="Accept" />
      </div>
    </form>
  );
};

export default DemoModal;