import { useState } from "react";
import { LuArrowDown, LuDroplets, LuSparkles } from "react-icons/lu";
import BackToTop from "./components/backToTop/index.jsx";
import PalettePreview from "./components/palettePreview/index.jsx";
import PaletteStudio from "./components/paletteStudio/index.jsx";
import SiteFooter from "./components/siteFooter/index.jsx";
import SiteHeader from "./components/siteHeader/index.jsx";
import { generatePalette } from "./utils/paletteColors.js";
import styles from "./App.module.css";

const initialColor = "#557768";

const createRandomColor = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, "0").toUpperCase()}`;

const App = () => {
    const [baseColor, setBaseColor] = useState(initialColor);
    const [scheme, setScheme] = useState("analogous");
    const [palette, setPalette] = useState(() => generatePalette(initialColor, "analogous"));

    const changeBaseColor = (color) => {
        setBaseColor(color);
        setPalette(generatePalette(color, scheme));
    };

    const changeScheme = (nextScheme) => {
        setScheme(nextScheme);
        setPalette(generatePalette(baseColor, nextScheme));
    };

    const randomize = () => changeBaseColor(createRandomColor());
    const changeSwatch = (index, color) => setPalette((current) => current.map((currentColor, currentIndex) => currentIndex === index ? color : currentColor));

    return (
        <div className={styles.appShell} id="top">
            <SiteHeader />
            <main className={styles.mainContent}>
                <section className={styles.intro} aria-labelledby="page-title">
                    <div className={styles.introCopy}>
                        <div className={styles.introIcon}><LuDroplets aria-hidden="true" /><span>COLOR TOOLKIT</span></div>
                        <h1 id="page-title">Build a color story.</h1>
                        <p>Start with one color, explore a harmony, and shape a palette that feels like yours. Copy the finished colors straight into your project.</p>
                        <a className={styles.scrollLink} href="#palette">Open the palette studio <LuArrowDown aria-hidden="true" /></a>
                    </div>
                    <div className={styles.introNote}>
                        <span><LuSparkles aria-hidden="true" /> A little room to experiment</span>
                        <p>Four color relationships. Five editable swatches. No account or save button required.</p>
                    </div>
                    <div className={styles.orbOne} aria-hidden="true" />
                    <div className={styles.orbTwo} aria-hidden="true" />
                </section>
                <div className={styles.workspace}>
                    <PaletteStudio
                        palette={palette}
                        baseColor={baseColor}
                        scheme={scheme}
                        onBaseChange={changeBaseColor}
                        onSchemeChange={changeScheme}
                        onRandomize={randomize}
                        onColorChange={changeSwatch}
                    />
                    <PalettePreview palette={palette} />
                </div>
            </main>
            <SiteFooter />
            <BackToTop />
        </div>
    );
};

export default App;
