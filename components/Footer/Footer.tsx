import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import styles from "./Footer.module.css";

export const Footer = () => {
  const { t } = useTranslation("index");
  return (
    <footer className={styles.footer}>
      <p>
        {t("made-by")}{" "}
        <Link href="https://www.baselalnassr.com/">
          <a>{t("basel")}</a>
        </Link>
        {" - "}
        <Link href="https://github.com/mrbasel">
          <a>{t("source")}</a>
        </Link>
      </p>
    </footer>
  );
};
