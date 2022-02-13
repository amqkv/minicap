test("two plus two is four", () => {
    //just making sure jest actually runs
    expect(2 + 2).toBe(4);
});

test("quick maths", () => {
    expect("quick" + " maths").toBe("quick maths");
});
