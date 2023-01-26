import wp from "../assets/images/wp.svg"; // relative path to image
import react from "../assets/images/react.svg";
import next from "../assets/images/next.svg";
import php from "../assets/images/php.svg";
import gt from "../assets/images/gt.png";

export default function Hero() {
  return (
    <div className="hero-container inner-block">
      <div className="hero-inner-container main-margin">
        {/* <div className="subtitle-container animate__animated animate__slideInLeft animate__faster">
          <span>Welcome! My name is</span>
        </div> */}
        <h1 className="animate__animated animate__slideInLeft animate__faster">
          Joener Münch.
          <br />
          <strong>WordPress Developer.</strong>
        </h1>
        <p>
          I specialize in custom WordPress plugin and theme development. From
          simple to complex, I deliver efficient, reliable and user-friendly
          solutions to enhance your website's capabilities. Let's work together
          to elevate your online presence.
        </p>
        <div class="frameworks">
          <img class="wp" src={wp.src} />
          <img class="gt" src={gt.src} />
          <img class="php" src={php.src} />
          <img class="next" src={next.src} />

          <img class="react rotate" src={react.src} />
        </div>
      </div>
    </div>
  );
}
