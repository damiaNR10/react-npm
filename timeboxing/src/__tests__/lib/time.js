import { getMinutesAndSecondsFromDurationInSeconds} from '../../lib/time.js'

describe("getMinutesAndSecondsFromDurationInSeconds", () => {

    describe("for durations shorter than one minute", () => {

        test("returns 30 seconds for 30 seconds duration", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(30)[1]
            ).toBe(30);
        });
    
        test("returns 0 minutes for 30 seconds duration", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(30)[0]
            ).toBe(0);
        });
    });

    describe("for durations logner or equal to one minute", () => {
        
        test("returns 2 minutes and 20 seconds for 140 seconds duration", () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(140)
            ).toEqual([2, 20]);
        });
    
        it('returns 1 minute for 60 seconds duration', () => {
            expect(
                getMinutesAndSecondsFromDurationInSeconds(60)
            ).toEqual([1, 0]);
        });
    });
});