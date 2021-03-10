import { getMinutesAndSecondsFromDurationInSeconds} from '../../lib/time.js'

test("getMinutesAndSecondsFromDurationInSeconds works for 30 seconds", () => {
    expect(
        getMinutesAndSecondsFromDurationInSeconds(30)
    ).toEqual([0, 30]);
});

test("getMinutesAndSecondsFromDurationInSeconds returns 30 seconds for 30 seconds duration", () => {
    expect(
        getMinutesAndSecondsFromDurationInSeconds(30)[1]
    ).toBe(30);
});

test("getMinutesAndSecondsFromDurationInSeconds returns 0 minutes for 30 seconds duration", () => {
    expect(
        getMinutesAndSecondsFromDurationInSeconds(30)[0]
    ).toBe(0);
});