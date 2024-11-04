import { Meta } from '@storybook/blocks';
import Image from 'next/image';

import Github from './assets/github.svg';
import Discord from './assets/discord.svg';
import Youtube from './assets/youtube.svg';
import Tutorials from './assets/tutorials.svg';
import Styling from './assets/styling.png';
import Context from './assets/context.png';
import Assets from './assets/assets.png';
import Docs from './assets/docs.png';
import Share from './assets/share.png';
import FigmaPlugin from './assets/figma-plugin.png';
import Testing from './assets/testing.png';
import Accessibility from './assets/accessibility.png';
import Theming from './assets/theming.png';
import AddonLibrary from './assets/addon-library.png';

export const RightArrow = () => (
  <>
    <svg
      viewBox="0 0 14 14"
      width="8px"
      height="14px"
      style={{
        marginLeft: '4px',
        display: 'inline-block',
        shapeRendering: 'inherit',
        verticalAlign: 'middle',
        fill: 'currentColor',
      }}
    >
      <path d="m11.1 7.35-5.5 5.5a.5.5 0 0 1-.7-.7L10.04 7 4.9 1.85a.5.5 0 1 1 .7-.7l5.5 5.5c.2.2.2.5 0 .7Z" />
    </svg>
    <Meta title="Configure your project" />
    <div className="sb-container">
      <div className="sb-section-title">
        # Configure your project $
        {`Because Storybook works separately from your app, you'll need to configure it for your specific stack and setup. Below, explore guides for configuring Storybook with popular frameworks and tools. If you get stuck, learn how you can ask for help from our community.`}
      </div>
      <div className="sb-section">
        <div className="sb-section-item">
          <Image
            src={Styling}
            alt="A wall of logos representing different styling technologies"
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
          />
          <h4 className="sb-section-item-heading">Add styling and CSS</h4>
          <p className="sb-section-item-paragraph">
            Like with web applications, there are many ways to include CSS
            within Storybook. Learn more about setting up styling within
            Storybook.
          </p>
          <a
            href="https://storybook.js.org/docs/configure/styling-and-css"
            target="_blank"
          >
            Learn more
            <RightArrow />
          </a>
        </div>
        <div className="sb-section-item">
          <Image
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
            src={Context}
            alt="An abstraction representing the composition of data for a component"
          />
          <h4 className="sb-section-item-heading">
            Provide context and mocking
          </h4>
          <p className="sb-section-item-paragraph">
            $
            {`Often when a story doesn't render, it's because your component is expecting a specific environment or context (like a theme provider) to be available.`}
          </p>
          <a
            href="https://storybook.js.org/docs/writing-stories/decorators#context-for-mocking"
            target="_blank"
          >
            Learn more
            <RightArrow />
          </a>
        </div>
        <div className="sb-section-item">
          <Image
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
            src={Assets}
            alt="A representation of typography and image assets"
          />
          <div>
            <h4 className="sb-section-item-heading">
              Load assets and resources
            </h4>
            <p className="sb-section-item-paragraph">
              To link static files (like fonts) to your projects and stories,
              use the `staticDirs` configuration option to specify folders to
              load when starting Storybook.
            </p>
            <a
              href="https://storybook.js.org/docs/configure/images-and-assets"
              target="_blank"
            >
              Learn more
              <RightArrow />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="sb-container">
      <div className="sb-section-title">
        # Do more with Storybook $
        {`Now that you know the basics, let's explore other parts of Storybook that will improve your experience. This list is just to get you started. You can customise Storybook in many ways to fit your needs.`}
      </div>
      <div className="sb-section">
        <div className="sb-features-grid">
          <div className="sb-grid-item">
            <Image
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              src={Docs}
              alt="A screenshot showing the autodocs tag being set, pointing a docs page being generated"
            />
            <h4 className="sb-section-item-heading">Autodocs</h4>
            <p className="sb-section-item-paragraph">
              Auto-generate living, interactive reference documentation from
              your components and stories.
            </p>
            <a
              href="https://storybook.js.org/docs/writing-docs/autodocs"
              target="_blank"
            >
              Learn more
              <RightArrow />
            </a>
          </div>
          <div className="sb-grid-item">
            <Image
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              src={Share}
              alt="A browser window showing a Storybook being published to a chromatic.com URL"
            />
            <h4 className="sb-section-item-heading">Publish to Chromatic</h4>
            <p className="sb-section-item-paragraph">
              Publish your Storybook to review and collaborate with your entire
              team.
            </p>
            <a
              href="https://storybook.js.org/docs/sharing/publish-storybook#publish-storybook-with-chromatic"
              target="_blank"
            >
              Learn more
              <RightArrow />
            </a>
          </div>
          <div className="sb-grid-item">
            <Image
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              src={FigmaPlugin}
              alt="Windows showing the Storybook plugin in Figma"
            />
            <h4 className="sb-section-item-heading">Figma Plugin</h4>
            <p className="sb-section-item-paragraph">
              Embed your stories into Figma to cross-reference the design and
              live implementation in one place.
            </p>
            <a
              href="https://storybook.js.org/docs/sharing/design-integrations#embed-storybook-in-figma-with-the-plugin"
              target="_blank"
            >
              Learn more
              <RightArrow />
            </a>
          </div>
          <div className="sb-grid-item">
            <Image
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              src={Testing}
              alt="Screenshot of tests passing and failing"
            />
            <h4 className="sb-section-item-heading">Testing</h4>
            <p className="sb-section-item-paragraph">
              Use stories to test a component in all its variations, no matter
              how complex.
            </p>
            <a
              href="https://storybook.js.org/docs/writing-tests"
              target="_blank"
            >
              Learn more
              <RightArrow />
            </a>
          </div>
          <div className="sb-grid-item">
            <Image
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              src={Accessibility}
              alt="Screenshot of accessibility tests passing and failing"
            />
            <h4 className="sb-section-item-heading">Accessibility</h4>
            <p className="sb-section-item-paragraph">
              Automatically test your components for a11y issues as you develop.
            </p>
            <a
              href="https://storybook.js.org/docs/writing-tests/accessibility-testing"
              target="_blank"
            >
              Learn more
              <RightArrow />
            </a>
          </div>
          <div className="sb-grid-item">
            <Image
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              src={Theming}
              alt="Screenshot of Storybook in light and dark mode"
            />
            <h4 className="sb-section-item-heading">Theming</h4>
            <p className="sb-section-item-paragraph">
              ${`Theme Storybook's UI to personalize it to your project.`}
            </p>
            <a
              href="https://storybook.js.org/docs/configure/theming"
              target="_blank"
            >
              Learn more
              <RightArrow />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="sb-addon">
      <div className="sb-addon-text">
        <h4>Addons</h4>
        <p className="sb-section-item-paragraph">
          Integrate your tools with Storybook to connect workflows.
        </p>
        <a href="https://storybook.js.org/integrations/" target="_blank">
          Discover all addons
          <RightArrow />
        </a>
      </div>
      <div className="sb-addon-img">
        <Image
          width={650}
          height={347}
          src={AddonLibrary}
          alt="Integrate your tools with Storybook to connect workflows."
        />
      </div>
    </div>
    <div className="sb-section sb-socials">
      <div className="sb-section-item">
        <Image
          width={32}
          height={32}
          layout="fixed"
          src={Github}
          alt="Github logo"
          className="sb-explore-image"
        />
        Join our contributors building the future of UI development.
        <a href="https://github.com/storybookjs/storybook" target="_blank">
          Star on GitHub
          <RightArrow />
        </a>
      </div>
      <div className="sb-section-item">
        <Image
          width={33}
          height={32}
          layout="fixed"
          src={Discord}
          alt="Discord logo"
          className="sb-explore-image"
        />
        <div>
          Get support and chat with frontend developers.
          <a href="https://discord.gg/storybook" target="_blank">
            Join Discord server
            <RightArrow />
          </a>
        </div>
      </div>
      <div className="sb-section-item">
        <Image
          width={32}
          height={32}
          layout="fixed"
          src={Youtube}
          alt="Youtube logo"
          className="sb-explore-image"
        />
        <div>
          Watch tutorials, feature previews and interviews.
          <a href="https://www.youtube.com/@chromaticui" target="_blank">
            Watch on YouTube
            <RightArrow />
          </a>
        </div>
      </div>
      <div className="sb-section-item">
        <Image
          width={33}
          height={32}
          layout="fixed"
          src={Tutorials}
          alt="A book"
          className="sb-explore-image"
        />
        <p>Follow guided walkthroughs on for key workflows.</p>

        <a href="https://storybook.js.org/tutorials/" target="_blank">
          Discover tutorials
          <RightArrow />
        </a>
      </div>
    </div>
    <style>
      {`
  .sb-container {
    margin-bottom: 48px;
  }

  .sb-section {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  img {
    object-fit: cover;
  }

  .sb-section-title {
    margin-bottom: 32px;
  }

  .sb-section a:not(h1 a, h2 a, h3 a) {
    font-size: 14px;
  }

  .sb-section-item, .sb-grid-item {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .sb-section-item-heading {
    padding-top: 20px !important;
    padding-bottom: 5px !important;
    margin: 0 !important;
  }
  .sb-section-item-paragraph {
    margin: 0;
    padding-bottom: 10px;
  }

  .sb-chevron {
    margin-left: 5px;
  }

  .sb-features-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px 20px;
  }

  .sb-socials {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .sb-socials p {
    margin-bottom: 10px;
  }

  .sb-explore-image {
    max-height: 32px;
    align-self: flex-start;
  }

  .sb-addon {
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    background-color: #EEF3F8;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: #EEF3F8;
    height: 180px;
    margin-bottom: 48px;
    overflow: hidden;
  }

  .sb-addon-text {
    padding-left: 48px;
    max-width: 240px;
  }

  .sb-addon-text h4 {
    padding-top: 0px;
  }

  .sb-addon-img {
    position: absolute;
    left: 345px;
    top: 0;
    height: 100%;
    width: 200%;
    overflow: hidden;
  }

  .sb-addon-img img {
    width: 650px;
    transform: rotate(-15deg);
    margin-left: 40px;
    margin-top: -72px;
    box-shadow: 0 0 1px rgba(255, 255, 255, 0);
    backface-visibility: hidden;
  }

  @media screen and (max-width: 800px) {
    .sb-addon-img {
      left: 300px;
    }
  }

  @media screen and (max-width: 600px) {
    .sb-section {
      flex-direction: column;
    }

    .sb-features-grid {
      grid-template-columns: repeat(1, 1fr);
    }

    .sb-socials {
      grid-template-columns: repeat(2, 1fr);
    }

    .sb-addon {
      height: 280px;
      align-items: flex-start;
      padding-top: 32px;
      overflow: hidden;
    }

    .sb-addon-text {
      padding-left: 24px;
    }

    .sb-addon-img {
      right: 0;
      left: 0;
      top: 130px;
      bottom: 0;
      overflow: hidden;
      height: auto;
      width: 124%;
    }

    .sb-addon-img img {
      width: 1200px;
      transform: rotate(-12deg);
      margin-left: 0;
      margin-top: 48px;
      margin-bottom: -40px;
      margin-left: -24px;
    }
  }
  `}
    </style>
  </>
);
