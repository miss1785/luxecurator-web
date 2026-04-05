export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 border-t border-zinc-900 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-xl font-serif text-yellow-600 mb-6 tracking-widest uppercase">Luxe Curator</h2>
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-zinc-900 pt-8">
          <p className="text-zinc-500 text-sm font-light mb-4 md:mb-0">
            © 2024 Luxe Curator. Curating European Excellence.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-zinc-500 hover:text-yellow-500 transition-colors uppercase tracking-wider text-xs">Privacy Policy</a>
            <a href="#" className="text-sm text-zinc-500 hover:text-yellow-500 transition-colors uppercase tracking-wider text-xs">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
