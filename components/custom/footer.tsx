export function Footer() {
  return (
    <footer className="w-full py-1 text-center">
      <p className="text-xs tracking-wide text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
        <span>
          <a
            href="https://bit.ly/3Qc9tYi"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground hover:text-primary transition-colors"
          >
            Join Deriv
          </a>
        </span>
        <span className="text-muted-foreground/40">|</span>
        <a
          href="https://trading.criptoinversiones.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          trading.criptoinversiones.org
        </a>
      </p>
    </footer>
  );
}
