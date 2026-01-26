import { instructionsP305, passportP305 } from "./P305";
import { instructionsP601, passportP601 } from "./P601";
import { instructionsP608, passportP608 } from "./P608";
import { instructionsP2203, passportP2203 } from "./P2203";
import { instructionsP3061, passportP3061 } from "./P3061";
import { titles } from "./titles";

export const Services = {
  passport: {
    P2203: passportP2203,
    P305: passportP305,
    P601: passportP601,
    P608: passportP608,
    P3061: passportP3061,
    titles,
  },
  instructions: {
    P2203: instructionsP2203,
    P305: instructionsP305,
    P601: instructionsP601,
    P608: instructionsP608,
    P3061: instructionsP3061,
  },
};
