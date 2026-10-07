import { LuArrowDownRight, LuGithub, LuLeaf } from "react-icons/lu";
import styles from "./styles.module.css";

const SiteHeader = () => (
    <header className={styles.siteHeader}>
        <a className={styles.brand} href="#top" aria-label="Palette Room home"><span><LuLeaf aria-hidden="true" /></span> palette room</a>
        <nav aria-label="Main navigation">
            <a href="#palette">Studio <LuArrowDownRight aria-hidden="true" /></a>
            <a href="#preview">Preview <LuArrowDownRight aria-hidden="true" /></a>
        </nav>
        <a className={styles.repository} href="https://github.com/a2rp/color-palette-studio" target="_blank" rel="noreferrer"><LuGithub aria-hidden="true" /><span>Repository</span></a>
    </header>
);

export default SiteHeader;
