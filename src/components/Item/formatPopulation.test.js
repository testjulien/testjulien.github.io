import { formatpopulation } from "./formatPopulation.js";

describe("formatpopulation",()=>{

    test("devrait dooner 999",()=>{
        const result = formatpopulation(999);
        expect(result).toBe(999);
    });
    test("devrait dooner 999K",()=>{
        const result = formatpopulation(999999);
        expect(result).toBe("999 K");
    });
    test("devrait dooner 1.2M",()=>{
        const result = formatpopulation(1200000);
        expect(result).toBe("1.2 M");
    });

    


});