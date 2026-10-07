import { useState } from "react";
import { LuCheck, LuCopy, LuPalette, LuShuffle } from "react-icons/lu";
import { contrastRatio, readableInk } from "../../utils/paletteColors.js";
import styles from "./styles.module.css";

const schemes = [
    { id: "analogous", label: "Analogous" },
    { id: "complementary", label: "Complementary" },
    { id: "triadic", label: "Triadic" },
    { id: "split", label: "Split complementary" },
];

const PaletteStudio = ({ palette, baseColor, scheme, onBaseChange, onSchemeChange, onRandomize, onColorChange }) => {
    const [copiedValue, setCopiedValue] = useState("");
    const cssVariables = `:root {\n${palette.map((color, index) => `  --palette-${index + 1}: ${color};`).join("\n")}\n}`;

    const copyValue = async (value, label) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedValue(label);
        } catch {
            setCopiedValue("Clipboard unavailable");
        }
        window.setTimeout(() => setCopiedValue(""), 1800);
    };

    return (
        <section className={styles.paletteStudio} id="palette" aria-labelledby="palette-title">
            <div className={styles.studioHeader}>
                <div className={styles.studioTitle}>
                    <span><LuPalette aria-hidden="true" /></span>
                    <div><h2 id="palette-title">Build your palette</h2><p>Choose a starting color and a harmony.</p></div>
                </div>
                <button className={styles.exportButton} type="button" onClick={() => copyValue(cssVariables, "CSS copied")}>
                    {copiedValue === "CSS copied" ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
                    {copiedValue === "CSS copied" ? "Copied" : "Copy CSS"}
                </button>
            </div>

            <div className={styles.controlsRow}>
                <label className={styles.baseControl} htmlFor="base-color">
                    <span>Starting color</span>
                    <span className={styles.basePicker}>
                        <input id="base-color" type="color" value={baseColor} onChange={(event) => onBaseChange(event.target.value.toUpperCase())} />
                        <code>{baseColor}</code>
                    </span>
                </label>
                <label className={styles.schemeControl} htmlFor="harmony-scheme">
                    Harmony
                    <select id="harmony-scheme" value={scheme} onChange={(event) => onSchemeChange(event.target.value)}>
                        {schemes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                    </select>
                </label>
                <button className={styles.shuffleButton} type="button" onClick={onRandomize}>
                    <LuShuffle aria-hidden="true" /> Explore a color
                </button>
            </div>

            <div className={styles.paletteHeading}>
                <div><h3>Five-color palette</h3><p>Pick any swatch to fine-tune it.</p></div>
                <span>{schemes.find((item) => item.id === scheme)?.label} harmony</span>
            </div>
            <div className={styles.paletteGrid}>
                {palette.map((color, index) => {
                    const ink = readableInk(color);
                    const contrast = contrastRatio(color, ink);
                    const contrastLabel = contrast >= 7 ? "AAA" : contrast >= 4.5 ? "AA" : "Low contrast";
                    const copied = copiedValue === color;
                    return (
                        <article className={styles.colorCard} key={`palette-color-${index + 1}`}>
                            <label className={styles.swatchPreview} style={{ backgroundColor: color, color: ink }}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <span className={styles.editHint}>Edit color</span>
                                <input
                                    type="color"
                                    value={color}
                                    aria-label={`Edit swatch ${index + 1}, ${color}`}
                                    onChange={(event) => onColorChange(index, event.target.value.toUpperCase())}
                                />
                            </label>
                            <div className={styles.swatchDetails}>
                                <div><code>{color}</code><span>SWATCH {String(index + 1).padStart(2, "0")}</span></div>
                                <button type="button" aria-label={`Copy ${color}`} onClick={() => copyValue(color, color)}>
                                    {copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
                                </button>
                            </div>
                            <span className={styles.contrastLabel}>{contrastLabel} with {ink}</span>
                        </article>
                    );
                })}
            </div>
            <p className={styles.copyStatus} aria-live="polite">{copiedValue === "Clipboard unavailable" ? copiedValue : copiedValue && copiedValue !== "CSS copied" ? `${copiedValue} copied` : copiedValue}</p>
        </section>
    );
};

export default PaletteStudio;
