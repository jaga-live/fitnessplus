// import React, { useState } from "react";
// import { withRouter } from "react-router";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
// } from "reactstrap";

// const Sidebar = (props) => {
//   const [collapsed, setCollapsed] = useState(true);

//   const toggleNavbar = () => setCollapsed(!collapsed);

//   const goto = (event, to) => {
//     event.preventDefault();
//     props.history.push(to);
//     toggleNavbar();
//   };

//   return (
//     <div style={props.style}>
//       <Navbar color="faded" light style={props.style}>
//         <NavbarBrand href="/" className="mr-auto">
//           {props.heading}
//         </NavbarBrand>
//         <NavbarToggler onClick={toggleNavbar} className="mr-2" />
//         <Collapse isOpen={!collapsed} navbar>
//           <Nav navbar>
//             <br />
//             {props.routes.map((el, index) => (
//               <NavItem key={index}>
//                 <NavLink href="#" onClick={(event) => goto(event, el.to)}>
//                   <p className="bold large">{el.name}</p>
//                 </NavLink>
//               </NavItem>
//             ))}
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// };

// export default withRouter(Sidebar);

import React, { Fragment, useEffect, useState } from "react";
import "./Sidebar.css";
import { withRouter } from "react-router";
import $ from "jquery";

const Sidebar = (props) => {
  const [checked, setChecked] = useState(false);
  const [activeRoute, setActiveRoute] = useState(props.location.pathname);

  useEffect(() => {
    console.log(window.location.href);
    // if (
    //   props.location.pathname !== undefined &&
    //   props.location.pathname !== null
    // ) {
    //   setActiveRoute(props.location.pathname);
    // } else {
    //   setActiveRoute("");
    // }

    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.getElementById("navbar") !== null &&
        document.getElementById("navbar") !== undefined
      ) {
        if (
          document.body.scrollTop > 10 ||
          document.documentElement.scrollTop > 10
        ) {
          document.getElementById("navbar").style.padding = "0px 20px";
          document.getElementById("navbar").style.width = "100vw";
        } else {
          document.getElementById("navbar").style.padding = "10px 20px";
          document.getElementById("navbar").style.width = "95vw";
        }
      }
    }
    $(document).ready(function () {
      $(".nav .dropdown-menu")
        .prev("a")
        .on("click", function (e) {
          e.preventDefault();
          $(this).parent().find(".dropdown-menu").slideToggle();
        });
    });

    $(document).ready(function () {
      function moveMarker() {
        var activeNav = $(".active-route a");
        var activewidth = $(activeNav).width();
        var activePadLeft = parseFloat($(activeNav).css("padding-left"));
        var activePadRight = parseFloat($(activeNav).css("padding-right"));
        var totalWidth = activewidth + activePadLeft + activePadRight;

        var precedingAnchorWidth = anchorWidthCounter();

        // TODO:
        // Find the total widths of all of the anchors
        // to the left of the active anchor.
        var activeMarker = $(".active-marker");
        if ($(".active-route a").hasClass(".hide-marker")) {
          $(activeMarker).css("display", "none");
          $(activeMarker).css("left", precedingAnchorWidth + 40);
        } else {
          $(activeMarker).css("display", "block");

          $(activeMarker).css("width", totalWidth);

          $(activeMarker).css("left", precedingAnchorWidth + 40);
        }

        // TODO:
        // Using the calculated total widths of preceding anchors,
        // Set the left: css value to that number.
      }
      moveMarker();

      function anchorWidthCounter() {
        var anchorWidths = 0;
        var a;
        var aWidth;
        var aPadLeft;
        var aPadRight;
        var aTotalWidth;
        $(".nav-links li").each(function (index, elem) {
          var activeTest = $(elem).hasClass("active-route");
          if (activeTest) {
            // Break out of the each function.
            return false;
          }

          a = $(elem).find("a");
          aWidth = a.width();
          aPadLeft = parseFloat(a.css("padding-left"));
          aPadRight = parseFloat(a.css("padding-right"));
          aTotalWidth = aWidth + aPadLeft + aPadRight;

          anchorWidths = anchorWidths + aTotalWidth;
        });

        return anchorWidths;
      }

      $(".nav-links a").click(function (e) {
        e.preventDefault();
        $(".nav-links li").removeClass("active-route");
        $(this).parents("li").addClass("active-route");
        moveMarker();
      });
    });
  }, [window.location.href]);

  // useEffect(() => {
  //   console.log("hello");
  // }, []);

  const goto = (event, to) => {
    event.preventDefault();
    props.history.push(to);
    toggle();
  };

  const toggle = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Fragment>
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <div className="nav-header">
            <div className="logo">
              {/* <a href="#">Furkan Giray</a> */}
              {props.heading}
            </div>
          </div>

          <input
            type="checkbox"
            checked={checked}
            id="menu-toggle"
            onClick={toggle}
          />
          {props.showOnMobile ? (
            <div className="show-on-mobile">{props.showOnMobile}</div>
          ) : null}
          <label htmlFor="menu-toggle" className="menu-show">
            <i className="fa fa-bars"></i>
          </label>

          <div className="nav">
            <ul className="nav-links">
              {props.routes.map((el, index) =>
                el.dropdown ? (
                  <li
                    className={
                      "nav-item has-dropdown indicate-active drop" +
                      (el.dropdown.options.some((elem) =>
                        window.location.href.includes(elem.to)
                      )
                        ? " active-route"
                        : // : activeRoute === ""
                          // ? el.initialActive
                          //   ? " active-route"
                          //   : ""
                          "")
                      // (el.dropdown.options.some(
                      //   (elem) => elem.to === activeRoute
                      // )
                      //   ? " active-route"
                      //   : activeRoute === ""
                      //   ? el.initialActive
                      //     ? " active-route"
                      //     : ""
                      //   : "")
                      // (el.initialActive ? " active-route" : "")
                    }
                    key={index}
                  >
                    <a href="#" className="nav-link font">
                      {el.dropdown.heading}
                    </a>
                    <ul className="dropdown-menu">
                      {el.dropdown.options.map((ele, ind) => (
                        <li className="nav-item" key={ind}>
                          <a
                            className="nav-link font"
                            href="#"
                            onClick={(event) => goto(event, ele.to)}
                          >
                            {ele.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : el.component ? (
                  <li
                    className={
                      "nav-item nav-component indicate-active" +
                      (window.location.href.includes(el.to)
                        ? " active-route"
                        : "")
                      // (el.initialActive ? " active-route" : "")
                    }
                    key={index}
                    onClick={(event) => goto(event, el.to)}
                  >
                    <a
                      style={{ visibility: "hidden" }}
                      className="hide-marker"
                    ></a>
                    {el.component}
                  </li>
                ) : (
                  <li
                    className={
                      "nav-item indicate-active" +
                      (window.location.href.includes(el.to)
                        ? " active-route"
                        : "")
                      // (activeRoute === el.to
                      //   ? " active-route"
                      //   : activeRoute === ""
                      //   ? el.initialActive
                      //     ? " active-route"
                      //     : ""
                      //   : "")
                    }
                    key={index}
                  >
                    <a
                      href="#"
                      onClick={(event) => goto(event, el.to)}
                      className="nav-link font"
                    >
                      {el.name}
                    </a>
                  </li>
                )
              )}

              <label htmlFor="menu-toggle" className="menu-hide">
                <i className="fa fa-times"></i>
              </label>
            </ul>
            <i className="active-marker drop"></i>
          </div>
        </div>
      </nav>
      <div className="dummy-div"></div>
    </Fragment>
  );
};

export default withRouter(Sidebar);
