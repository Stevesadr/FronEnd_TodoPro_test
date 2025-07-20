import Link from "next/link";

const MobileNavLink = ({ href, text }) => {
  return (
    <Link
      href={href}
      className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-700 font-medium"
    >
      {text}
    </Link>
  );
};

export default MobileNavLink;
