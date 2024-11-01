import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook , used here to select the copied text
  const passwordRef = useRef(null);

  const CopyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()~";

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto rounded-lg text-orange-600 bg-gray-800 py-6 px-4 my-10 sm:my-20 md:max-w-xl lg:max-w-2xl">
        <h1 className="text-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          Password Generator
        </h1>

        <div className="flex shadow-sm overflow-hidden mb-4 rounded-lg my-2">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-sm sm:text-base"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={CopyPassword}
            className="p-2 bg-black text-white text-xs sm:text-sm md:text-base px-4 sm:px-6 transform transition duration-200 ease-in-out active:scale-90 hover:bg-gray-700"
          >
           Copy
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:text-sm">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={55}
              value={length}
              className="cursor-pointer mx-1 sm:mx-2"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="text-white">Length: {length}</label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="text-white">
              Numbers
            </label>
          </div>

          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
