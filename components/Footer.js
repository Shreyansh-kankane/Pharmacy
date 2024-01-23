
export default function Footer() {

  return (
    <>
      <footer className="footer border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-wrap gap-1 items-center justify-center">
          <li>
            <span className="font-bold"> Name:</span> Akash
          </li>
          <li>
            <span className="font-bold"> email:</span> akashPharmacy@gmail.com
          </li>
          <li>
            <span className="font-bold">Phone number:</span> 9144200687
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
          <li>
            <span className="font-bold">Website:</span>{" "}
            <a href={'https://akashpharmacy.netlify.app/'} target="_blank" rel="noopenner noreferrer">
              akashpharmacy.netlify.app
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}
