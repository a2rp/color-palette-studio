import assert from "node:assert/strict";
import test from "node:test";
import { contrastRatio, generatePalette, hexToHsl, hslToHex, readableInk } from "../src/utils/paletteColors.js";

test("converts hex colors to and from HSL", () => {
    const color = "#5B68E8";
    const hsl = hexToHsl(color);
    assert.equal(hslToHex(hsl.hue, hsl.saturation, hsl.lightness), color);
});

test("generates five colors and keeps the selected base in the center", () => {
    const palette = generatePalette("#5B68E8", "triadic");
    assert.equal(palette.length, 5);
    assert.equal(palette[2], "#5B68E8");
    assert.ok(palette.every((color) => /^#[\dA-F]{6}$/.test(color)));
});

test("creates distinct analogous and complementary harmonies", () => {
    const analogous = generatePalette("#CE5B43", "analogous");
    const complementary = generatePalette("#CE5B43", "complementary");
    assert.notDeepEqual(analogous, complementary);
    assert.notEqual(analogous[0], analogous[4]);
});

test("calculates black and white contrast and picks readable text", () => {
    assert.equal(contrastRatio("#000000", "#FFFFFF"), 21);
    assert.equal(readableInk("#273B32"), "#FFFFFF");
    assert.equal(readableInk("#DDEEDD"), "#273B32");
});

test("rejects malformed hex colors", () => {
    assert.throws(() => hexToHsl("#abc"), /six-digit hex/);
});
