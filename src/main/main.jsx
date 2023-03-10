import React, { useState, useEffect, useRef } from "react";
// set screen size options with react-responsive
import MediaQuery, { useMediaQuery } from "react-responsive";
import hamburgerIcon from "../img/white-hamburger.png";
import About from "./pages/aboutMe";
import Portfolio from "./pages/portfolio";
import Resume from "./pages/resume";
import Contact from "./pages/contact";
import Footer from "./footer/footer";
import { footerLinks } from "../helpers/footerLinks";

/* TODO:
1) make buttons clickable
3) change font
3) finishing touches
4) refactor (split MediaQuery into different components?  Use one component with a ternary switch for the menu?)
*/

export default function Main({ menuList }) {
  const [currentPage, setCurrentPage] = useState("About");

  function renderTab() {
    switch (currentPage) {
      case "About":
        return <About />;
      case "Portfolio":
        return <Portfolio />;
      case "Contact":
        return <Contact />;
      case "Resume":
        return <Resume />;
      default:
        return <About />;
    }
  }

  const pageHandler = (page) => setCurrentPage(page);

  // sets default state of dropdown menu to be closed
  const [open, setOpen] = useState(false);

  // reference for making the mobile dropdown menu usable
  const menuRef = useRef(null);

  // logic that allows for hooks to be used only at certain device sizes
  const isPhone = useMediaQuery({ query: "(max-width: 639px)" });

  // handles the dropdown menu on mobile
  useEffect(() => {
    if (isPhone) {
      const eventHandler = (e) => {
        // allows for the dropdown menu to be closed by clicking anywhere on the page
        if (!menuRef.current.contains(e.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", eventHandler);
      return () => {
        document.removeEventListener("mousedown", eventHandler);
      };
    } else {
      return;
    }
  });

  return (
    // "fixed top-0 w-full" makes the header sticky to top of page.
    // if header height is changed, change component "margin top" by the same amount.  for example, "h-24" for header means "mt-24" is needed for each subcomponent
    <div className="app flex flex-col h-full min-h-screen">
      {/* if screen size is 639px or less */}
      <MediaQuery maxWidth={639}>
        <header className="bg-stone-800 flex justify-between pb-2">
          <h3 className="text-3xl font-medium leading-7">
            Colin Marshall
            <br />
            <span className="text-2xl font-medium">
              Full-Stack Web Developer
            </span>
          </h3>
          {/* onClick toggles boolean switch */}
          <div className="menu-container" ref={menuRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <img
                className="absolute top-7 right-7 h-10 w-10 overflow-hidden cursor-pointer"
                src={hamburgerIcon}
                alt="Menu Button"
              />
            </div>
            <div
              className={`dropdown absolute top-24 right-5 bg-stone-500 pt-2 pr-5 before:content-[''] before:absolute before:-top-1 before:right-5 before:h-5 before:w-5 before:bg-stone-500 before:rotate-45 ${
                open
                  ? "active opacity-100 visible translate-y-0 duration-500"
                  : "inactive opacity-0 invisible -translate-y-3 duration-500"
              }`}
            >
              <ul>
                {menuList.map((item) => {
                  return (
                    <li key={item.id} onClick={() => pageHandler(item.name)}>
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </header>
        {renderTab()}
        <Footer footerLinks={footerLinks} />
      </MediaQuery>
      {/* if screen size is 640px or more */}
      <MediaQuery minWidth={640}>
        <header className="bg-stone-800 flex justify-between m-2">
          <h3 className="text-3xl font-medium leading-7">
            Colin Marshall
            <br />
            <span className="text-2xl font-medium">
              Full-Stack Web Developer
            </span>
          </h3>
          <div className="text-white mt-2">
            {/* className="hover:text-gray-300 px-3" */}
            <button
              className={
                currentPage === "About"
                  ? "text-gray-400 px-3"
                  : "hover:text-gray-300 px-3"
              }
            >
              <a href="#about" onClick={() => pageHandler("About")}>
                About Me
              </a>
            </button>
            <button className={
                currentPage === "Portfolio"
                  ? "text-gray-400 px-3"
                  : "hover:text-gray-300 px-3"
              }>
              <a href="#portfolio" onClick={() => pageHandler("Portfolio")}>
                Portfolio
              </a>
            </button>
            <button
              className={
                currentPage === "Contact"
                  ? "text-gray-400 px-3"
                  : "hover:text-gray-300 px-3"
              }
              onClick={() => pageHandler("Contact")}
            >
              <a href="#contact">Contact</a>
            </button>
            <button
              className={
                currentPage === "Resume"
                  ? "text-gray-400 px-3"
                  : "hover:text-gray-300 px-3"
              }
              onClick={() => pageHandler("Resume")}
            >
              <a href="#resume">Resume</a>
            </button>
          </div>
        </header>
        {renderTab()}
        <Footer footerLinks={footerLinks} />
      </MediaQuery>
    </div>
  );
}
