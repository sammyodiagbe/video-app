import Link from "next/link";

const NavigationBar = () => {
  return (
    <nav>
      <Link href={"/"}>Blindlove</Link>

      <ul>
        <li>
          <Link href="">About us</Link>
        </li>
        <li>
          <Link href="">About us</Link>
        </li>
      </ul>

      <Link href={"/login"}></Link>
    </nav>
  );
};

export default NavigationBar;
