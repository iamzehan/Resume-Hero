"use client";
import { useEffect, useRef, useState } from "react";
import {EditSquare, Visibility} from '@mui/icons-material';
export default function Navigation({setPath}:{setPath:(path:string)=> void}) {
  const [active, setActive] = useState<number>(0);

  // Strongly typed refs
  const navRef = useRef<HTMLUListElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!navRef.current || !sliderRef.current) return;

    const items = navRef.current.querySelectorAll<HTMLLIElement>(".nav-item");
    const activeItem = items[active];

    if (!activeItem) return;

    sliderRef.current.style.width = `${activeItem.offsetWidth}px`;
    sliderRef.current.style.left = `${activeItem.offsetLeft}px`;

    if(active===0){
        setPath("Edit");
    }
    else if(active===1){
        setPath("Preview");
    }
  }, [active, setPath]);

  return (
    <div
      className="
      flex flex-row w-full md:w-screen justify-center items-center shadow 
      fixed top-0 left-0 dark:bg-zinc-950/30 backdrop-blur-2xl
    "
    >
      <nav className="relative bg-transparent">
        <ul ref={navRef} className="navigation flex space-x-8 px-6 py-4">
          <li
            className={`nav-item cursor-pointer font-medium 
              ${
                active === 0 ? "text-blue-500" : "text-gray-700 dark:text-white"
              }
            `}
            onClick={() => setActive(0)}
          >
            Edit <EditSquare fontSize="small"/>
          </li>

          <li
            className={`nav-item cursor-pointer font-medium 
              ${
                active === 1 ? "text-blue-500" : "text-gray-700 dark:text-white"
              }
            `}
            onClick={() => setActive(1)}
          >
            <a href="#Preview">
                Preview <Visibility fontSize="small"/>
                </a>
          </li>
        </ul>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="slider absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-300"
        />
      </nav>
    </div>
  );
}
