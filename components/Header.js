import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div class="inner main-margin">
        <div class="logo-container">
          <Link href={`/`}>
            <a>
              <span>joe.io</span>
            </a>
          </Link>
        </div>
        <div class="menu-container">
          <ul>
            <li>
              <Link href={`/blog`}>
                <a>Blog</a>
              </Link>
            </li>
            <li>
              <Link href={`/contact`}>
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
