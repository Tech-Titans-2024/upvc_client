import React, { useState } from "react";

const Menu = () => {
  const [selectedOptions, setSelectedOptions] = useState({
    windows: false,
    doors: false,
    louvers: false,
  });

  const [louverOptions, setLouverOptions] = useState({
    withFan: false,
    withoutFan: false,
  });
  

  const [doorOptions, setDoorOptions] = useState({
    restRoomDoor: false,
    bedRoomDoor: false,
    mainDoor: false,
  });

  const [bedRoomDoorOptions, setBedRoomDoorOptions] = useState({
    fullyCovered: false,
    semiCovered: false,
  });

  const [mainDoorOptions, setMainDoorOptions] = useState({
    fullyCovered: false,
    semiCovered: false,
  });

  const [windowOptions, setWindowOptions] = useState({
    fixedWindows: false,
    slidingWindows: false,
    openWindows: false,
  });

  const [slidingWindowOptions, setSlidingWindowOptions] = useState({
    track2: false,
    track25: false,
    slidingWithMesh: false,
    slidingWithoutMesh: false,
    fixedWithoutMesh: false,
    fixedWithMesh: false,
    track3: false,
  });

  const [openWindowOptions, setOpenWindowOptions] = useState({
    singleOpen: false,
    singleOpenWithFixed: false,
    doubleOpen: false,
    tripleOpen: false,
    fourthOpen: false,
  });

  const handleSelection = (option, stateUpdater) => {
    stateUpdater((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            onChange={() =>
              setSelectedOptions((prev) => ({ ...prev, doors: !prev.doors }))
            }
            checked={selectedOptions.doors}
          />
          Doors
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              setSelectedOptions((prev) => ({ ...prev, windows: !prev.windows }))
            }
            checked={selectedOptions.windows}
          />
          Windows
        </label>
        <label>
          <input
            type="checkbox"
            onChange={() =>
              setSelectedOptions((prev) => ({ ...prev, louvers: !prev.louvers }))
            }
            checked={selectedOptions.louvers}
          />
          Louvers
        </label>
      </div>

      {selectedOptions.doors && (
        <div className="doors">
          <h3>Door Options</h3>
          <label>
            <input
              type="checkbox"
              onChange={() => handleSelection("restRoomDoor", setDoorOptions)}
              checked={doorOptions.restRoomDoor}
            />
            Rest Room Door
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => handleSelection("bedRoomDoor", setDoorOptions)}
              checked={doorOptions.bedRoomDoor}
            />
            Bed Room Door
          </label>
          {doorOptions.bedRoomDoor && (
            <div className="bedroom-door-options">
              <h4>Bed Room Door Options</h4>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("fullyCovered", setBedRoomDoorOptions)
                  }
                  checked={bedRoomDoorOptions.fullyCovered}
                />
                Fully Covered UPVC Panel Door
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("semiCovered", setBedRoomDoorOptions)
                  }
                  checked={bedRoomDoorOptions.semiCovered}
                />
                Semi-Covered UPVC Panel Door with Glass
              </label>
            </div>
          )}
          <label>
            <input
              type="checkbox"
              onChange={() => handleSelection("mainDoor", setDoorOptions)}
              checked={doorOptions.mainDoor}
            />
            Main Door
          </label>
          {doorOptions.mainDoor && (
            <div className="main-door-options">
              <h4>Main Door Options</h4>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("fullyCovered", setMainDoorOptions)
                  }
                  checked={mainDoorOptions.fullyCovered}
                />
                Fully Covered UPVC Panel Door
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("semiCovered", setMainDoorOptions)
                  }
                  checked={mainDoorOptions.semiCovered}
                />
                Semi-Covered UPVC Panel Door with Glass
              </label>
            </div>
          )}
        </div>
      )}

      {selectedOptions.windows && (
        <div className="windows">
          <h3>Window Options</h3>
          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleSelection("fixedWindows", setWindowOptions)
              }
              checked={windowOptions.fixedWindows}
            />
            Fixed Windows
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleSelection("slidingWindows", setWindowOptions)
              }
              checked={windowOptions.slidingWindows}
            />
            Sliding Windows
          </label>
          {windowOptions.slidingWindows && (
            <div className="sliding-window-options">
              <h4>Sliding Window Options</h4>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("track2", setSlidingWindowOptions)
                  }
                  checked={slidingWindowOptions.track2}
                />
                2 Track
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("track25", setSlidingWindowOptions)
                  }
                  checked={slidingWindowOptions.track25}
                />
                2.5 Track
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("slidingWithMesh", setSlidingWindowOptions)
                  }
                  checked={slidingWindowOptions.slidingWithMesh}
                />
                Sliding with Mesh
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("slidingWithoutMesh", setSlidingWindowOptions)
                  }
                  checked={slidingWindowOptions.slidingWithoutMesh}
                />
                Sliding without Mesh
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("fixedWithoutMesh", setSlidingWindowOptions)
                  }
                  checked={slidingWindowOptions.fixedWithoutMesh}
                />
                Fixed without Mesh
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("fixedWithMesh", setSlidingWindowOptions)
                  }
                  checked={slidingWindowOptions.fixedWithMesh}
                />
                Fixed with Mesh
              </label>
            </div>
          )}
          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleSelection("openWindows", setWindowOptions)
              }
              checked={windowOptions.openWindows}
            />
            Open Windows
          </label>
          {windowOptions.openWindows && (
            <div className="open-window-options">
              <h4>Open Window Options</h4>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("singleOpen", setOpenWindowOptions)
                  }
                  checked={openWindowOptions.singleOpen}
                />
                Single Open
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("singleOpenWithFixed", setOpenWindowOptions)
                  }
                  checked={openWindowOptions.singleOpenWithFixed}
                />
                Single Open with Fixed
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("doubleOpen", setOpenWindowOptions)
                  }
                  checked={openWindowOptions.doubleOpen}
                />
                Double Open
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("tripleOpen", setOpenWindowOptions)
                  }
                  checked={openWindowOptions.tripleOpen}
                />
                Triple Open
              </label>
              <label>
                <input
                  type="checkbox"
                  onChange={() =>
                    handleSelection("fourthOpen", setOpenWindowOptions)
                  }
                  checked={openWindowOptions.fourthOpen}
                />
                Fourth Open
              </label>
            </div>
          )}
        </div>
      )}

      {selectedOptions.louvers && (
        <div className="louvers">
          <h3>Louver Options</h3>
          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleSelection("withFan", setLouverOptions)
              }
              checked={louverOptions.withFan}
            />
            With Fan
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() =>
                handleSelection("withoutFan", setLouverOptions)
              }
              checked={louverOptions.withoutFan}
            />
            Without Fan
          </label>
        </div>
      )}
    </div>
  );
};

