export default function Footer() {
  return (
    <footer className="bg-green-800 text-white text-center p-3 mt-8 w-full">
      <p className="text-md md:text-md lg:text-lg xl:text-lg 2xl:text-xl font-medium opacity-85">
        &copy; {new Date().getFullYear()} Zee Welfare. All Rights Reserved.
      </p>
    </footer>
  );
}
