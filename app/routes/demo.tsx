import { Link } from "@remix-run/react";

export default function Index() {
    return (
      <>
        <h1>Demo Page</h1>
        <a href="/">Go to Index Page</a>
        <Link to="/">Go To Index Page</Link>
      </>
    );
  }
  