import { render, screen } from "@testing-library/react";

// NOTE: useLayoutEffect runs after the ref is set, so the empty-node return is reached only when the ref cannot store the node.

const missingNodeRef = {} as { current: HTMLTextAreaElement | null };
Object.defineProperty(missingNodeRef, "current", {
  configurable: true,
  get: () => null,
  set: () => undefined,
});

jest.mock("react", () => {
  const actual = jest.requireActual<typeof import("react")>("react");

  return {
    ...actual,
    useRef: (initial: unknown) => {
      const stack = new Error().stack ?? "";
      if (stack.includes("TextareaField/index")) {
        return missingNodeRef;
      }
      return actual.useRef(initial);
    },
  };
});

import { TextareaField } from "~baseComponents";

describe("TextareaField missing node", () => {
  it("(6) Should skip resize when the textarea node is missing", () => {
    const scrollHeightSpy = jest
      .spyOn(HTMLTextAreaElement.prototype, "scrollHeight", "get")
      .mockReturnValue(140);

    render(
      <TextareaField
        id="textarea"
        aria-label="textarea field"
        labelText="Textarea label"
        value={"first line\nsecond line"}
      />,
    );

    expect(screen.getByTestId("TextAreaField_TEXTAREA").style.height).toBe("");
    scrollHeightSpy.mockRestore();
  });
});
