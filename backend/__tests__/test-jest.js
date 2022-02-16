test("two plus two is four", () => {
    // just making sure jest actually runs
    expect(2 + 2).toBe(4);
});

test("quick maths", () => {
    // eslint-disable-next-line no-useless-concat
    expect("quick" + " maths").toBe("quick maths");
});
