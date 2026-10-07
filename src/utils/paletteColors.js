const hueSteps = {
    analogous: [-48, -24, 0, 24, 48],
    complementary: [-150, -30, 0, 30, 180],
    triadic: [-120, -60, 0, 60, 120],
    split: [-150, -30, 0, 30, 150],
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const hexToHsl = (hex) => {
    const normalized = hex.replace("#", "");
    if (!/^[\da-f]{6}$/i.test(normalized)) throw new Error("Enter a six-digit hex color.");
    const channels = [0, 2, 4].map((start) => parseInt(normalized.slice(start, start + 2), 16) / 255);
    const [red, green, blue] = channels;
    const max = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const difference = max - min;
    let hue = 0;
    const lightness = (max + min) / 2;
    let saturation = 0;

    if (difference !== 0) {
        saturation = difference / (1 - Math.abs(2 * lightness - 1));
        if (max === red) hue = 60 * (((green - blue) / difference) % 6);
        else if (max === green) hue = 60 * ((blue - red) / difference + 2);
        else hue = 60 * ((red - green) / difference + 4);
    }

    return { hue: (hue + 360) % 360, saturation, lightness };
};

export const hslToHex = (hue, saturation, lightness) => {
    const safeHue = ((hue % 360) + 360) % 360;
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const section = safeHue / 60;
    const second = chroma * (1 - Math.abs((section % 2) - 1));
    let red = 0;
    let green = 0;
    let blue = 0;

    if (section < 1) [red, green] = [chroma, second];
    else if (section < 2) [red, green] = [second, chroma];
    else if (section < 3) [green, blue] = [chroma, second];
    else if (section < 4) [green, blue] = [second, chroma];
    else if (section < 5) [red, blue] = [second, chroma];
    else [red, blue] = [chroma, second];

    const offset = lightness - chroma / 2;
    return `#${[red, green, blue].map((channel) => Math.round((channel + offset) * 255).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
};

export const generatePalette = (baseHex, scheme) => {
    const base = hexToHsl(baseHex);
    const steps = hueSteps[scheme] ?? hueSteps.analogous;
    const saturationOffsets = [-0.07, 0.01, 0, 0.03, -0.08];
    const lightnessOffsets = [0.2, 0.1, 0, -0.1, -0.2];

    return steps.map((step, index) => hslToHex(
        base.hue + step,
        clamp(base.saturation + saturationOffsets[index], 0, 1),
        clamp(base.lightness + lightnessOffsets[index], 0.2, 0.86),
    ));
};

const relativeLuminance = (hex) => {
    if (!/^#[\da-f]{6}$/i.test(hex)) throw new Error("Enter a six-digit hex color.");
    const color = hex.replace("#", "");
    const channels = [0, 2, 4].map((start) => parseInt(color.slice(start, start + 2), 16) / 255);
    const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

export const contrastRatio = (firstHex, secondHex) => {
    const first = relativeLuminance(firstHex);
    const second = relativeLuminance(secondHex);
    return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

export const readableInk = (hex) => contrastRatio(hex, "#FFFFFF") >= contrastRatio(hex, "#273B32") ? "#FFFFFF" : "#273B32";
