import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import CodeBlock from "@theme/CodeBlock";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <section style={{ padding: "1em" }}>
          <h1 style={{ textAlign: "center" }}>
            The simplest way to create high-quality stats videos
          </h1>
          <CodeBlock language="js">
            {`
    var charts = {
      chart: {
        style: {
          width: 920,
          height: 105,
          marginLeft: 25,
          marginTop: 10,
          marginBottom: 25,
          marginRight: 25,
        },
        lines: {
          color: "black",
        },
      },
    };

    
    function update() {
      animateValue("count", data.count[pastIndex], data.count[index]);
    }
          
    function animateCharts() {
      updateChart("chart", parseInt(getText("count")));
    }
          `}
          </CodeBlock>
        </section>
        <section style={{ padding: "1em" }}>
          <h1 style={{ textAlign: "center" }}>
            Used by your favorite creators
          </h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1em",
            }}
          >
            <LiteYouTubeEmbed
              id="Y3zxw7INPc8"
              title="Cocomelon VS SET India: The Race For 2ND Most Subscribed Company Channel"
            />
            <LiteYouTubeEmbed
              id="auY9xKhXGQE"
              title="The Rise of Alan Becker: 17 Years Visualized"
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
