const acquireColourArray = () => {
  const array = [
    {
      colour: "rgba(0,255,232, 1)",
      shadow: "0 0 20px 1px rgba(0,255,232, 0.300)"
    },
    {
      colour: "rgba(255,0,248, 1)",
      shadow: "0 0 20px 1px rgba(255,0,248, 0.300)"
    },
    {
      colour: "rgba(184,2,249, 1)",
      shadow: "0 0 20px 1px rgba(184,2,249, 0.300)"
    },
    {
      colour: "rgba(47,251,1, 1)",
      shadow: "0 0 20px 1px rgba(47,251,1, 0.300)"
    },
    {
      colour: "rgba(251,126,0, 1)",
      shadow: "0 0 20px 1px rgba(251,126,0, 0.300)"
    },
    {
      colour: "rgba(0,30,255, 1)",
      shadow: "0 0 20px 1px rgba(0,30,255, 0.300)"
    },
    {
      colour: "rgba(235,255,0, 1)",
      shadow: "0 0 20px 1px rgba(235,255,0, 0.300)"
    },
    { colour: "rgba(255,0,0, 1)", shadow: "0 0 20px 1px rgba(255,0,0, 0.300)" }
  ];
  return array[Math.floor(Math.random() * array.length)];
};

export default acquireColourArray;

// rgba(0,255,232, 1)
// rgba(255,0,248, 1)
// rgba(184,2,249, 1)
// rgba(47,251,1, 1)
// rgba(251,126,0, 1)
// rgba(0,30,255, 1)
// rgba(235,255,0, 1)
// rgba(255,0,0, 1)