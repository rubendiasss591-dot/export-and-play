import { afterEach, expect, test } from "bun:test";
import { redirectWithParams } from "./redirect-with-params";

const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");

afterEach(() => {
  if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
  else Reflect.deleteProperty(globalThis, "window");
});

function redirect(search, destination) {
  const location = { search, href: "" };
  Object.defineProperty(globalThis, "window", { configurable: true, value: { location } });
  redirectWithParams(destination);
  return location.href;
}

test("without current parameters the destination remains unchanged", () => {
  expect(redirect("", "https://checkout.example/pay?id=123")).toBe("https://checkout.example/pay?id=123");
});

test("UTM, fbclid, gclid and arbitrary parameters are appended intact", () => {
  const search = "?utm_source=meta&utm_campaign=Banho%20Premium&fbclid=fb%2B123&gclid=gc%2F456&custom=a+b&custom=c&empty=";
  expect(redirect(search, "https://checkout.example/pay/123")).toBe("https://checkout.example/pay/123" + search);
});

test("existing destination parameters are retained before all current parameters", () => {
  expect(redirect("?utm_source=meta&fbclid=123&gclid=456", "https://checkout.example/pay?id=123"))
    .toBe("https://checkout.example/pay?id=123&utm_source=meta&fbclid=123&gclid=456");
});

test("home navigation also retains the entire query string", () => {
  expect(redirect("?utm_source=meta&fbclid=123&gclid=456", "/"))
    .toBe("/?utm_source=meta&fbclid=123&gclid=456");
});