// Stand-in for next/font/google in the Vite docs app.
// Returns empty class names; text falls back to the surrounding font stack.
type FontOptions = {
  subsets?: string[];
  weight?: string[] | string;
  style?: string[] | string;
  variable?: string;
  display?: string;
};

type FontResult = { className: string; variable: string; style: { fontFamily: string } };

function makeFont(family: string) {
  return (_options?: FontOptions): FontResult => ({
    className: "",
    variable: "",
    style: { fontFamily: `"${family}", serif` },
  });
}

export const Instrument_Serif = makeFont("Instrument Serif");
export const Space_Grotesk = makeFont("Space Grotesk");
export const Inter = makeFont("Inter");
export const Geist = makeFont("Geist");
