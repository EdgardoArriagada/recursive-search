function findKeyInObject(originalInput, givenKey) {
  if (typeof originalInput !== "object") return [];
  if (originalInput === null) return [];

  const path = [];
  const founds = [];

  function recur(input) {
    return Object.keys(input).forEach((key) => {
      path.push(key);
      if (typeof input[key] === "object") recur(input[key]);
      if (key === givenKey) {
        founds.push(path.join("."));
      }
      path.pop(key);
    });
  }

  recur(originalInput);

  return founds;
}

describe("daily code problem", () => {
  test("deep 1", () => {
    const input = { dos: 2, uno: 1, tres: { miel: false } };

    const result = findKeyInObject(input, "miel");

    expect(result).toEqual(["tres.miel"]);
  });

  test("deep 2", () => {
    const input = {
      dos: 2,
      tres: { alpha: "asd", beta: { miel: "a" } },
      uno: 1,
    };

    const result = findKeyInObject(input, "miel");

    expect(result).toEqual(["tres.beta.miel"]);
  });

  test("multiple finds", () => {
    const input = {
      dos: 2,
      tres: { alpha: "asd", beta: { miel: "a" } },
      uno: 1,
      miel: "lol",
      sin: { miel: "m" },
    };

    const result = findKeyInObject(input, "miel");

    expect(result).toEqual(["tres.beta.miel", "miel", "sin.miel"]);
  });

  test("inside an array", () => {
    const input = { dos: 2, tres: [{ miel: "a" }] };

    const result = findKeyInObject(input, "miel");

    expect(result).toEqual(["tres.0.miel"]);
  });


  test("deep inside an array", () => {
    const input = {
      dos: 2,
      tres: [
        {
          alpha: [{ uno: 1 }, { dos: 2 }, { tres: { miel: "found" } }],
        },
      ],
    };

    const result = findKeyInObject(input, "miel");

    expect(result).toEqual(["tres.0.alpha.2.tres.miel"]);
  });

  test("multiple times", () => {
    const input = { miel: { miel: { miel: "a" } } };

    const result = findKeyInObject(input, "miel");

    expect(result).toEqual(["miel.miel.miel", "miel.miel", "miel"]);
  });

  test("not found", () => {
    const input = { "": 1, null: 2, false: 3 };

    const result = findKeyInObject(input, "miel");

    expect(result).toEqual([]);
  });

  test.each`
    input
    ${undefined}
    ${null}
    ${[]}
    ${"abcd"}
    ${1234}
  `('passing "$input"', ({ input }) => {
    const result = findKeyInObject(input, "miel");

    expect(result).toEqual([]);
  });
});
