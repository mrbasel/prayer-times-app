import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { t } = useTranslation("index");
  return (
    <footer className={styles.footer}>
      <div className={styles.langContainer}>
        <Link href="/" locale="en" key="en">
          <a>English</a>
        </Link>
        <Link href="/" locale="ar" key="ar">
          <a>العربية</a>
        </Link>
      </div>
      <div>
        {t("made-by")}{" "}
        <Link href="https://www.baselalnassr.com/">
          <a>{t("basel")}</a>
        </Link>
        {" - "}
        <Link href="https://github.com/mrbasel">
          <a>{t("source")}</a>
        </Link>
      </div>
    </footer>
  );
};
