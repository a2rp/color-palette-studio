import { LuArrowUpRight, LuLeaf, LuShoppingBag } from "react-icons/lu";
import { readableInk } from "../../utils/paletteColors.js";
import styles from "./styles.module.css";

const PalettePreview = ({ palette }) => {
    const [deep, mid, base, soft, pale] = palette;

    return (
        <section
            className={styles.palettePreview}
            id="preview"
            aria-labelledby="preview-title"
        >
            <div className={styles.previewHeading}>
                <div>
                    <h2 id="preview-title">See it in context</h2>
                    <p>A palette can shape every part of a brand.</p>
                </div>
                <span>LIVE PREVIEW</span>
            </div>
            <div
                className={styles.previewFrame}
                style={{ backgroundColor: pale, color: readableInk(pale) }}
            >
                <div className={styles.storefront}>
                    <header
                        className={styles.storeHeader}
                        style={{ borderColor: `${deep}25` }}
                    >
                        <a
                            className={styles.storeBrand}
                            href="#preview"
                            style={{ color: deep }}
                        >
                            <LuLeaf aria-hidden="true" /> little grove
                        </a>
                        <nav aria-label="Store preview navigation">
                            <a href="#preview">Our story</a>
                            <a href="#preview">Journal</a>
                        </nav>
                        <button
                            type="button"
                            aria-label="Shopping bag"
                            style={{
                                backgroundColor: deep,
                                color: readableInk(deep),
                            }}
                        >
                            <LuShoppingBag aria-hidden="true" />
                            <span>0</span>
                        </button>
                    </header>
                    <div className={styles.storeHero}>
                        <div className={styles.heroCopy}>
                            <span
                                className={styles.storeLabel}
                                style={{ color: mid }}
                            >
                                GROWN WITH CARE
                            </span>
                            <h3>Good things take root.</h3>
                            <p>
                                Thoughtful goods for slower mornings, greener
                                homes, and everyday rituals.
                            </p>
                            <button
                                type="button"
                                style={{
                                    backgroundColor: deep,
                                    color: readableInk(deep),
                                }}
                            >
                                Explore the collection{" "}
                                <LuArrowUpRight aria-hidden="true" />
                            </button>
                        </div>
                        <div
                            className={styles.artCard}
                            style={{ backgroundColor: soft }}
                            aria-label="Abstract botanical color illustration"
                            role="img"
                        >
                            <span
                                className={styles.artSun}
                                style={{ backgroundColor: base }}
                            />
                            <span
                                className={styles.artStem}
                                style={{ backgroundColor: deep }}
                            />
                            <span
                                className={styles.artLeaf}
                                style={{ backgroundColor: mid }}
                            />
                            <span
                                className={styles.artLeafSecond}
                                style={{ backgroundColor: deep }}
                            />
                        </div>
                    </div>
                    <div
                        className={styles.storeFoot}
                        style={{
                            backgroundColor: deep,
                            color: readableInk(deep),
                        }}
                    >
                        <span>Made for everyday nature</span>
                        <span>Small batch · Low waste · Made to last</span>
                    </div>
                </div>
            </div>
            <p className={styles.previewNote}>
                Change a swatch to see the storefront colors update.
            </p>
        </section>
    );
};

export default PalettePreview;