export default Menu;




// <div className="flex flex-row justify-center">
// <table className="table-fixed border-collapse border border-black bg-white">
//   <thead>
//     <tr>
//       <th className="border border-black px-4 py-2">Doors</th>
//       <th className="border border-black px-4 py-2">Windows</th>
//       <th className="border border-black px-4 py-2">Louvers</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td className="border border-black px-4 py-2 align-top">
//         <label>
//           <input
//             type="checkbox"
//             onChange={() =>
//               setSelectedOptions((prev) => ({ ...prev, doors: !prev.doors }))
//             }
//             checked={selectedOptions.doors}
//           />
//           Doors
//         </label>
//         {selectedOptions.doors && (
//           <div className="mt-2">
//             <h3 className="font-bold">Door Options</h3>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() => handleSelection("bedRoomDoor", setDoorOptions)}
//                 checked={doorOptions.bedRoomDoor}
//               />
//               Bed Room Door
//             </label>
//             {doorOptions.bedRoomDoor && (
//               <div className="pl-4">
//                 <h4 className="font-semibold">Bed Room Door Options</h4>
//                 <label>
//                   <input
//                     type="checkbox"
//                     onChange={() =>
//                       handleSelection("fullyCovered", setBedRoomDoorOptions)
//                     }
//                     checked={bedRoomDoorOptions.fullyCovered}
//                   />
//                   Fully Covered UPVC Panel Door
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     onChange={() =>
//                       handleSelection("semiCovered", setBedRoomDoorOptions)
//                     }
//                     checked={bedRoomDoorOptions.semiCovered}
//                   />
//                   Semi-Covered UPVC Panel Door with Glass
//                 </label>
//               </div>
//             )}
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() => handleSelection("mainDoor", setDoorOptions)}
//                 checked={doorOptions.mainDoor}
//               />
//               Main Door
//             </label>
//             {doorOptions.mainDoor && (
//               <div className="pl-4">
//                 <h4 className="font-semibold">Main Door Options</h4>
//                 <label>
//                   <input
//                     type="checkbox"
//                     onChange={() =>
//                       handleSelection("fullyCovered", setMainDoorOptions)
//                     }
//                     checked={mainDoorOptions.fullyCovered}
//                   />
//                   Fully Covered UPVC Panel Door
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     onChange={() =>
//                       handleSelection("semiCovered", setMainDoorOptions)
//                     }
//                     checked={mainDoorOptions.semiCovered}
//                   />
//                   Semi-Covered UPVC Panel Door with Glass
//                 </label>
//               </div>
//             )}
//           </div>
//         )}
//       </td>
//       <td className="border border-black px-4 py-2 align-top">
//         <label>
//           <input
//             type="checkbox"
//             onChange={() =>
//               setSelectedOptions((prev) => ({ ...prev, windows: !prev.windows }))
//             }
//             checked={selectedOptions.windows}
//           />
//           Windows
//         </label>
//         {selectedOptions.windows && (
//           <div className="mt-2">
//             <h3 className="font-bold">Window Options</h3>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() =>
//                   handleSelection("fixedWindows", setWindowOptions)
//                 }
//                 checked={windowOptions.fixedWindows}
//               />
//               Fixed Windows
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() =>
//                   handleSelection("slidingWindows", setWindowOptions)
//                 }
//                 checked={windowOptions.slidingWindows}
//               />
//               Sliding Windows
//             </label>
//             {windowOptions.slidingWindows && (
//               <div className="pl-4">
//                 <h4 className="font-semibold">Sliding Window Options</h4>
//                 <label>
//                   <input
//                     type="checkbox"
//                     onChange={() =>
//                       handleSelection("track2", setSlidingWindowOptions)
//                     }
//                     checked={slidingWindowOptions.track2}
//                   />
//                   2 Track
//                 </label>
//                 <label>
//                   <input
//                     type="checkbox"
//                     onChange={() =>
//                       handleSelection("track25", setSlidingWindowOptions)
//                     }
//                     checked={slidingWindowOptions.track25}
//                   />
//                   2.5 Track
//                 </label>
//               </div>
//             )}
//           </div>
//         )}
//       </td>
//       <td className="border border-black px-4 py-2 align-top">
//         <label>
//           <input
//             type="checkbox"
//             onChange={() =>
//               setSelectedOptions((prev) => ({ ...prev, louvers: !prev.louvers }))
//             }
//             checked={selectedOptions.louvers}
//           />
//           Louvers
//         </label>
//         {selectedOptions.louvers && (
//           <div className="mt-2">
//             <h3 className="font-bold">Louver Options</h3>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() =>
//                   handleSelection("withFan", setLouverOptions)
//                 }
//                 checked={louverOptions.withFan}
//               />
//               With Fan
//             </label>
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() =>
//                   handleSelection("withoutFan", setLouverOptions)
//                 }
//                 checked={louverOptions.withoutFan}
//               />
//               Without Fan
//             </label>
//           </div>
//         )}
//       </td>
//     </tr>
//   </tbody>
// </table>
// </div>


