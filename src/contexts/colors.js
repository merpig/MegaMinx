import { useState, createContext, useMemo } from 'react';

const faceColorsValues = {
  'face-one': "#0000ff",  // 1
  'face-two': "#ff80ce",  // 2
  'face-three': "#d7ff72",  // 3
  'face-four': "#ffff00",  // 4
  'face-five': "#ffffff",  // 5
  'face-six': "#ff0000",  // 6
  'face-seven': "#00d8ff",  // 7 
  'face-eight': "#e8d7b2",  // 8 
  'face-nine': "#8f8983",  // 9 
  'face-ten': "#ff6b22",  // 10
  'face-eleven': "#8b2381", // 11
  'face-twelve': "#00ff00"  // 12
};

export const ColorsContext = createContext({});

function ColorsProvider({children}) {
  const [colors, setColors] = useState(faceColorsValues);

  const colorsArray = useMemo(() => 
        Object.entries(colors)
    , [colors]); 

  function changeColors(newColors) {
    setColors(newColors);
  }

  return (
    <ColorsContext.Provider value={{changeColors, colors, colorsArray}}>
      {children}
    </ColorsContext.Provider>
  );
}

export default ColorsProvider;