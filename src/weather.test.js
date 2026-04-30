import { describe, it, expect } from "vitest";

const toFahrenheit = (c) => Math.ceil((c * 9) / 5 + 32);

const getWeatherBg = (temp) => {
  if (temp === null || temp === undefined) return "/images/default.jpg";
  if (temp >= 20) return "src/images/sunny.jpg";
  if (temp > 10 && temp < 20) return "src/images/cloudy.png";
  if (temp > 0 && temp < 10) return "src/images/grim.jpg";
  if (temp <= 0) return "src/images/Snowy.jpg";
  return "/images/default.jpg";
};

describe("temperature conversion", () => {
  it("converts 0°C to 32°F", () => {
    expect(toFahrenheit(0)).toBe(32);
  });
  it("converts 100°C to 212°F", () => {
    expect(toFahrenheit(100)).toBe(212);
  });
});

describe("getWeatherBg", () => {
  it("returns sunny for temp >= 20", () => {
    expect(getWeatherBg(25)).toBe("src/images/sunny.jpg");
  });
  it("returns snowy for temp <= 0", () => {
    expect(getWeatherBg(-5)).toBe("src/images/Snowy.jpg");
  });
  it("returns cloudy for temp between 10 and 20", () => {
    expect(getWeatherBg(15)).toBe("src/images/cloudy.png");
  });
});
