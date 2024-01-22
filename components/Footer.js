
export default function Footer() {

  return (
    <>
      <footer className="footer border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-wrap items-center justify-center">
          <li>
            <span className="font-bold">Your name:</span> Akash
          </li>
          <li>
            <span className="font-bold">Your email:</span> akash@gmail.com
          </li>
          <li>
            <span className="font-bold">Phone number:</span> 9088123123
          </li>
          <li>
            <span className="font-bold">Bank:</span> ICICI
          </li>
          <li>
            <span className="font-bold">Account holder:</span> Akash
          </li>
          <li>
            <span className="font-bold">Account number:</span> 89372393712390
          </li>
          {/* <li>
            <span className="font-bold">Website:</span>{" "}
            <a href={website} target="_blank" rel="noopenner noreferrer">
                www.akash.com
            </a>
          </li> */}
        </ul>
      </footer>
    </>
  );
}
