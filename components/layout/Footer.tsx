export default function Footer() {
  return (
    <footer className="mt-auto py-6 px-4 sm:px-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-white/10">
      <div className="flex justify-center gap-6">
        <a className="hover:text-primary" href="#">About</a>
        <a className="hover:text-primary" href="#">Contact</a>
        <a className="hover:text-primary" href="#">Data Sources</a>
      </div>
      <p className="mt-4">© 2025 ClimaData. All rights reserved.</p>
    </footer>
  );
}
