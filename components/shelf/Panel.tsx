'use client';
export function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section className="absolute inset-0 grid place-content-center p-8">{children}</section>
  );
}
