import invalidJWT from "../assets/invalid-jwt.png";

export default function InvalidJWT() {
  return (
    <>
      <div className="text-lg font-bold mb-12 text-gray-600 text-center">
        Your authorization token does not seem to work.
      </div>
      <div className="w-36 mb-12">
        <img src={invalidJWT} alt="" />
      </div>
      <div className="w-96 text-center text-gray-600">
        Please try to regenerate your{" "}
        <span className="underline">manifest.xml</span> from the management
        panel of YAARS2.
      </div>
    </>
  );
}
